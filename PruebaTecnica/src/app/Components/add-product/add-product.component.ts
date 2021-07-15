import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

import { NgxSpinnerService } from "ngx-spinner";

import {ProductService} from "../../Services/product.service";
import {ValidatorService} from "../../Services/validator.service";
import {AlertsService} from "../../Services/alerts.service";
import { ToastService } from '../../Services/toast.service';
import {Product} from '../../Models/product';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  form: FormGroup;
  product:Product={
    idProduct:0,
    name:"",
    quantity:0,
    price:0, 
    category:"",
    image:""
  }
 
  file: File[] = [];
  categories:any=[{"name":"Zapatos"},{"name":"Camisetas"},{"name":"Pantalones"}]
  constructor( public fb: FormBuilder,
    private ProductService:ProductService,
    private AlertsService:AlertsService,
    private spinner: NgxSpinnerService,
    private ValidatorService:ValidatorService,
    private toastr:ToastService) { 
    this.form = this.fb.group({
      image: [null]
    });
  }

  ngOnInit() {
  }
  /*Convert a file to base64*/
  getBase64(file) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function() { resolve(reader.result); };
      reader.onerror = reject;
      reader.readAsDataURL(file);

    });
  }
  /*Action that add image from file array*/
  async onSelect(event) {
    const file = event.addedFiles[0];
    var promise =this.getBase64(file);
    var image = await promise; 
    this.product.image=image;
    this.file.push(file);

  }
  /*Action that removes image from file array*/
  onRemove(event) {
    this.file.splice(this.file.indexOf(event), 1);
    this.product.image="";
  }
  /*Action that checks a form field*/
  validateName(evt){
    const response=this.ValidatorService.validateStringInput(evt,45);
    if(response==false){
      event.preventDefault();
      this.toastr.toastrError("Solo se permiten letras y números, y que la palabra sea de menos de 40 letras");
    }
  }
  /*Action that checks a form field*/
  validateNumberInput(evt){
    const response=this.ValidatorService.validateInt(evt,5);
    if(response==false){
      event.preventDefault();
      this.toastr.toastrError("Solo se permiten números y que sean menor a 5 dígitos");
    }
  }
  /*Action that resets the variables*/
  reloadValues(){
    this.file=[];
    this.product={
      idProduct:0,
      name:"",
      quantity:0,
      price:0, 
      category:"",
      image:""
    }
  }
  /*Action in charge of sending a product through the service to add a new product*/
  addProduct(){
    this.spinner.show();
    var formData: any = new FormData();
    formData.append("Producto", JSON.stringify(this.product));
    if(this.ValidatorService.formatoPalabra(this.product.name,40) && 
      this.ValidatorService.formatoNumero(this.product.quantity,10000) &&
      this.ValidatorService.formatoNumero(this.product.price,10000) &&
      this.ValidatorService.formatoPalabra(this.product.category,40) && 
      this.file.length>0){
      this.ProductService.addProduct(formData).subscribe(
        res=>{
          if(res==true){
            this.spinner.hide();
            this.AlertsService.alertTimeCorrect("Producto agregado con éxito",function(component_2){
              component_2.reloadValues();
            },this);
          }else{
            this.AlertsService.alertError("No se insertó el nuevo registro");
          }

        },
        err=>console.log(err)
        );
  }else{
    this.spinner.hide();
     this.toastr.toastrError("Hay campos requeridos vacíos");
  }

}

}
