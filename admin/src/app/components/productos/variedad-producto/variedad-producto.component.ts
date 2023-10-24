import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { global } from 'src/app/services/global';

declare let iziToast:any;
declare let jQuery: any;
declare let $: any;

@Component({
  selector: 'app-variedad-producto',
  templateUrl: './variedad-producto.component.html',
  styles: [
  ]
})
export class VariedadProductoComponent {

  public producto:any = {};
  public id:any;
  public token:any;

  public nuevaVariedad:string = '';
  public loadBtn = false;
  public url:any;

  constructor(
    private _route: ActivatedRoute,
    private _productoService : ProductoService
  ){
    this.token = localStorage.getItem('token');
    this.url = global.url;

    this._route.params.subscribe( params=>{
      this.id = params['id'];

      this._productoService.obtenerProductoAdmin(this.id, this.token).subscribe({

        next: response => {

          if(response.data == undefined){

            this.producto = undefined;
          }else{

            this.producto = response.data;
          }
        },
        error: error => {
          console.log(error);
        }
      })
    });
  }

  agregarVariedad(){

    if(this.nuevaVariedad){

      this.producto.variedades.push({
        titulo: this.nuevaVariedad
      });

      this.nuevaVariedad = '';

    }else{

      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'El campo de la variedad debe ser completado :)'
      });
    }

  }

  eliminarVariedad(idx:any){

    this.producto.variedades.splice(idx,1);
  }

  actualizar(){

    if(this.producto.titulo_variedad){

      if(this.producto.variedades.length >= 1 ){

        //* actualizar
        this.loadBtn = true;

        this._productoService.actualizarProductoVariedadesAdmin({

          titulo_variedad: this.producto.titulo_variedad,
          variedades : this.producto.variedades

        }, this.id, this.token).subscribe({

          next: response => {
            iziToast.show({
              title: 'CORRECTO',
              titleColor: '#33FFB2',
              class: 'text-sucess',
              position: 'topRight',
              message: 'Se agrego correctamente la nueva variedad'
            });

            this.loadBtn = false;
          }
        });
      }else{

        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class: 'text-danger',
          position: 'topRight',
          message: 'Debe agregar al menos una variedad'
        });
      }
    }else{

      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe completar el titulo de la variedad :)'
      });
    }
  }

}
