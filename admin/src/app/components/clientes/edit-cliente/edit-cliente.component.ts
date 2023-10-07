import { ClienteService } from 'src/app/services/cliente.service';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare let iziToast: any;

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styles: [
  ]
})
export class EditClienteComponent {

  public id: any;
  public cliente: any = {};
  public token: any;
  public load_btn: boolean = false;
  public load_data: boolean = true;

  constructor(
    private _route: ActivatedRoute,
    private _clienteService: ClienteService,
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.token = _adminService.getToken();
  }

  ngOnInit(): void {

    this._route.params.subscribe(params => {

      this.id = params['id'];

      this._clienteService.obtenerClienteAdmin(this.id, this.token).subscribe({

        next: response => {

          if (response.data == undefined) {

            this.cliente = undefined;
            this.load_data = false;
          } else {

            this.cliente = response.data;
            this.load_data = false;
          }
        },
        error: error => {
          console.log(error);
        }
      })
    });
  }

  actualizar(updateForm: any) {

    if (updateForm.valid) {

      this.load_btn = true;

      this._clienteService.actualizarClienteAdmin(this.id, this.cliente, this.token).subscribe({

        next: response => {

          iziToast.show({
            title: 'CORRECTO',
            titleColor: '#1DC740',
            class: 'text-success',
            position: 'topRight',
            message: 'Se actualizo correctamente los datos del cliente'
          });

          this.load_btn = false;

          this._router.navigate(['/panel/clientes']);

        },
        error: error => {
          console.log(error);
        }
      })
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
