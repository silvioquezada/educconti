import { Component, OnInit, ViewChild } from '@angular/core';
import { EnrollDTO } from 'src/app/manager/models/enroll.dto';
import { EnrollService } from 'src/app/manager/services/enroll.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
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

  constructor(private enrollService: EnrollService) { }

  ngOnInit(): void {
    this.listMyCourse();
  }

  listMyCourse(): void {
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

  viewInscription(enrollDTO: EnrollDTO) {
    this.formInscriptionComponent.formNormal();
    this.formInscriptionComponent.assignValues(enrollDTO);
    this.formInscriptionComponent.title = enrollDTO.curso.nombre_curso;
    this.formInscriptionComponent.typeForm = 'pendiente';
    $("#modalConfirmInscription").modal('show');
  }

  viewObservation(enrollDTO: EnrollDTO) {
    this.formInscriptionComponent.formNormal();
    this.formInscriptionComponent.assignValues(enrollDTO);
    this.formInscriptionComponent.title = enrollDTO.curso.nombre_curso;
    this.formInscriptionComponent.observacion_revision = enrollDTO.observacion_revision;
    this.formInscriptionComponent.typeForm = 'no_cumple';
    $("#modalConfirmInscription").modal('show');
  }

  receiveInscriptionData(): void {
    this.listMyCourse();
  }

}
