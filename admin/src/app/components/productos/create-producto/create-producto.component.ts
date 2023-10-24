import { Component, OnInit } from '@angular/core'
import { AdminService } from 'src/app/services/admin.service'
import { ProductoService } from 'src/app/services/producto.service'
import { Router } from '@angular/router'
import { Categoria } from 'src/app/models/config-share';

declare let iziToast:any;
declare let jQuery:any;
declare let $:any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styles: [
  ]
})

export class CreateProductoComponent {

  public producto:any = {
    categoria: ''
  };
  public file: any = undefined;
  public imgSelect: any | ArrayBuffer = 'assets/img/01.jpg';
  public config : any = {};
  public token:any;
  public loadBtn:boolean = false;
  public categorias: Categoria[] = [];

  constructor(
    private _productoService : ProductoService,
    private _adminService : AdminService,
    private _router: Router
  ) {

    this.token = this._adminService.getToken();

    this.config = { hight: 500 };

    this._adminService.obtenerConfigPublico().subscribe({
      next: response => {

        this.categorias = response.categorias;
      }
    });
  }

  registro(registroForm: any) {

    console.log(registroForm.valid);

    if (registroForm.valid) {

      if (this.file == undefined) {

        iziToast.show({
          title: 'ERROR',
          titleColor: '#FC2E2E',
          class: 'text-success',
          position: 'topRight',
          message: 'Debe subir una portada para registrar'
        });
      } else {

        console.log(this.producto);
        console.log(this.file);

        this.loadBtn = true;

        this._productoService.registroProductoAdmin(this.producto, this.file, this.token).subscribe({
          next: response => {
            iziToast.show({
              title: 'CORRECTO',
              titleColor: '#1DC740',
              class: 'text-success',
              position: 'topRight',
              message: 'Se registro correctamente el nuevo producto'
            });
            this.loadBtn = false;
            this._router.navigate(['/panel/productos']);
          },
          error: error => {
            console.log(error);
            this.loadBtn = false;
          }
        })
      }
    }else {

      iziToast.show({
        title: 'ERROR',
        titleColor: '#FC2E2E',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos o estan incompletos!!!'
      });
      this.loadBtn = false;
    }
  }

  fileChangeEvent(event: any) {

    let file: any;

    if (event.target.files && event.target.files[0]) {

      file = <File>event.target.files[0];
    } else {

      iziToast.show({
        title: 'ERROR',
        titleColor: '#FC2E2E',
        class: 'text-danger',
        position: 'topRight',
        message: 'No hay una imagen de envio'
      });
    }

    //* Validación del tamaño
    if (file.size <= 8000000) {
      //* Validación del tipo de imagen
      if (file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg') {

        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        reader.readAsDataURL(file);

        $('#input-portada').text(file.name);
        this.file = file;
      } else {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FC2E2E',
          class: 'text-danger',
          position: 'topRight',
          message: 'El archivo debe ser de formato (.PNG; .WEBP; .JPG; .GIF; .JPEG)',
        });

        this.loadBtn = false;
        $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined;
      }
    }

    //console.log(this.file);
  }

}
