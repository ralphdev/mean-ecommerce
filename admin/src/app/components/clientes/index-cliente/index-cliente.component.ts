import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})

export class IndexClienteComponent {

  constructor(
    private _clienteService: ClienteService,
    private _adminService: AdminService
  ) {
    this.token = this._adminService.getToken();

  }

  public clientes: Array<any> = [];
  public filtro_apellidos: string = '';
  public filtro_correo: string = '';

  // * Variables de paginación
  public page: number = 1;
  public pageSize: number = 4;
  public totalItems: any;
  public previousPage: any;

  public token: any;
  public load_data: boolean = true;

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    console.log(this.token);

    this._clienteService.listClientesFiltroAdmin(null, null, this.token).subscribe({
      next: response => {

        this.clientes = response.data;
        this.load_data = false;

      },
      error: error => {

        console.error(error);
      }
    })
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.initData();
    }
  }

  filtro(tipo: string) {

  }

  eliminar(id: string) {

  }

}
