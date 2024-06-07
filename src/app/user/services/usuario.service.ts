import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioDTO } from '../models/usuario.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  api = environment.baseUrl + 'usuarios';
  constructor(private http:HttpClient) { }

  login(post: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(this.api + '/login', post);
  }

  save(post: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(this.api, post);
  }

  update(put: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.put<UsuarioDTO>(this.api, put);
  }

  searchCedula(cedula: string): Observable<any> {
    return this.http.get<any>(this.api + '/searchcedula/' + cedula);
  }

  searchEmail(correo: string): Observable<any> {
    return this.http.get<any>(this.api + '/searchemail/' + correo);
  }

  searchUser(usuario: string): Observable<any> {
    return this.http.get<any>(this.api + '/searchuser/' + usuario);
  }

  searchUserEmail(usuario: string, correo): Observable<any> {
    return this.http.get<any>(this.api + '/searchuseremail/' + usuario + '/' +correo);
  }

  searchRowUser(post: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(this.api + '/searchrowuser', post);
  }

  recoverPassword(put: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.put<UsuarioDTO>(this.api + '/recoverpassword', put);
  }
}
