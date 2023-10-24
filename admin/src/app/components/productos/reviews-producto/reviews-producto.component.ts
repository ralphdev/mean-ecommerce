import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { global } from 'src/app/services/global';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-reviews-producto',
  templateUrl: './reviews-producto.component.html',
  styles: [
  ]
})
export class ReviewsProductoComponent implements OnInit{

    public id:any;
    public token:any;
    public _iduser:any;
    public producto:any = {};
    public reviews: Array<any> = [];
    public url:any;
    public loadBtn = false;

  public page:number = 1;
  public pageSize:number = 15;

  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService
  ) {

    this.token = localStorage.getItem('token');
    this._iduser = localStorage.getItem('_id');
    this.url = global.url;
  }

  ngOnInit(): void {

    this._route.params.subscribe( params => {

      this.id = params['id'];

      this._productoService.obtenerProductoAdmin(this.id, this.token).subscribe({

        next: response => {

          if(response.data == undefined){

            this.producto = undefined;
          }else{

            this.producto = response.data;

            this._productoService.obtenerReviewsPublico(this.producto._id).subscribe({

              next: response => {
                this.reviews = response.data;
              },
              error: error => {
                console.log(error);
              }
            });
          }
        },
        error: error=>{

          console.log(error);
        }
      });
    });
  }

}
