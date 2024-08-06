import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list.component';
import { ProductDetailComponent } from './products/product-detail.component';
import { ProductNewComponent } from './products/product-new.component';
import { ProductUpdateComponent } from './products/product-update.component';

const routes: Routes = [
  {path: '', component: ProductListComponent},
  {path: 'detail/:id', component: ProductDetailComponent},
  {path: 'new', component: ProductNewComponent},
  {path: 'update/:id', component: ProductUpdateComponent},
  {path: '**', redirectTo: '',  pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
