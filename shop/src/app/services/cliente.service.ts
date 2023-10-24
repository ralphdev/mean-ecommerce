import { Injectable } from '@angular/core';
import { global } from './global';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfigShare, Productos, Carrito, CarritoCliente } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url:any;

  constructor(
    private _http: HttpClient
  ) {
    this.url = global.url;
  }

  public IsAuthenticated(allowRoles : string[]) :boolean{

    const token:any = localStorage.getItem('token');

    if(!token){
      return false;
    }

    try {

      const helper = new JwtHelperService();
      let decodedToken = helper.decodeToken(token);

      if(helper.isTokenExpired(token)){
        localStorage.clear();
        return false;
      }

      if(!decodedToken){

        localStorage.clear();
        return false;
      }
    } catch (error) {

      localStorage.clear();
      return false;
    }

    return true
  }

  loginCliente(data:any): Observable<any>{

    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'login-cliente', data, { headers: headers });
  }

  registroCliente(data:any): Observable<any>{

    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'registro-cliente', data, { headers: headers });
  }

  obtenerClienteGuest(id:any, token:any): Observable<any>{

    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url + 'obtener-cliente-guest/'+id, { headers: headers });
  }

  obtenerConfigPublico(): Observable<ConfigShare>{

    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.get<ConfigShare>(this.url + 'obtener-config-publico', { headers: headers });
  }

  listarProductosPublico(filtro:string):Observable<Productos[]>{

    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get<Productos[]>(this.url + 'listar-productos-publico/'+filtro, { headers: headers });
  }

  agregarCarritoCliente(data:Carrito, token:any):Observable<Carrito>{

    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post<Carrito>(this.url + 'agregar-carrito-cliente',data, {headers: headers});
  }

  obtenerCarritoCliente(id:any, token:any):Observable<CarritoCliente[]>{

    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get<CarritoCliente[]>(this.url + 'obtener-carrito-cliente/'+id,{ headers: headers });
  }

  eliminarCarritoCliente(id:any, token:any):Observable<Carrito>{

    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete<Carrito>(this.url + 'eliminar-carrito-cliente/'+id,{ headers: headers });
  }

  limpiar_carrito_cliente(token:any):Observable<any>{

    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url + 'limpiar-carrito-cliente/',{ headers: headers });
  }
}
