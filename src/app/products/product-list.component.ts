import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  
  products: Product[] = [];

  constructor(
    private productService: ProductService, 
    private toastr: ToastrService
  ){}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.list().subscribe({
      next: data => {
        this.products = data;
      },
      error: err => {
        console.log(err);
      },
      complete: () => {
        console.log('Product list loaded');
      }
    });
  }

  async delete(id: number | undefined) {
    if (id === undefined) {
      this.toastr.error('ID de producto no proporcionado', 'Fail', { timeOut: 3000, positionClass: 'toast-top-center' });
      return;
    }
  
    try {
      const data = await lastValueFrom(this.productService.delete(id));
      this.toastr.success('Producto eliminado', 'ok', { timeOut: 3000, positionClass: 'toast-top-center' });
    } catch (err) {
      if (err instanceof Error) {
        this.toastr.error(err.message, 'Fail', { timeOut: 3000, positionClass: 'toast-top-center' });
      } else {
        this.toastr.error('Error desconocido', 'Fail', { timeOut: 3000, positionClass: 'toast-top-center' });
      }
    }
  }
}