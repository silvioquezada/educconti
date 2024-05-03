import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseDTO } from 'src/app/manager/models/course.dto';
import { CourseService } from 'src/app/manager/services/course.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-course',
  templateUrl: './detail-course.component.html',
  styleUrls: ['./detail-course.component.scss']
})
export class DetailCourseComponent implements OnInit {
  courseDTO: CourseDTO = new CourseDTO(0, null, '', null, '', '', '', '', null, null, null, null, '', null, '', '', 1);
  cod_curso: number;
  loading: boolean = false;
  baseUrl = environment.baseUrlFile + 'img/';

  constructor(private rutaActiva: ActivatedRoute, private courseService: CourseService) { }

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

  getRouteImage(imagen_curso: string) {
    return this.baseUrl + imagen_curso;
  }

  getDiffWeek(fechaInicio: Date, fechaFin: Date) {//
    let fecha1 = moment(fechaInicio);
    let fecha2 = moment(fechaFin);
    let diasDeDiferencia = fecha2.diff(fecha1, 'week') + 1;
    return diasDeDiferencia + ' Semanas';
  }

  getDateFormat(fecha: Date) {//
    moment.locale('es');
    return moment(fecha).format('DD') + " de " + moment(fecha).format('MMMM') + " del " + moment().format('YYYY');
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

}
