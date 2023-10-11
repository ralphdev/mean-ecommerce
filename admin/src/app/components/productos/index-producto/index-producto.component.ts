import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { global } from 'src/app/services/global';
//import * as fs from 'file-saver';


@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styles: [
  ]
})

export class IndexProductoComponent {

  public filtro:string = '';
  public token:any;
  public productos: Array<any> = [];
  public arr_productos: Array<any> = [];
  public url:any;
  public page:number = 1;
  public pageSize:number= 10;
  public load_data:boolean = true;
  public load_btn:boolean = false;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {

  }

  filtrar() {

  }

  resetear() {

  }

  eliminar() {

  }

  downloadExcel() {

  }

}
