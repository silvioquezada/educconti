import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioDTO } from '../models/usuario.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  api = environment.baseUrl + "usuarios/";
  constructor(private http:HttpClient) { }

  login(post: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(this.api + "login/", post);
  }

  save(post: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(this.api, post);
  }

  update(post: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.put<UsuarioDTO>(this.api, post);
  }

  searchEmail(email: string): Observable<any> {
    return this.http.get<any>(this.api + "searchemail/" + email);
  }

  searchUser(user: string): Observable<any> {
    return this.http.get<any>(this.api + "searchuser/" + user);
  }

  searchRowUser(post: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(this.api + "searchrowuser/", post);
  }
}
