import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';
import { global } from 'src/app/services/global';

declare let iziToast:any;
declare let jQuery:any;
declare let $:any;
//declare var docuVieware: any;

@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styles: [
  ]
})

export class UpdateProductoComponent {
  public producto:any = {};
  public config:any = {};
  public imgSelect:any;
  public loadBtn:boolean = false;
  public id:any;
  public token:any;
  public url:any;
  public file:any = undefined;
  public confiGlobal : any = {};

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _productoService:ProductoService,
    private _adminService:AdminService,
  ){
    this.config = { height: 500 }
    this.token = localStorage.getItem('token');
    this.url = global.url;
    this._adminService.obtenerConfigPublico().subscribe({
      next: response=>{

        this.confiGlobal = response.data;
      }
    })
  }

  ngOnInit(): void {

    this._route.params.subscribe( params => {

      this.id = params['id'];
      console.log(this.id);

      this._productoService.obtenerProductoAdmin(this.id, this.token).subscribe({
        next: response => {

          if(response.data == undefined){

            this.producto = undefined;
          }else{

            this.producto = response.data;
            this.imgSelect = this.url +'obtener-portada/'+this.producto.portada;
          }

        },
        error: error=>{
          console.log(error);

        }
      });
    });
  }

    actualizar(actualizarForm:any){

      if(actualizarForm.valid){

      let data : any = {};

      if(this.file != undefined){
        data.portada = this.file;
      }

      data.titulo = this.producto.titulo;
      data.stock = this.producto.stock;
      data.precio = this.producto.precio;
      data.categoria = this.producto.categoria;
      data.descripcion = this.producto.descripcion;
      data.contenido = this.producto.contenido;

      this.loadBtn = true;
      this._productoService.actualizarProductoAdmin(data, this.id, this.token).subscribe({
         next: response => {
          console.log(response);
          iziToast.show({
            title: 'CORRECTO',
            titleColor: '#1DC740',
            class: 'text-sucess',
            position: 'topRight',
            message: 'Se actualizo correctamente el nuevo producto'
          });

          this.loadBtn = false;

          this._router.navigate(['/panel/productos']);
        },
        error: error=>{
          console.log(error);
          this.loadBtn = false;

        }
      })
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos o estan incompletos'
      });

      this.loadBtn = false;
    }
  }

  fileChangeEvent(event:any):void {

    let file:any;

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

      this.loadBtn = false;

      $('#input-portada').text('Seleccionar imagen');
        this.imgSelect ='assets/img/01.jpg';
        this.file = undefined;
    }

    if(file.size <= 4000000){

      if(file.type == 'image/png' || file.type =='image/webp' || file.type =='image/jpg' || file.type =='image/gif' || file.type =='image/jpeg'){

        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        console.log(this.imgSelect);

        reader.readAsDataURL(file);

        $('#input-portada').text(file.name);
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
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }
    console.log(this.file);
  }

}
