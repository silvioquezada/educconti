import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CourseDTO } from 'src/app/manager/models/course.dto';
import * as moment from 'moment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { EnrollDTO } from 'src/app/manager/models/enroll.dto';

@Component({
  selector: 'app-item-course',
  templateUrl: './item-course.component.html',
  styleUrls: ['./item-course.component.scss']
})
export class ItemCourseComponent implements OnInit {
  @Input() courseDTO: CourseDTO;
  @Input() enrollDTO: EnrollDTO;
  @Output() sendSearchEnrolledCourse: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendViewInscription: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendViewObservation: EventEmitter<any> = new EventEmitter<any>();
  
  loading: boolean = false;
  baseUrl = environment.baseUrlFile + 'img/';
  baseUrlCertificate = environment.baseUrlFile + 'certificatepdf/';
  banInicio: boolean = false;
  banMisCursos: boolean = false;
  banDetalleCurso: boolean = false;
  constructor(private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    
    let url = this.router.url.split("/");
    if(url[1] === 'inicio') {
      this.banInicio = true;
    }

    if(url[1] === 'categoria') {
      this.banInicio = true;
    }

    if(url[1] === 'mis_cursos') {
      this.banMisCursos = true;
    }

    if(url[1] === 'detalle_curso') {
      this.banDetalleCurso = true;
    }
    
  }

  getRouteImage(imagen_curso: string) {
    return this.baseUrl + imagen_curso;
  }

  getDateFormat(fecha: Date) {//
    moment.locale('es');
    return moment(fecha).format('DD') + " de " + moment(fecha).format('MMMM') + " del " + moment().format('YYYY');
  }

  verifyCloseCourse(fechaFin: Date) {
    let fechaActual = moment();
    let diasDeDiferencia = moment(fechaFin).diff(fechaActual, 'days') + 1;
    if (diasDeDiferencia>0) {
      return true;
    } else {
      return false;
    }
  }

  getDiffWeek(fechaInicio: Date, fechaFin: Date) {
    let fecha1 = moment(fechaInicio);
    let fecha2 = moment(fechaFin);
    let diasDeDiferencia = fecha2.diff(fecha1, 'week') + 1;
    return diasDeDiferencia + ' Semanas';
  }

  enrollCourse(): void {
    
    if(this.localStorageService.getData("estado_sesion")==='true') {
      this.sendSearchEnrolledCourse.emit();
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Para inscribirse al curso debe iniciar sesión',
        showConfirmButton: false,
        timer: 2000
      });
    }
    
  }

  viewInscription(enrollDTO: EnrollDTO) {
    this.sendViewInscription.emit(enrollDTO);
  }

  viewObservation(enrollDTO: EnrollDTO) {
    this.sendViewObservation.emit(enrollDTO);
  }

  viewDetail(cod_curso: number): void {
    this.router.navigateByUrl('detalle_curso/' + cod_curso);
  }

  viewCertificate(archivo_certificado: string) {
    let miWindow = window.open(this.baseUrlCertificate + archivo_certificado, "", 'width=600,height=400,left=300,top=100');
    miWindow.focus();
  }

}
