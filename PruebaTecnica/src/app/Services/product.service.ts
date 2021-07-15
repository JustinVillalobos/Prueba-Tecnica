import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormGroup } from "@angular/forms";
import {Product} from '../Models/product';

@Injectable({
  providedIn: 'root'
})
/*Controller with Product service backend*/
/*https://justinvillaespinoza.000webhostapp.com it is a 
backend in a free hosting
*/
export class ProductService {

  constructor(private http:HttpClient) {

   }

  addProduct(product:any){
       return this.http.post(`https://justinvillaespinoza.000webhostapp.com/Peticiones/insert.php`,product);
  }
  findIndexToUpdate(product) { 
        return product.idProduct === this;
  }
  updateProduct(product:Product){
    return this.http.post(`https://justinvillaespinoza.000webhostapp.com/Peticiones/update.php`,product);
  }
  deleteProduct(idProduct:number){
     return this.http.get(`https://justinvillaespinoza.000webhostapp.com/Peticiones/delete.php?idProduct=${idProduct}`);
  }
  searchByIdProduct(idProduct:number){
     return this.http.get<Product>(`https://justinvillaespinoza.000webhostapp.com/Peticiones/filter.php?idProduct=${idProduct}`);
  }
  listProducts(){
     return this.http.get<Product[]>(`https://justinvillaespinoza.000webhostapp.com/Peticiones/list.php`);
  }


}
