import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CourseDTO } from 'src/app/manager/models/course.dto';
import { CourseService } from 'src/app/manager/services/course.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  cod_categoria: number = 0;
  categoria: string = '';
  loading: boolean = false;
  coursesDTO: CourseDTO[];
  filterpost = "";
  baseUrl = environment.baseUrlFile + 'img/';
  page = 1;
  count = 0;
  pagesize = 5;

  constructor(private router: Router, private courseService: CourseService, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.rutaActiva.paramMap.subscribe( (params: ParamMap) => {
      this.cod_categoria = Number(params.get('cod_categoria'));
      this.categoria = 'Cursos de ' + params.get('categoria');
      this.listCourse();
    });
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

  listCourse(): void {
    this.loading = true;
    this.coursesDTO = [];
    this.courseService.listCourseCategory(this.cod_categoria)
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