import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { global } from 'src/app/services/global';
import * as fs from 'file-saver';

declare let iziToast:any;
declare let jQuery:any;
declare let $: any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styles: [
  ]
})

export class IndexProductoComponent implements OnInit {

  public filtro:string = '';
  public token:any;
  public productos: Array<any> = [];
  public arrProductos: Array<any> = [];
  public url:any;
  public page:number = 1;
  public pageSize:number= 10;
  public loadData:boolean = true;
  public loadBtn:boolean = false;

  constructor( private _productoService: ProductoService) {
    this.token = localStorage.getItem('token');
    this.url = global.url;
  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this._productoService.listarProductosAdmin(this.filtro, this.token).subscribe({
      next: response => {

        console.log(response);
        this.productos = response.data;

        this.productos.forEach(element => {

          this.arrProductos.push({
            titulo: element.titulo,
            stock: element.stock,
            precio: element.precio,
            categoria: element.categoria,
            nventas: element.nventas
          });

          console.log(this.arrProductos);
          this.loadData = false;
        });
      },
      error: error => {
        console.log(error);
      }
    });
  }

  filtrar() {

  }

  resetear() {

  }

  eliminar(id:any) {

  }

  downloadExcel() {

  }

}
