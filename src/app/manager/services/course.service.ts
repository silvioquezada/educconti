import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CourseDTO } from '../models/course.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  api = environment.baseUrl + 'curso/';
  constructor(private http:HttpClient) { }

  list(): Observable<CourseDTO[]> {
    return this.http.get<CourseDTO[]>(this.api);
  }

  searchCodeCourse(codecourse: string): Observable<any> {
    return this.http.get<any>(this.api + 'searchcodecourse/' + codecourse);
  }

  save(post: CourseDTO): Observable<CourseDTO> {
    return this.http.post<CourseDTO>(this.api, post);
  }
  
  update(put: CourseDTO): Observable<CourseDTO> {
    return this.http.put<CourseDTO>(this.api, put);
  }

  delete(destroy: CourseDTO): Observable<CourseDTO> {
    return this.http.put<CourseDTO>(this.api + 'delete', destroy);
  }
}
