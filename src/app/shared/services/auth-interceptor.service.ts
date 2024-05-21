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
  apiCurso = environment.baseUrl + 'cursos'
  apiMatricula = environment.baseUrl + 'matriculas'

  token: string | null;

  constructor(private localStorageService: LocalStorageService) {
    this.token = this.localStorageService.getData('token');
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.token = this.localStorageService.getData('token');
    if (this.token && req.url!=this.apiCurso + '/image' && req.url!=this.apiCurso + '/pdf' && req.url!=this.apiMatricula + '/pdf' && req.url!=this.apiMatricula + '/pdfcertificate') {
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
