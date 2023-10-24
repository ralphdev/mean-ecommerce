import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ConfigShare } from '../models';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  public url:string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = global.url;
  }

  loginAdmin(data:any):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+'login-admin', data, { headers: headers });
  }

  getToken(){
    return localStorage.getItem('token');
  }

  public isAuthenticated(allowRoles: string[]): boolean {

    const token:any = localStorage.getItem('token');

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);

    try {

      if(!token){

        return false;
      }

      if(!decodedToken){

        localStorage.removeItem('token');
        return false;
      }

    } catch (error) {

      localStorage.removeItem('token');
      return false;
    }

    return allowRoles.includes(decodedToken['role']);
  }

  actualizaConfigAdmin(id:any, data:any, token:any): Observable<any>{

    if(data.logo){

      let headers = new HttpHeaders({ 'Authorization':token });

      const fd = new FormData();
      fd.append('titulo', data.titulo);
      fd.append('serie', data.serie);
      fd.append('correlativo', data.correlativo);
      fd.append('categorias', JSON.stringify(data.categorias));
      fd.append('logo', data.logo);

      return this._http.put(this.url+'actualiza-config-admin/'+id, fd, { headers:headers });

    }else{

      let headers = new HttpHeaders({ 'Content-Type':'application/json', 'Authorization':token });
      return this._http.put(this.url+'actualiza-config-admin/'+id,data,{ headers:headers });
    }
  }

  obtenerConfigAdmin(token:any): Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':token });
    return this._http.get(this.url+'obtener-config-admin',{ headers:headers });
  }

  obtenerConfigPublico(): Observable<ConfigShare>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get<ConfigShare>(this.url+'obtener-config-publico', { headers:headers });
  }
}
