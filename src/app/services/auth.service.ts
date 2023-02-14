import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_url: string = environment.api_url;
  constructor(private http: HttpClient) { }

  authenticate(credentials: FormData) {
    return this.http.post(this.api_url + '/login', credentials)
  }

  saveTokenToLocalStorage(token: string) {
    const decodeToken: any = jwt_decode(token);
    localStorage.setItem('token', token)
    localStorage.setItem('roles', decodeToken['roles'])
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('access_token')
  }
}
