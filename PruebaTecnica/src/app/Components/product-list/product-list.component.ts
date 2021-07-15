import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from "ngx-spinner";

import {Product} from '../../Models/product';
import {ProductService} from "../../Services/product.service";
import {AlertsService} from "../../Services/alerts.service";
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  p:number=1;
  filter:string="";
  products:Product[];
  constructor(private ProductService:ProductService,private AlertsService:AlertsService, private spinner: NgxSpinnerService) { 
    this.loadProducts();
  }

  ngOnInit() {
    this.spinner.show();
  }
  /*Action requesting the product list*/
  loadProducts(){
    this.ProductService.listProducts().subscribe(
      res=>{
       
        this.products=res;
         this.spinner.hide();
      },
      err=>console.log(err)
      );
  }
  /*Action that requests through a service to remove a product */
  onDeletProduct(idProduct:number){
    this.AlertsService.confirmation("¿Esta seguro de eliminar a este producto?",function(response,component){
      if(response==true){
        component.ProductService.deleteProduct(idProduct).subscribe( 
          res=>{
            component.AlertsService.alertTimeCorrect("Producto eliminado con éxito",function(component_2){
              component_2.loadProducts();
            },component);
          },
          err=>console.log(err)
          );
        
      }
    },this);
  }


}
