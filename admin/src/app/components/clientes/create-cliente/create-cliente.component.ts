import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Component, OnInit } from '@angular/core';

declare let iziToast: any;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styles: [
  ]
})
export class CreateClienteComponent {

  public cliente: any = {
    genero: ''
  };
  public token: any;
  public load_btn: boolean = false;
  public load_data: boolean = true;

  constructor(
    private _clienteService: ClienteService,
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.token = this._adminService.getToken();
  }

  registro(registroform: any) {

    if (registroform.valid) {

      console.log(this.cliente);
      this.load_btn = true;

      this._clienteService.registroClienteAdmin(this.cliente, this.token).subscribe({

        next: response => {
          console.log('response', response);

          iziToast.show({
            title: 'CORRECTO',
            titleColor: '#1DC740',
            class: 'text-success',
            position: 'topRight',
            message: 'Se registro correctamente el nuevo cliente'
          });

          this.cliente = {
            genero: '',
            nombres: '',
            apellidos: '',
            f_nac: '',
            telfono: '',
            cliente: ''
          }

          this.load_btn = false;

          this._router.navigate(['/panel/clientes']);
        },
        error: error => {
          console.log(error);
        }
      });
    } else {

      iziToast.show({
        title: 'ERROR',
        titleColor: '#458CFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos o estan incompletos!!!'
      });
    }
  }

}
