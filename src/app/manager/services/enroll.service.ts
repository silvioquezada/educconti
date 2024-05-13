import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EnrollDTO } from '../models/enroll.dto';
import { Observable } from 'rxjs';
import { InscriptionDTO } from '../models/inscription.dto';

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

  listInscriptions(cod_periodo: number, estado_matricula: number): Observable<InscriptionDTO[]> {
    return this.http.get<InscriptionDTO[]>(this.api + 'listinscriptions/' + cod_periodo + '/' + estado_matricula);
  }

  delete(destroy: InscriptionDTO): Observable<InscriptionDTO> {
    return this.http.put<InscriptionDTO>(this.api + 'delete', destroy);
  }

  sendObservation(put: EnrollDTO): Observable<EnrollDTO> {
    return this.http.put<EnrollDTO>(this.api + "sendobservation/", put);
  }

  enroll(put: InscriptionDTO): Observable<InscriptionDTO> {
    return this.http.put<InscriptionDTO>(this.api + "enroll/", put);
  }

  listAllEstudentsCourse(cod_periodo: number): Observable<InscriptionDTO[]> {
    return this.http.get<InscriptionDTO[]>(this.api + 'listallestudentscourse/' + cod_periodo);
  }

  listEstudentsCourse(cod_curso: number): Observable<InscriptionDTO[]> {
    return this.http.get<InscriptionDTO[]>(this.api + 'listestudentscourse/' + cod_curso);
  }

  approve(put: InscriptionDTO): Observable<InscriptionDTO> {
    return this.http.put<InscriptionDTO>(this.api + "approve/", put);
  }

  uploadPdfCertificate(form: FormData):Observable<any>{
    return this.http.post(this.api + "pdfcertificate", form);
  }

  updatePdfCertificate(put: InscriptionDTO): Observable<InscriptionDTO> {
    return this.http.put<InscriptionDTO>(this.api + 'updatepdfcertificate/', put);
  }


  listAllEstudentsCourseApprove(cod_periodo: number): Observable<InscriptionDTO[]> {
    return this.http.get<InscriptionDTO[]>(this.api + 'listallestudentscourseapprove/' + cod_periodo);
  }

  listAllEstudentsCourseApproveStatus(cod_periodo: number, cod_estado: number): Observable<InscriptionDTO[]> {
    return this.http.get<InscriptionDTO[]>(this.api + 'listallestudentscourseapprovestatus/' + cod_periodo + '/' + cod_estado);
  }

  listEstudentsCourseApprove(cod_curso: number, cod_estado: number): Observable<InscriptionDTO[]> {
    return this.http.get<InscriptionDTO[]>(this.api + 'listestudentscourseapprove/' + cod_curso + '/' + cod_estado);
  }

  listAllEstudentsCourseApproveAllStatus(cod_curso: number): Observable<InscriptionDTO[]> {
    return this.http.get<InscriptionDTO[]>(this.api + 'listallestudentscourseapproveallstatus/' + cod_curso);
  }



  listAllEstudentsCourseInscribed(cod_periodo: number): Observable<InscriptionDTO[]> {
    return this.http.get<InscriptionDTO[]>(this.api + 'listallestudentscourseinscribed/' + cod_periodo);
  }

  listAllEstudentsCourseInscribedStatus(cod_periodo: number, cod_estado: number): Observable<InscriptionDTO[]> {
    return this.http.get<InscriptionDTO[]>(this.api + 'listallestudentscourseinscribedstatus/' + cod_periodo + '/' + cod_estado);
  }

  listEstudentsCourseInscribed(cod_curso: number, cod_estado: number): Observable<InscriptionDTO[]> {
    return this.http.get<InscriptionDTO[]>(this.api + 'listestudentscourseinscribed/' + cod_curso + '/' + cod_estado);
  }

  listAllEstudentsCourseInscribedAllStatus(cod_curso: number): Observable<InscriptionDTO[]> {
    return this.http.get<InscriptionDTO[]>(this.api + 'listallestudentscourseinscribedallstatus/' + cod_curso);
  }

  verifyQuotas(cod_curso: number): Observable<any> {
    return this.http.get<any>(this.api + 'verifyquotas/' + cod_curso);
  }
}
