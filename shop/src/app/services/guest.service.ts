import { Injectable } from '@angular/core';
import { global } from './global';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  public url:any;

  constructor(
    private _http: HttpClient
  ) {
    this.url = this.url;
  }
}
