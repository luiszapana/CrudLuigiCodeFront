import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css'
})
export class ProductUpdateComponent implements OnInit {
  
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    // otros campos que tengas en el modelo Product
  };

  private product$ = new BehaviorSubject<Product | null>(null);


  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if (id) {
      const productId = +id; // Convertir el id a number
      this.productService.detail(productId).subscribe({
        next: (data) => {
          this.product = data;
          this.product$.next(data);
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Error', {timeOut: 3000, positionClass: 'toast-top-center'});
          this.router.navigate(['/']);
        }
      });
    }
  }

  onUpdate(): void {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if (id) {
      const productId = +id; // Convertir el id a number
      this.productService.update(productId, this.product).subscribe({
        next: (data) => {
          this.toastr.success('Producto actualizado con éxito', 'Éxito', {timeOut: 3000, positionClass: 'toast-top-center'});
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.toastr.error('Error al actualizar el producto', 'Error', {timeOut: 3000, positionClass: 'toast-top-center'});
          this.router.navigate(['/']);
        }
      });
    }
  }

}
