import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { GuestService } from 'src/app/services/guest.service';
import { global } from 'src/app/services/global';
import { Categoria } from 'src/app/models/config-share';
import { Carrito, Productos } from 'src/app/models';

import { io } from "socket.io-client";

declare let noUiSlider:any;
declare let $:any;
declare var iziToast:any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styles: [
  ]
})
export class IndexProductoComponent implements OnInit{

  public categorias: Categoria[] = [];
  public productos: Productos[] = [];
  public slug:string = '';
  public filterCategoria:string = '';
  public filterProducto:string = '';
  public filterCatProductos:string = 'todos';

  public producto: any = {};
  public url:any;
  public loadData = true;

  public routeCategoria:any;
  public page:number = 1;
  public pageSize:number = 15;

  public sortBy = 'Defecto';
  public carritoData: any = {
    variedad: '',
    cantidad: 1
  };
  public btnCart:boolean = false;
  public token:any;
  public socket = io('http://localhost:4201');
  //public descuento_activo : any = undefined;
  public reviews :Array<any> = [];

  public count_five_start:number = 0;
  public count_four_start:number = 0;
  public count_three_start:number = 0;
  public count_two_start:number = 0;
  public count_one_start:number = 0;

  public total_puntos:number = 0;
  public max_puntos:number = 0;
  public porcent_raiting:number = 0;
  public puntosRating:number = 0;

  public cinco_porcent:number = 0;
  public cuatro_porcent:number = 0;
  public tres_porcent:number = 0;
  public dos_porcent:number = 0;
  public uno_porcent:number = 0;

  constructor(
    private _clienteService:ClienteService,
    private _route: ActivatedRoute,
    private _guestService:GuestService
  ) {

    this.token = localStorage.getItem('token');
    this.url = global.url;

    this._clienteService.obtenerConfigPublico().subscribe({

      next: response => {
        this.categorias = response.categorias;
      }
    });

    //** Filtrar Productotos por la ruta de Categorías */
    this._route.params.subscribe( params => {

      this.slug = params['slug'];
      this.routeCategoria = params['categoria'];

      if(this.routeCategoria){

        this._clienteService.listarProductosPublico('').subscribe({
          next: response => {

            this.productos = response;
            this.productos = this.productos.filter(item => item.categoria.toLowerCase() == this.routeCategoria);

            console.log(this.productos);
            this.loadData = false;
          }
        });
      }
      else{

        this._clienteService.listarProductosPublico('').subscribe({

          next: response => {

            this.productos = response;
            this.loadData = false;
          }
        });
      }
    });
  }

  ngOnInit(): void {

    let slider:any = <HTMLElement>document.getElementById('slider');

    noUiSlider.create(slider, {
      start: [0, 1000],
      connect: true,
      range: { 'min': 0, 'max': 1000 },
      tooltips: [true, true],
      pips: { mode: 'count', values: 5, }
    });

    slider.noUiSlider.on('update', function (values:number[]) {

      $('.cs-range-slider-value-min').val(values[0]);
      $('.cs-range-slider-value-max').val(values[1]);
    });
    $('.noUi-tooltip').css('font-size','11px');

  }

  buscarProducto(){

    this._clienteService.listarProductosPublico(this.filterProducto).subscribe(response => {

      this.productos = response;
      this.loadData = false;
    });
  }

  buscarCategorias(){

    if(this.filterCategoria){

      var search = new RegExp(this.filterCategoria, 'i');

      this.categorias = this.categorias.filter(item => search.test(item.titulo));
    }else{

      this._clienteService.obtenerConfigPublico().subscribe( response => {

        this.categorias = response.categorias
      });
    }

  }

  buscarPrecio(){

    this._clienteService.listarProductosPublico(this.filterProducto).subscribe( response => {

      this.productos = response;
      let min = parseInt($('.cs-range-slider-value-min').val());
      let max = parseInt($('.cs-range-slider-value-max').val());

      this.productos = this.productos.filter((item) => {
        return item.precio >= min && item.precio <= max
      });
    });
  }

  buscarPorCategoria(){

    if(this.filterCatProductos == 'todos'){

      this._clienteService.listarProductosPublico(this.filterProducto).subscribe(response => {
        this.productos = response;
        this.loadData = false;
      });
    }else{

      this._clienteService.listarProductosPublico(this.filterProducto).subscribe(response => {

        this.productos = response;
        this.productos = this.productos.filter( item => item.categoria == this.filterCatProductos);
        this.loadData = false;
      });
    }
  }

  resetProductos(){

    this.filterProducto = '';
    this._clienteService.listarProductosPublico('').subscribe(response => {

      this.productos = response;
      this.loadData = false;

    });
  }

  ordenarPor(){

    if(this.sortBy == 'Defecto'){

      this._clienteService.listarProductosPublico('').subscribe(response => {

        this.productos = response;
        this.loadData = false;
      });
    }
    else if(this.sortBy == 'Popularidad'){

      this.productos.sort((a, b) => {

        if (a.nventas < b.nventas) {
          return 1;
        }

        if (a.nventas > b.nventas) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    }
    else if(this.sortBy == '+-Precio'){

      this.productos.sort(function (a, b) {

        if (a.precio < b.precio) {
          return 1;
        }
        if (a.precio > b.precio) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    }
    else if(this.sortBy == '-+Precio'){

      this.productos.sort((a, b) => {

        if (a.precio > b.precio) {
          return 1;
        }
        if (a.precio < b.precio) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    }
    else if(this.sortBy == 'azTitulo'){

      this.productos.sort((a, b) => {

        if (a.titulo! > b.titulo!) {
          return 1;
        }
        if (a.titulo! < b.titulo!) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    }
    else if(this.sortBy == 'zaTitulo'){

      this.productos.sort((a, b) => {

        if (a.titulo! < b.titulo!) {
          return 1;
        }
        if (a.titulo! > b.titulo!) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    }
  }

  agregarProducto(producto:Productos){

    let data:Carrito = {
      producto: producto._id,
      cliente: `${localStorage.getItem('_id')}`,
      cantidad: 1,
      variedad: producto.variedades[0]?.titulo
    };

    this.btnCart = true;

  //   //devolver la data al backend
    this._clienteService.agregarCarritoCliente(data, this.token).subscribe({

      next: response => {

        console.log('agregado', response);

        if(response == undefined){
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            class: 'text-danger',
            position: 'topRight',
            message: 'El producto ya existe en el carrito'
          });
          this.btnCart = false;
        }
         else{

          iziToast.show({
            title: 'CORRECTO',
            titleColor: '#33FFB2',
            class: 'text-sucess',
            position: 'topRight',
            message: 'Se agrego el producto al carrito.'
          });

          //** Socket io, metodo emisor de envio
          this.socket.emit('add-carrito-add', { data:true });
          this.btnCart = false;
        }
      },
      error: e => {
        console.log('mensaje de error', e);
      }


    });
  }
}
