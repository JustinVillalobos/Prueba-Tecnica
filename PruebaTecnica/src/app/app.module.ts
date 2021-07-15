/*Native Angular Dependencies  Imports*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

/*Components Generated Imports*/
import { AppComponent } from './app.component';
import { HeaderComponent } from './Template/header/header.component';
import { LeftSidebarComponent } from './Template/left-sidebar/left-sidebar.component';
import { NavbarComponent } from './Template/navbar/navbar.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { UpdateProductComponent } from './Components/update-product/update-product.component';


/*External Dependencies  Imports*/
import { NgxDropzoneModule } from 'ngx-dropzone';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftSidebarComponent,
    NavbarComponent,
    ProductListComponent,
    AddProductComponent,
    UpdateProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    HttpClientModule,
    NgxDropzoneModule,
    NgxPaginationModule,
    NgxSpinnerModule,
     NgSelectModule,
     ToastrModule.forRoot(),
     Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
