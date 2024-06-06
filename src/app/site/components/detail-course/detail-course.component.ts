import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseDTO } from 'src/app/manager/models/course.dto';
import { CourseService } from 'src/app/manager/services/course.service';
import { EnrollService } from 'src/app/manager/services/enroll.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
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
  total_quotas: number;
  @ViewChild(FormInscriptionComponent) formInscriptionComponent: any;

  constructor(private rutaActiva: ActivatedRoute, private courseService: CourseService, private enrollService: EnrollService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.cod_curso = Number(this.rutaActiva.snapshot.paramMap.get("cod_curso")!);
    this.detailCourse();
  }

  verifyQuotas(): void {
    this.loading = true;

    this.enrollService.verifyQuotas(this.cod_curso)
    .subscribe( (data) => {
        this.loading = false;
        this.total_quotas = data.total_quotas;
        this.validateRegistrationQuotas();
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

  validateRegistrationQuotas() {
    if(this.courseDTO.cupo > this.total_quotas) {
      this.formInscriptionComponent.cod_curso = this.cod_curso;
      this.formInscriptionComponent.formNormal();
      this.formInscriptionComponent.restoreFile();
      this.formInscriptionComponent.typeForm = 'nuevo';
      $("#modalConfirmInscription").modal('show');
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'No se puede inscribir a este curso, porque el registro de cupos está completo',
        showConfirmButton: false,
        timer: 1500
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
            this.verifyQuotas();
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
