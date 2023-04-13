import { HttpEvent,  HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import {AuthService} from "../../services/auth.service";


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private authservice: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    //testons si le token valide
    const jwtHelper = new JwtHelperService();
    if ((token && !jwtHelper.isTokenExpired(token))) {
      req = req.clone({ headers: req.headers.set('Accept', 'application/json')})
      const cloneRequest = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer '+ token)})
      return next.handle(cloneRequest);
    }else {
      this.authservice.logout();
      return next.handle(req);
    }
  }
}


export const InterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorService,
  multi: true
}
