import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ManagerDTO } from '../models/manager.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  api = environment.baseUrl + 'course/';
  constructor(private http:HttpClient) { }

  list(): Observable<ManagerDTO[]> {
    return this.http.get<ManagerDTO[]>(this.api);
  }

  searchCodeCourse(codecourse: string): Observable<any> {
    return this.http.get<any>(this.api + 'searchcodecourse/' + codecourse);
  }

  save(post: ManagerDTO): Observable<ManagerDTO> {
    return this.http.post<ManagerDTO>(this.api, post);
  }
  
  update(put: ManagerDTO): Observable<ManagerDTO> {
    return this.http.put<ManagerDTO>(this.api, put);
  }

  delete(destroy: ManagerDTO): Observable<ManagerDTO> {
    return this.http.put<ManagerDTO>(this.api + 'delete', destroy);
  }
}
