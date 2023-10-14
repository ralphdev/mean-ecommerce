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
  //* Servicio Productos
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

  listarProductosAdmin(filtro:any, token:any): Observable<any>{

    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar-productos-admin/'+filtro, { headers:headers });
 }

  obtenerProductoAdmin(id:any, token:any): Observable<any>{

    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener-producto-admin/'+id, { headers:headers });
  }

  actualizarProductoAdmin(data:any ,id:any, token:any): Observable<any>{
    if(data.portada){
      let headers = new HttpHeaders({ 'Authorization':token });

      const fd = new FormData();
      fd.append('titulo',data.titulo);
      fd.append('stock',data.stock);
      fd.append('precio',data.precio);
      fd.append('descripcion',data.descripcion);
      fd.append('contenido',data.contenido);
      fd.append('categoria',data.categoria);
      fd.append('portada',data.portada);

      return this._http.put(this.url+'actualizar-producto-admin/'+id, fd, { headers:headers });
    }else{
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.put(this.url+'actualizar-producto-admin/'+id,data,{headers:headers});
    }
  }

  eliminarProductoAdmin(id: any, token:any): Observable<any>{

    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+'eliminar-producto-admin/'+id,{ headers:headers });
  }

  //* Servicios Inventario

  listarInventarioProductoAdmin(id:any, token:any): Observable<any>{

    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token });
    return this._http.get(this.url+'listar-inventario-producto-admin/'+id, { headers:headers });
  }
  registroInventarioProductoAdmin(data:any, token:any): Observable<any>{

    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': token});
    return this._http.post(this.url+'registro-inventario-producto-admin', data, { headers:headers });
  }

  eliminarInventarioProductoAdmin(id:any ,token:any): Observable<any>{

    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': token });
    return this._http.delete(this.url+'eliminar-inventario-producto-admin/'+id, { headers:headers });
  }




}
