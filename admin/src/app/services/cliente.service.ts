import { Injectable } from '@angular/core';
import { global } from "./global";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url: any;

  constructor(
    private _http: HttpClient
  ) {
    this.url = global.url;
  }

  /**
   * Funcion Filtrar para llamar al api del backend.
   * @param tipo
   * @param filtro
   * @param token
   * @returns
   */
  listClientesFiltroAdmin(tipo: any, filtro: any, token: any): Observable<any>{

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.get(this.url + 'listar-clientes-filtro-admin/' + tipo + '/' + filtro, { headers: headers });
  }

  registroClienteAdmin(data: any,token:any): Observable<any>{

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this._http.post(this.url+'registro-cliente',data,{ headers:headers });
  }

  obtenerClienteAdmin(id:any, token:any): Observable<any>{

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.get(this.url + 'obtener-cliente-admin/' + id, { headers: headers });
  }

  actualizarClienteAdmin(id: any, data:any, token:any):Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.put(this.url+'actualizar-cliente-admin/'+id, data,{ headers:headers });
  }
}
