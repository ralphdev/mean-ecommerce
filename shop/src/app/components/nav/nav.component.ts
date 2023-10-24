import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { GuestService } from 'src/app/services/guest.service';
import { global } from 'src/app/services/global';
import { io } from "socket.io-client";
import { Categoria, CarritoCliente} from 'src/app/models';



declare let $:any;
declare let iziToast:any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: [
  ]
})

export class NavComponent implements OnInit {

  public url:any;
  public token:any;

  public id:any;
  public user:any = undefined;
  public userLc:any = undefined ;
  public oPcart = false;

  public categorias: Categoria[] = [];
  public carritoArr: Array<CarritoCliente> = [];

  public subTotal:number = 0;

  public socket = io('http://localhost:4201');
  //public descuentoActivo:any = undefined;

  constructor(
    private _clienteService: ClienteService,
    private _router: Router,
    private _guestService:GuestService
  ) {

    this.url = global.url;
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');

    this._clienteService.obtenerConfigPublico().subscribe({

      next: response => {
        this.categorias = response.categorias;
      },
      error: e  => {
        console.log("mensaje", e);
      }
    });

    if(this.token){

      this._clienteService.obtenerClienteGuest(this.id, this.token).subscribe({

        next: response => {

          this.user = response.data;
          localStorage.setItem('user_data',JSON.stringify(this.user));

          if(localStorage.getItem('user_data')){

            this.userLc = JSON.parse(localStorage.getItem('user_data') || '{}');
            this.obtenerCarrito();

          }else{

            this.userLc = undefined;
          }
        },
        error: e => {
          this.user = undefined;
        }
      });
    }
  }

  ngOnInit(): void {

    this.socket.on('new-carrito', this.obtenerCarrito.bind(this));
    this.socket.on('new-carrito-add', this.obtenerCarrito.bind(this));
  }

  // ** Abrir la bandeja Carrito
  opModalCart(){

    if(!this.oPcart){
      this.oPcart = true;
      $('#cart').addClass('show');
    }else{

      this.oPcart = false;
      $('#cart').removeClass('show');
    }
  }

  //** Obtener los productos Agregado al Carrito */
  obtenerCarrito(){

    this._clienteService.obtenerCarritoCliente(this.userLc._id, this.token).subscribe({

      next: response => {

        console.log('tengo en mi carrito', response);

        this.carritoArr = response;
        this.subTotal = 0;
        this.calcularCarrito();
      }
  });

  }

  //** Calcualar el SubTotal del Carrito */
  calcularCarrito(){

    this.subTotal = 0;

    if(this.carritoArr.length > 0){

      this.carritoArr.forEach(element => {

        this.subTotal = this.subTotal += element.producto.precio;
      });

    }
  }

  //** Eliminar producto del Carrito */
  eliminarItem(id:any){

    this._clienteService.eliminarCarritoCliente(id, this.token).subscribe( response => {

      iziToast.show({
        title: 'CORRECTO',
        titleColor: '#33FFB2',
        class: 'text-sucess',
        position: 'topRight',
        message: 'Se elimino el producto del carrito.'
      });

      this.socket.emit('delete-carrito',{data:response});
      console.log(response);

    });
  }

  //** Cerrar Session */
  logout(){
    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/']);
  }

}
