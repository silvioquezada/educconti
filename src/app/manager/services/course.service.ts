import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CourseDTO } from '../models/course.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  api = environment.baseUrl + 'cursos';
  constructor(private http:HttpClient) { }

  list(): Observable<CourseDTO[]> {
    return this.http.get<CourseDTO[]>(this.api);
  }

  searchCodeCourse(codecourse: string): Observable<any> {
    return this.http.get<any>(this.api + '/searchcodecourse/' + codecourse);
  }

  save(post: CourseDTO): Observable<CourseDTO> {
    return this.http.post<CourseDTO>(this.api, post);
  }
  
  update(put: CourseDTO): Observable<CourseDTO> {
    return this.http.put<CourseDTO>(this.api, put);
  }

  delete(destroy: CourseDTO): Observable<CourseDTO> {
    return this.http.put<CourseDTO>(this.api + '/delete', destroy);
  }

  uploadImage(form: FormData):Observable<any>{
    return this.http.post(this.api + "/image",form);
  }

  uploadPdf(form: FormData):Observable<any>{
    return this.http.post(this.api + "/pdf",form);
  }

  listCourse(): Observable<CourseDTO[]> {
    return this.http.get<CourseDTO[]>(this.api + '/list');
  }

  listCourseOffert(): Observable<CourseDTO[]> {
    return this.http.get<CourseDTO[]>(this.api + '/listcourseoffer');
  }

  detailCourse(cod_curso: number): Observable<CourseDTO> {
    return this.http.get<CourseDTO>(this.api + '/detail/' + cod_curso);
  }

  listCoursePeriod(cod_periodo: number): Observable<CourseDTO[]> {
    return this.http.get<CourseDTO[]>(this.api + '/listcourseperiod/' + cod_periodo);
  }

  listCourseCategory(cod_categoria: number): Observable<CourseDTO[]> {
    return this.http.get<CourseDTO[]>(this.api + '/listcoursecategory/' + cod_categoria);
  }

  hideOffer(put: CourseDTO): Observable<CourseDTO> {
    return this.http.put<CourseDTO>(this.api + '/hideoffer', put);
  }

  viewOffer(put: CourseDTO): Observable<CourseDTO> {
    return this.http.put<CourseDTO>(this.api + '/viewoffer', put);
  }
}
