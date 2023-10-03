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

  //, token: any

  listClientesFiltroAdmin(tipo: any, filtro: any): Observable<any>{

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': token
    });

    return this._http.get(this.url + 'listar-clientes-filtro-admin/' + tipo + '/' + filtro, { headers: headers });
  }


}
