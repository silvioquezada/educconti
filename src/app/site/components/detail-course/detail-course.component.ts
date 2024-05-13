import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseDTO } from 'src/app/manager/models/course.dto';
import { CourseService } from 'src/app/manager/services/course.service';
import { EnrollService } from 'src/app/manager/services/enroll.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
declare var $:any;
import { FormInscriptionComponent } from '../form-inscription/form-inscription.component';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-detail-course',
  templateUrl: './detail-course.component.html',
  styleUrls: ['./detail-course.component.scss']
})

export class DetailCourseComponent implements OnInit {
  baseUrl = environment.baseUrlFile + 'img/';
  baseUrlProgram = environment.baseUrlFile + 'pdf/';
  courseDTO: CourseDTO = new CourseDTO(0, null, '', null, '', '', '', '', null, null, null, null, '', null, '', '', 1);
  cod_curso: number;
  loading: boolean = false;
  imagen_curso: string = 'defecto.png';
  @ViewChild(FormInscriptionComponent) formInscriptionComponent: any;

  constructor(private rutaActiva: ActivatedRoute, private courseService: CourseService, private enrollService: EnrollService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.cod_curso = Number(this.rutaActiva.snapshot.paramMap.get("cod_curso")!);
    this.detailCourse();
  }

  detailCourse(): void {
    this.loading = true;

    this.courseService.detailCourse(this.cod_curso)
    .subscribe( (data) => {
        this.loading = false;
        this.courseDTO = data;
        this.imagen_curso = data.imagen_curso;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Se ha originado un error en el servidor',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  getRouteImage() {
    return this.baseUrl + this.imagen_curso;
  }

  getDiffWeek(fechaInicio: Date, fechaFin: Date) {//
    let fecha1 = moment(fechaInicio);
    let fecha2 = moment(fechaFin);
    let diasDeDiferencia = fecha2.diff(fecha1, 'week') + 1;
    return diasDeDiferencia + ' Semanas';
  }

  getDateFormat(fecha: Date) {//
    moment.locale('es');
    return moment(fecha).format('DD') + " de " + moment(fecha).format('MMMM');// + " del " + moment().format('YYYY');
  }

  verifyCloseCousre(fechaFin: Date) {
    let fechaActual = moment();
    let diasDeDiferencia = moment(fechaFin).diff(fechaActual, 'days') + 1;
    if (diasDeDiferencia>0) {
      return true;
    } else {
      return false;
    }
  }

  enrollCourse(): void {
    if(this.localStorageService.getData("estado_sesion")==='true') {
      this.searchEnrolledCourse();
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Para inscribirse al curso debe iniciar sesión',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  searchEnrolledCourse(): void {
    this.loading = true;

    this.enrollService.searchEnrolledCourse(this.cod_curso)
    .subscribe( (data) => {
        this.loading = false;
        const dataResult = data;
          if (dataResult.estado) {
            Swal.fire({
              icon: 'warning',
              title: 'Ya está registrado en el curso seleccionado',
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            this.formInscriptionComponent.cod_curso = this.cod_curso;
            this.formInscriptionComponent.formNormal();
            this.formInscriptionComponent.restoreFile();
            this.formInscriptionComponent.typeForm = 'nuevo';
            $("#modalConfirmInscription").modal('show');
          }
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Se ha originado un error en el servidor',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  viewProgram(documento_descripcion: string) {
    let miWindow = window.open(this.baseUrlProgram + documento_descripcion, "", 'width=600,height=400,left=300,top=100');
    miWindow.focus();
  }
  
}
