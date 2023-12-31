import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxTinymceModule } from 'ngx-tinymce';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { InicioComponent } from './components/inicio/inicio.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';

//** Admin */
import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';
import { EditClienteComponent } from './components/clientes/edit-cliente/edit-cliente.component';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { CreateProductoComponent } from './components/productos/create-producto/create-producto.component';
import { ConfigComponent } from './components/config/config.component';
import { GaleriaProductoComponent } from './components/productos/galeria-producto/galeria-producto.component';
import { InventarioProductoComponent } from './components/productos/inventario-producto/inventario-producto.component';
import { VariedadProductoComponent } from './components/productos/variedad-producto/variedad-producto.component';
import { UpdateProductoComponent } from './components/productos/update-producto/update-producto.component';
import { ReviewsProductoComponent } from './components/productos/reviews-producto/reviews-producto.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SidebarComponent,
    LoginComponent,
    IndexClienteComponent,
    CreateClienteComponent,
    EditClienteComponent,
    IndexProductoComponent,
    CreateProductoComponent,
    ConfigComponent,
    GaleriaProductoComponent,
    InventarioProductoComponent,
    VariedadProductoComponent,
    UpdateProductoComponent,
    ReviewsProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    NgbPaginationModule,
    NgxTinymceModule.forRoot({
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/5.7.1/'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
