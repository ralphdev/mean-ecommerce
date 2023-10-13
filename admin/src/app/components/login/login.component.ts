import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

declare let iziToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  public user: any = { email: '', password: '' };
  public usuario: any = {};
  public token: any = '';

  constructor(
    private _adminService:AdminService,
    private _router:Router
  ){
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    if(this.token){
      this._router.navigate(['/']);
    }
  }

  login(loginForm:any): any {

    if(loginForm.valid){

      let data = {
        email: this.user.email,
        password: this.user.password
      }

      this._adminService.loginAdmin(data).subscribe({
        next: (v) => {
          this.usuario = v.adminData;

          console.log(this.usuario, 'llamado del loginComponent');

          localStorage.setItem('token', v.token);
          localStorage.setItem('_id', v.adminData._id);

          //Si todo ok, redirect Home
          this._router.navigate(['/']);

        },
        error: (e) => {
          iziToast.show({
            title: 'Error',
            titleColor: '#ff0000',
            color: '#fff',
            class: 'text-danger',
            position: 'topRight',
            message: (e.error.message == undefined) ? 'Error Server ': e
          });
        },
        complete: () => console.info('completó enviar el login')
      });
    }
    else {
      iziToast.show({
        title: 'Error',
        titleColor: '#ff0000',
        color: '#fff',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son válidos'
      });
    }
  }
}

