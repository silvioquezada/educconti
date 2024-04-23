import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ManagerDTO } from '../models/manager.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  api = environment.baseUrl + 'usuarios/';
  constructor(private http:HttpClient) { }

  listUserManager(): Observable<ManagerDTO[]> {
    return this.http.get<ManagerDTO[]>(this.api);
  }
  /*
  login(post: ManagerDTO): Observable<ManagerDTO> {
    return this.http.post<ManagerDTO>(this.api + 'login/', post);
  }
  */
  save(post: ManagerDTO): Observable<ManagerDTO> {
    return this.http.post<ManagerDTO>(this.api, post);
  }
  /*
  update(put: ManagerDTO): Observable<ManagerDTO> {
    return this.http.put<ManagerDTO>(this.api, put);
  }

  searchCedula(cedula: string): Observable<any> {
    return this.http.get<any>(this.api + 'searchcedula/' + cedula);
  }
  */
  searchEmail(email: string): Observable<any> {
    return this.http.get<any>(this.api + 'searchemail/' + email);
  }
  
  searchUser(user: string): Observable<any> {
    return this.http.get<any>(this.api + 'searchuser/' + user);
  }
  /*
  searchRowUser(post: ManagerDTO): Observable<ManagerDTO> {
    return this.http.post<ManagerDTO>(this.api + 'searchrowuser/', post);
  }
  */
}