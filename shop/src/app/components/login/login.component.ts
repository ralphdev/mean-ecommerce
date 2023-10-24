import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

declare let iziToast:any;
declare let jQuery:any;
declare let $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})

export class LoginComponent {

  public user:any = {};
  public usuario:any = {};
  public token:any;
  public cliente:any = {};

  constructor(
    private _clienteService:ClienteService,
    private _router:Router
  ){

    this.token = localStorage.getItem('token');

    if(this.token){
      this._router.navigate(['/']);
    }

  }

  login(loginForm:any){

    if(loginForm.valid){

      let data:any = {
        email: this.user.email,
        password: this.user.password
      }

      this._clienteService.loginCliente(data).subscribe({

        next: response => {

          if(response.clienteData == undefined){

            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              color: '#FFF',
              class: 'text-danger',
              position: 'topRight',
              message: response
            });
          }else{

            this.usuario = response.clienteData;

            localStorage.setItem('token', response.token);
            localStorage.setItem('_id', response.clienteData._id);

            this._clienteService.obtenerClienteGuest(response.clienteData._id, response.token).subscribe({

              next: response => {
                console.log(response);

              },
              error: error => {
                console.log(error);

              }
            });

            this._router.navigate(['/']);
          }

        },
        error: error => {

          console.log(error);
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: error.error.message
          });

        }
      });

    }else{

      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      });
    }

  }

  validarEmail(email:string){

    let pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
    return pattern.test(email);
  }

  registro(registroForm:NgForm){

    if(this.cliente.password.length <= 5) {

      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'La contraseña debe tener mas de 5 caracteres'
      });
      return
    }
    else if(!this.validarEmail(this.cliente.email)){

      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: "Email invalido"
      });
      return
    }
    if(registroForm.valid){

      this._clienteService.registroCliente(this.cliente).subscribe({

        next: response => {

          console.log(response);

          iziToast.show({
            title: 'CORRECTO',
            titleColor: '#33FFB2',
            class: 'text-sucess',
            position: 'topRight',
            message: 'Se registro correctamente el nuevo cliente'
          });

          this.cliente = {
            nombres: this.cliente.nombres,
            apellidos: this.cliente.apellidos,
            email: this.cliente.email,
            password: this.cliente.password
          }

          registroForm.reset();
          this._router.navigate(['/login']);
        },
        error: error => {
          console.log(error);
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            class: 'text-danger',
            position: 'topRight',
            message: error.error
          });
        }
      });
    }else{

      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      });
    }
  }

}
