import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";

import { adminGuard } from "./guards/admin.guard";
import { IndexClienteComponent } from "./components/clientes/index-cliente/index-cliente.component";
import { CreateClienteComponent } from "./components/clientes/create-cliente/create-cliente.component";
import { EditClienteComponent } from "./components/clientes/edit-cliente/edit-cliente.component";

import { IndexProductoComponent } from "./components/productos/index-producto/index-producto.component";
import { CreateProductoComponent } from "./components/productos/create-producto/create-producto.component";

const appRoute: Routes = [
  { path: '', component: InicioComponent, canActivate: [adminGuard] },

  //** Panel Clientes
  {
    path: 'panel', children: [
      //** Admin Clientes Rutas*/
      { path: 'clientes', component: IndexClienteComponent, canActivate: [adminGuard] },
      { path: 'clientes/registro', component: CreateClienteComponent, canActivate: [adminGuard] },
      { path: 'clientes/:id', component: EditClienteComponent, canActivate: [adminGuard] },

      //** Productos Rutas */
      { path: 'productos', component: IndexProductoComponent, canActivate: [adminGuard] },
      { path: 'productos/registro', component: CreateProductoComponent, canActivate: [adminGuard]},
    ]},
    { path: 'login', component: LoginComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
