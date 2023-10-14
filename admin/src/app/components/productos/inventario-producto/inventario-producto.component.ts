import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

import * as Excel from "exceljs";
import * as fs from 'file-saver';

declare let iziToast:any;
declare let jQuery:any;
declare let $: any;

@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styles: [
  ]
})
export class InventarioProductoComponent implements OnInit{

  public id:any;
  public token:any;
  public _iduser:any;
  public producto: any = {};
  public inventarios: Array<any> = [];
  public arrInventario: Array<any> = [];
  public inventario:any = {}

  public loadBtn = false;

  constructor(
    private _route : ActivatedRoute,
    private _productoService: ProductoService,
  ){
    this.token = localStorage.getItem('token');
    this._iduser = localStorage.getItem('_id');
  }

  ngOnInit():void {

    this._route.params.subscribe( params=>{

      this.id = params['id'];
      console.log(this.id);

      this._productoService.obtenerProductoAdmin(this.id, this.token).subscribe({
        next: response => {

          if(response.data == undefined){

            this.producto = undefined;
          }else{

            this.producto = response.data;

            console.log(this.producto);

            this._productoService.listarInventarioProductoAdmin(this.producto._id, this.token).subscribe({
              next: response => {

                this.inventarios = response.data;

                this.inventarios.forEach(element => {

                  this.arrInventario.push({
                    admin: element.admin.nombres + ' ' + element.admin.apellidos,
                    cantidad: element.cantidad,
                    proveedor: element.proveedor
                  });

                  console.log(this.arrInventario);
                });
              },
              error: error => {
                console.log(error);
              }
            });
          }
        },
        error: error => {
          console.log(error);
        }
      });
    });
  }

  registroInventario(inventarioForm:any){

    if(inventarioForm.valid){

      let data = {
        producto: this.producto._id,
        cantidad: inventarioForm.value.cantidad,
        admin: this._iduser,
        proveedor: inventarioForm.value.proveedor
      }

      this._productoService.registroInventarioProductoAdmin(data, this.token).subscribe({

        next: response => {

          iziToast.show({
            title: 'CORRECTO',
            titleColor: '#fff',
            class:'text-success',
            backgroundColor: '#28a745',
            position: 'topRight',
            messageColor: '#fff',
            message: 'Se agrego el nuevo inventario correctamente'
          });

          this._productoService.listarInventarioProductoAdmin(this.producto._id, this.token).subscribe({
            next: response => {

              this.inventarios = response.data;
            },
            error: error => {
              console.log(error);
            }
          });
        },
        error: error=>{
          console.log(error);
        }
      });
    }else{

      iziToast.show({
        title: 'ERROR',
        titleColor: '#fff',
        class:'text-danger',
        backgroundColor: '#dc3545',
        position: 'topRight',
        messageColor: '#fff',
        message: 'Los datos del formulario no son validos'
      });
    }
  }

  eliminar(id:any){

    this.loadBtn = true;
    this._productoService.eliminarInventarioProductoAdmin(id, this.token).subscribe({

    next: response => {

      iziToast.show({
        title: 'CORRECTO',
        titleColor: '#fff',
        class:'text-success',
        backgroundColor: '#28a745',
        position: 'topRight',
        messageColor: '#fff',
        message: 'Se ha eliminado correctamente el producto.'
      });

      $('#delete-'+id).modal('hide');
      $('.modal-backdrop').removeClass('show');

      this.loadBtn = false;

      this._productoService.listarInventarioProductoAdmin(this.producto._id, this.token).subscribe({

        next: response=>{

         this.inventarios = response.data;
         console.log(this.inventarios);
        },
        error: error=>{
         console.log(error);
        }
      });
    },
    error: error=>{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#000',
        class:'text-success',
        backgroundColor: '#ffc107',
        position: 'topRight',
        messageColor: '#000',
        message: 'Ha ocurrido un error en el servidor '
      });
      console.log(error);
      this.loadBtn = false;
     }
   })

  }

  downloadExcel(){

    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet("Reporte de productos");

    worksheet.addRow(undefined);

    for (let x1 of this.arrInventario){

      let x2=Object.keys(x1);

      let temp:any[] = []

      for(let y of x2){
        temp.push(x1[y] as never);
      }
      worksheet.addRow(temp)
    }

    let fname='REP01- ';

    worksheet.columns = [
      { header: 'Trabajador', key: 'col1', width: 30},
      { header: 'Cantidad', key: 'col2', width: 15},
      { header: 'Proveedor', key: 'col3', width: 25},

    ] as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }

}
