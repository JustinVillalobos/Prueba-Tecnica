import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
 import {Router} from "@angular/router";

import { NgxSpinnerService } from "ngx-spinner";

import {ProductService} from "../../Services/product.service";
import {ValidatorService} from "../../Services/validator.service";
import {AlertsService} from "../../Services/alerts.service";
import { ToastService } from '../../Services/toast.service';
import {Product} from '../../Models/product';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
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
    private toastr:ToastService,
    private router:Router) { 
    this.spinner.show();
    this.form = this.fb.group({
      image: [null]
    });
    let ruta=this.router.parseUrl(this.router.url);
      let id=ruta.queryParams['idProduct'];
      this.obtainProduct(id);
  }
  

  ngOnInit() {
  }
  /*Action obtained by a product*/
  obtainProduct(idProduct){

    this.ProductService.searchByIdProduct(idProduct).subscribe(
      res=>{
       
        this.product=res;
        
        let file=this.dataURLtoFile(this.product.image,"image.png");
        this.file.push(file);
         this.spinner.hide();
      },
      err=>console.log(err)
      );
  }
  /*Convert a base64 string to file  */
  dataURLtoFile(dataurl, filename) {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
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
  /*Action in charge of sending a product through the service to update a product*/
  updateProduct(){
    this.spinner.show();
    var formData: any = new FormData();
    formData.append("Producto", JSON.stringify(this.product));
    if(this.ValidatorService.formatoPalabra(this.product.name,40) && 
      this.ValidatorService.formatoNumero(this.product.quantity,10000) &&
      this.ValidatorService.formatoNumero(this.product.price,10000) &&
      this.ValidatorService.formatoPalabra(this.product.category,40) && 
      this.file.length>0){
      this.ProductService.updateProduct(formData).subscribe(
        res=>{
          console.log(res);
          if(res==true){
            this.spinner.hide();
            this.AlertsService.alertTimeCorrect("Producto actualizado con éxito",function(component_2){
            },this);
          }else{
            this.AlertsService.alertError("No se actualizó el registro");
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
