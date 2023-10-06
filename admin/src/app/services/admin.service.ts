import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  public url:string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = global.url;
  }

  loginAdmin(data:any):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+'login-admin', data, { headers: headers });
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isAuthenticated(allowRoles: string[]): boolean {

    const token:any = localStorage.getItem('token');

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);

    console.log(decodedToken, 'isAuthenticated');

    try {


      if(!token){
        return false;
      }

      if(!decodedToken){
        localStorage.removeItem('token');
        return false;
      }

    } catch (error) {
      localStorage.removeItem('token');
      return false;
    }

    return allowRoles.includes(decodedToken['role']);
  }
}
