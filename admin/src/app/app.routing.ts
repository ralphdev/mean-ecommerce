import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";

import { adminGuard } from "./guards/admin.guard";
import { IndexClienteComponent } from "./components/clientes/index-cliente/index-cliente.component";
import { CreateClienteComponent } from "./components/clientes/create-cliente/create-cliente.component";
import { EditClienteComponent } from "./components/clientes/edit-cliente/edit-cliente.component";

import { ConfigComponent } from "./components/config/config.component";
import { IndexProductoComponent } from "./components/productos/index-producto/index-producto.component";
import { CreateProductoComponent } from "./components/productos/create-producto/create-producto.component";
import { UpdateProductoComponent } from "./components/productos/update-producto/update-producto.component";
import { VariedadProductoComponent } from "./components/productos/variedad-producto/variedad-producto.component";
import { GaleriaProductoComponent } from "./components/productos/galeria-producto/galeria-producto.component";
import { ReviewsProductoComponent } from "./components/productos/reviews-producto/reviews-producto.component";
import { InventarioProductoComponent } from "./components/productos/inventario-producto/inventario-producto.component";

const appRoute: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch:'full' },
  { path: 'inicio', component: InicioComponent, canActivate: [adminGuard] },

  //** Panel Clientes
  {
    path: 'panel', children: [
      //** Admin Clientes Rutas*/
      { path: 'clientes', component: IndexClienteComponent, canActivate: [adminGuard] },
      { path: 'clientes/registro', component: CreateClienteComponent, canActivate: [adminGuard] },
      { path: 'clientes/:id', component: EditClienteComponent, canActivate: [adminGuard] },

      //** Productos Rutas */
      { path: 'productos', component: IndexProductoComponent, canActivate: [adminGuard] },
      { path: 'productos/registro', component: CreateProductoComponent, canActivate: [adminGuard] },
      { path: 'productos/:id', component: UpdateProductoComponent, canActivate: [adminGuard] },
      { path: 'productos/galeria/:id', component: GaleriaProductoComponent, canActivate: [adminGuard] },
      { path: 'productos/inventario/:id', component: InventarioProductoComponent, canActivate: [adminGuard] },
      { path: 'productos/variedades/:id', component: VariedadProductoComponent, canActivate: [adminGuard] },
      { path: 'productos/reviews/:id', component: ReviewsProductoComponent, canActivate: [adminGuard] },

      //** Configuraciones Admin */
      { path: 'configuraciones', component: ConfigComponent, canActivate: [adminGuard] },
    ]},
    { path: 'login', component: LoginComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
