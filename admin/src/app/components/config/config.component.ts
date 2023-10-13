import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { global } from 'src/app/services/global';
import { v4 as uuidv4 } from 'uuid';


declare let iziToast:any;
declare let jQuery: any;
declare let $: any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {

  public token:any;
  public config:any = {};
  public url:any;

  public tituloCat:string = '';
  public iconoCat:string = '';
  public file:any = undefined;
  public imgSelect:any | ArrayBuffer = '';

  constructor(private _adminService:AdminService){

    this.token = localStorage.getItem('token');
    this.url = global.url;

    this._adminService.obtenerConfigAdmin(this.token).subscribe({
      next: response => {
        this.config = response.data;
        this.imgSelect = this.url+'obtener-logo/'+this.config.logo;
      },
      error: error => {
        console.log(error);
      }
    })
  }

  agregarCat(){
    if(this.tituloCat){

      this.config.categorias.push({
        titulo: this.tituloCat,
        icono: this.iconoCat,
        _id: uuidv4()
      });

      this.tituloCat = '';
      this.iconoCat = '';
    }else{

      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe ingresar un titulo e icono para la categoria'
      });
    }
  }

  actualizar(confForm:any){

    if(confForm.valid){

      let data = {
        titulo: confForm.value.titulo,
        serie: confForm.value.serie,
        correlativo: confForm.value.correlativo,
        categorias: this.config.categorias,
        logo: this.file
      }

      console.log(data);

      this._adminService.actualizaConfigAdmin("65277819b8c4bc0da2fdc613", data, this.token).subscribe({
        next: response => {
          iziToast.show({
            title: 'SUCESS',
            titleColor: '#33FFB2',
            class: 'text-sucess',
            position: 'topRight',
            message: 'Se actualizo correctamente la configuración'
          });
        }
      });
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Complete correctamente el formulario'
      });
    }
  }

  fileChangeEvent(event:any):void{
    var file:any;
    if(event.target.files && event.target.files[0]){
      file=<File>event.target.files[0];

    }else{
      iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class: 'text-danger',
          position: 'topRight',
          message: 'No hay una imagen'
      });

      $('#input-portada').text('Seleccionar imagen');
        this.imgSelect ='assets/img/01.jpg';
        this.file = undefined;
    }

    if(file.size<= 4000000){

      if(file.type == 'image/png' || file.type =='image/webp' || file.type =='image/jpg' || file.type =='image/gif' || file.type =='image/jpeg'){

        const reader = new FileReader();
        reader.onload= e => this.imgSelect = reader.result;

        $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbail rounded');
        $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload');

        reader.readAsDataURL(file);
        this.file = file;

      }else{

        iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            class: 'text-danger',
            position: 'topRight',
            message: 'El archivo debe ser de formato (.PNG; .WEBP; .JPG; .GIF; .JPEG)'
        });

        $('#input-portada').text('Seleccionar imagen');
        this.imgSelect ='assets/img/01.jpg';
        this.file = undefined;
      }
    }else{

      iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class: 'text-danger',
          position: 'topRight',
          message: 'la imagen no puede superar los 4MB'
      });

      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect ='assets/img/logo.png';
      this.file = undefined;
    }
    console.log(this.file);

  }

  ngDoCheck(): void{
    $('.cs-file-drop-preview').html("<img src="+this.imgSelect+">");
  }

  eliminarCategoria(idx: any){
    this.config.categorias.splice(idx, 1);
  }

}
