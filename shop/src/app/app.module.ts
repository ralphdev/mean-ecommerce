import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { routing } from './app.routing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { ShowProductoComponent } from './components/productos/show-producto/show-producto.component';
import { DireccionesComponent } from './components/usuario/direcciones/direcciones.component';
import { IndexOrdenesComponent } from './components/usuario/ordenes/index-ordenes/index-ordenes.component';
import { DetalleOrdenesComponent } from './components/usuario/ordenes/detalle-ordenes/detalle-ordenes.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { ReviewsComponent } from './components/usuario/reviews/reviews.component';
import { SidebarComponent } from './components/usuario/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    ContactoComponent,
    CarritoComponent,
    IndexProductoComponent,
    ShowProductoComponent,
    DireccionesComponent,
    IndexOrdenesComponent,
    DetalleOrdenesComponent,
    PerfilComponent,
    ReviewsComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
