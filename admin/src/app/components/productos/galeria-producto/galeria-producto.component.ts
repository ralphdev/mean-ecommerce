import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { global } from 'src/app/services/global';
import { ProductoService } from 'src/app/services/producto.service';
import { v4 as uuidv4 } from 'uuid';

declare let iziToast:any;
declare let $:any;

@Component({
  selector: 'app-galeria-producto',
  templateUrl: './galeria-producto.component.html',
  styles: [
  ]
})

export class GaleriaProductoComponent {

  public producto:any = {};
  public id:any;
  public token:any;

  public file:any = undefined;
  public loadBtn = false;
  public loadBtnEliminar = false;
  public url:any;

  constructor(
    private _route: ActivatedRoute,
    private _productoService : ProductoService
    ){

    this.token = localStorage.getItem('token');
    this.url = global.url;

    this._route.params.subscribe( params => {

      this.id = params['id'];

      this.initData();

    });
  }

  initData(){

    this._productoService.obtenerProductoAdmin(this.id, this.token).subscribe({

      next: response => {

        if(response.data == undefined){
          this.producto = undefined;
        }else{

          this.producto = response.data;
        }
      },
      error: error=>{
        console.log(error);
      }
    });
  }

  fileChangeEvent(event:any): void {

    let file:any;

    if(event.target.files && event.target.files[0]){

      file = <File>event.target.files[0];
    }else{

      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'No hay una imagen'
      });

    }

    if(file.size <= 4000000){

      if(file.type == 'image/png' || file.type =='image/webp' || file.type =='image/jpg' || file.type =='image/gif' || file.type =='image/jpeg'){

        this.file = file;

      }else{

        iziToast.show({
          title: 'ERROR',
          titleColor: '#fc0303',
          class: 'text-danger',
          position: 'topRight',
          message: 'El archivo debe ser una imagen'
        });

        $('input-img').val('');
        this.file = undefined;
      }

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#fc0303',
        class: 'text-danger',
        position: 'topRight',
        message: 'la imagen no puede superar los 4MB'
      });

      $('input-img').val('');
      this.file = undefined;
    }
  }

  subirImagen(){

    if(this.file != undefined){

      let data = {
        imagen: this.file,
        _id: uuidv4()
      }

      this._productoService.agregarGaleriaAdmin(this.id, data, this.token).subscribe({

        next: response => {

          this.initData();
          $('input-img').val('');

        }
      });
    }else{

      iziToast.show({
        title: 'ERROR',
        titleColor: '#fc0303',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe seleccionar una imagen para subir'
      });
    }
  }

  eliminar(id:any){

    this.loadBtnEliminar = true;
    this._productoService.eliminarGaleriaAdmin(this.id, { _id:id }, this.token).subscribe({

      next: response => {
        iziToast.show({
          title: 'CORRECTO',
          titleColor: '#33FFB2',
          class: 'text-sucess',
          position: 'topRight',
          message: 'Se eliminó correctamente la imagen'
        });

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.loadBtnEliminar = false;

        this.initData();
      },
      error: error => {

        iziToast.show({
          title: 'ERROR ',
          titleColor: '#fc0303',
          class: 'text-sucess',
          position: 'topRight',
          message: 'Ocurrió un error en el servidor'
        });
        console.log(error);

        this.loadBtn = false;

      }
    });
  }

}
