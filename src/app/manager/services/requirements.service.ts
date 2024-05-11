import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RequirementsDTO } from '../models/requirements.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequirementsService {
  api = environment.baseUrl + 'requisitos/';
  constructor(private http:HttpClient) { }

  search(): Observable<RequirementsDTO> {
    return this.http.get<RequirementsDTO>(this.api);
  }

  update(put: RequirementsDTO): Observable<RequirementsDTO> {
    return this.http.put<RequirementsDTO>(this.api, put);
  }
}