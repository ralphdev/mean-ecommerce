import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

import { authGuard } from "./guards/auth.guard";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";

import { PerfilComponent } from "./components/usuario/perfil/perfil.component";
import { CarritoComponent } from "./components/carrito/carrito.component";
import { DireccionesComponent } from "./components/usuario/direcciones/direcciones.component";
import { IndexOrdenesComponent } from "./components/usuario/ordenes/index-ordenes/index-ordenes.component";
import { DetalleOrdenesComponent } from "./components/usuario/ordenes/detalle-ordenes/detalle-ordenes.component";
import { IndexProductoComponent } from "./components/productos/index-producto/index-producto.component";
import { ShowProductoComponent } from "./components/productos/show-producto/show-producto.component";
import { ReviewsComponent } from "./components/usuario/reviews/reviews.component";
import { ContactoComponent } from "./components/contacto/contacto.component";


const appRoute: Routes = [
    { path: '', component: InicioComponent  },
    { path: 'login', component: LoginComponent},

    //** PERFIL
    { path: 'cuenta/perfil', component: PerfilComponent, canActivate: [authGuard] },
    { path: 'cuenta/direcciones', component: DireccionesComponent, canActivate: [authGuard] },
    { path: 'cuenta/ordenes', component: IndexOrdenesComponent, canActivate: [authGuard] },
    { path: 'cuenta/ordenes/:id', component: DetalleOrdenesComponent, canActivate: [authGuard] },
    { path: 'cuenta/reviews', component: ReviewsComponent, canActivate: [authGuard] },

    //** CARRITO
    { path: 'carrito', component: CarritoComponent, canActivate: [authGuard] },

    //** PRODUCTOS
    { path: 'productos', component: IndexProductoComponent},
    { path: 'productos/categoria/:categoria', component: IndexProductoComponent },
    { path: 'productos/:slug', component: ShowProductoComponent},

    //** CONTACTO
    { path: 'contacto', component: ContactoComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);