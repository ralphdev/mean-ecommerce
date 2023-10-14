import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { global } from 'src/app/services/global';

import * as Excel from "exceljs";
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

    if(this.filtro){

      this._productoService.listarProductosAdmin(this.filtro, this.token).subscribe({
        next: response => {
          this.productos = response.data;
          this.loadData = false;
        },
        error: error => {
          console.log(error);
        }
      });
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FC2E2E',
        class: 'text-success',
        position: 'topRight',
        message: 'Ingrese un filtro para buscar'
      });
    }
  }

  resetear() {
    this.filtro = '';
    this.initData();
  }

  eliminar(id:any) {

    this.loadBtn = true;
    this._productoService.eliminarProductoAdmin(id, this.token).subscribe({
      next: response=>{
        iziToast.show({
          title: 'CORRECTO',
          titleColor: '#1DC740',
          class: 'text-success',
          position: 'topRight',
          message: 'Se elimino correctamente el producto'
        });

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.loadBtn = false;

        this.initData();

      },
      error: error=>{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#1DC740',
          class: 'text-success',
          position: 'topRight',
          message: 'Ocurrio un error en el servidor'
        });
        console.log(error);
      }
    });
  }

  downloadExcel() {

    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet("Reporte de productos");

    worksheet.addRow(undefined);

    for (let x1 of this.arrProductos){

      let x2 = Object.keys(x1);

      let temp:any[] = []

      for(let y of x2){

        temp.push(x1[y] as never);
      }

      worksheet.addRow(temp)
    }

    let fname='REP01- ';

    worksheet.columns = [
      { header: 'Producto', key: 'col1', width: 30},
      { header: 'Stock', key: 'col2', width: 15},
      { header: 'Precio', key: 'col3', width: 15},
      { header: 'Categoria', key: 'col4', width: 25},
      { header: 'N° ventas', key: 'col5', width: 15},
    ] as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });

  }

}
