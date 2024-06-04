import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CourseDTO } from 'src/app/manager/models/course.dto';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-course',
  templateUrl: './item-course.component.html',
  styleUrls: ['./item-course.component.scss']
})
export class ItemCourseComponent implements OnInit {
  @Input() coursesDTO: CourseDTO;
  loading: boolean = false;
  baseUrl = environment.baseUrlFile + 'img/';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getRouteImage(imagen_curso: string) {
    return this.baseUrl + imagen_curso;
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

  getDiffWeek(fechaInicio: Date, fechaFin: Date) {
    let fecha1 = moment(fechaInicio);
    let fecha2 = moment(fechaFin);
    let diasDeDiferencia = fecha2.diff(fecha1, 'week') + 1;
    return diasDeDiferencia + ' Semanas';
  }

  viewDetail(cod_curso: number): void {
    this.router.navigateByUrl('detalle_curso/' + cod_curso);
  }

}
