import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {
  api = environment.baseUrl + 'curso/'
  token: string | null;

  constructor(private localStorageService: LocalStorageService) {
    this.token = this.localStorageService.getData('token');
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.token = this.localStorageService.getData('token');
    if (this.token && req.url!=this.api + 'image' && req.url!=this.api + 'pdf') {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      });
    } else {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`
        },
      });
    }

    return next.handle(req);
  }
}
