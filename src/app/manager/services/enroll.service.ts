import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EnrollDTO } from '../models/enroll.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollService {

  api = environment.baseUrl + 'matricula/';
  constructor(private http:HttpClient) { }

  searchEnrolledCourse(cod_curso: number): Observable<EnrollDTO> {
    return this.http.get<EnrollDTO>(this.api + 'searchenrolledcourse/' + cod_curso);
  }

  uploadPdf(form: FormData):Observable<any>{
    return this.http.post(this.api + "pdf", form);
  }

  save(post: EnrollDTO): Observable<EnrollDTO> {
    return this.http.post<EnrollDTO>(this.api, post);
  }

  update(put: EnrollDTO): Observable<EnrollDTO> {
    return this.http.put<EnrollDTO>(this.api, put);
  }

  myCourses(): Observable<EnrollDTO[]> {
    return this.http.get<EnrollDTO[]>(this.api + 'mycourses/');
  }

  listInscriptions(cod_periodo: number, estado_matricula: number): Observable<EnrollDTO[]> {
    return this.http.get<EnrollDTO[]>(this.api + 'listinscriptions/' + cod_periodo + '/' + estado_matricula);
  }

}
