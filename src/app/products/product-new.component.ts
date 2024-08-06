import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrl: './product-new.component.css'
})
export class ProductNewComponent {

  name: string = '';
  price: number = 0;

  constructor(
    private productService: ProductService, 
    private toastr: ToastrService,
    private router: Router
  ){}

  ngOnInit(){

  }

  onCreate(): void {
    const product = new Product(this.name, this.price);
    this.productService.save(product).subscribe(
      data => {
        this.toastr.success('Producto creado', 'ok', {timeOut: 3000, positionClass: 'toast-top-center'});
        this.router.navigate(['/']);
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {timeOut: 3000, positionClass: 'toast-top-center'});
        this.router.navigate(['/']);
      }
    )
  }

}
