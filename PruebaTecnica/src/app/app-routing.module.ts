import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { UpdateProductComponent } from './Components/update-product/update-product.component';

const routes: Routes = [
  {path:'',
    redirectTo:'/home',
    pathMatch:'full'},
  {path:'home',
    component:ProductListComponent},
    {path:'add-product',
    component:AddProductComponent},
    {path:'update-product',
    component:UpdateProductComponent}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
