import { Injectable } from '@angular/core';
import { global } from './global';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url:any;

  constructor(
     private _http: HttpClient,
  ) {
    this.url = global.url;
  }

  registroProductoAdmin(data: any, file: any, token: any): Observable<any>{

    let headers = new HttpHeaders({ 'Authorization': token });

    const fd = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('stock', data.stock);
    fd.append('precio', data.precio);
    fd.append('descripcion', data.descripcion);
    fd.append('contenido', data.contenido);
    fd.append('categoria', data.categoria);
    fd.append('portada', file);

    return this._http.post(this.url + 'registro-producto-admin', fd, { headers: headers });
  }
}
