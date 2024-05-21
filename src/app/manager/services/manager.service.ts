import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ManagerDTO } from '../models/manager.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  api = environment.baseUrl + 'usuarios/manager';
  constructor(private http:HttpClient) { }

  listUserManager(): Observable<ManagerDTO[]> {
    return this.http.get<ManagerDTO[]>(this.api);
  }

  saveManager(post: ManagerDTO): Observable<ManagerDTO> {
    return this.http.post<ManagerDTO>(this.api, post);
  }
  
  updateManager(put: ManagerDTO): Observable<ManagerDTO> {
    return this.http.put<ManagerDTO>(this.api, put);
  }

  deleteManager(destroy: ManagerDTO): Observable<ManagerDTO> {
    return this.http.put<ManagerDTO>(this.api + '/delete', destroy);
  }
}