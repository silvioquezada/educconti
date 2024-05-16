import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseDTO } from 'src/app/manager/models/course.dto';
import { CourseService } from 'src/app/manager/services/course.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  coursesDTO: CourseDTO[];
  filterpost = "";
  baseUrl = environment.baseUrlFile + 'img/';
  page = 1;
  count = 0;
  pagesize = 5;

  constructor(private router: Router, private courseService: CourseService) { }

  ngOnInit(): void {
    this.listCourseOffert();
  }

  getRouteImage(imagen_curso: string) {
    return this.baseUrl + imagen_curso;
  }

  getDiffWeek(fechaInicio: Date, fechaFin: Date) {
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

  listCourseOffert(): void {
    this.loading = true;

    this.courseService.listCourseOffert()
    .subscribe( (data) => {
        this.loading = false;
        this.coursesDTO = data;
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

  viewDetail(cod_curso: number): void {
    this.router.navigateByUrl('detalle_curso/' + cod_curso);
  }

}