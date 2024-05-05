import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EnrollDTO } from 'src/app/manager/models/enroll.dto';
import { EnrollService } from 'src/app/manager/services/enroll.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { FormInscriptionComponent } from '../form-inscription/form-inscription.component';
declare var $:any;

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {
  @ViewChild(FormInscriptionComponent) formInscriptionComponent: any;
  cod_matricula: number;
  loading: boolean = false;
  coursesDTO: EnrollDTO[];
  filterpost = "";
  baseUrl = environment.baseUrlFile + 'img/';
  page = 1;
  count = 0;
  pagesize = 5;

  constructor(private router: Router, private enrollService: EnrollService) { }

  ngOnInit(): void {
    this.listCouseManager();
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

  listCouseManager(): void {
    this.loading = true;

    this.enrollService.myCourses()
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

  editRow(enrollDTO: EnrollDTO) {
    this.formInscriptionComponent.formNormal();
    this.formInscriptionComponent.assignValues(enrollDTO);
    $("#modalConfirmInscription").modal('show');
  }

}
