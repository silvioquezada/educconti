import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { EnrollService } from 'src/app/manager/services/enroll.service';
import { PeriodService } from 'src/app/manager/services/period.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { PeriodDTO } from '../../models/period.dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading: boolean = false;
  countCourses: number = 0;
  countEarrings: number = 0;
  countEnrolled: number = 0;
  countApproved: number = 0;

  cod_periodo: number = 0;
  periodsDTO: PeriodDTO[];

  constructor(private courseService: CourseService, private enrollService: EnrollService, private periodService: PeriodService) { }

  ngOnInit(): void {
    this.listPeriod();
  }

  changePeriod(event: any): void {
    const elemento = event.target.value;
    this.cod_periodo = Number(elemento);
    this.countCourses = 0;
    this.countEarrings = 0;
    this.countEnrolled = 0;
    this.countApproved = 0;
    this.listCouse();
    this.listAllEstudentsCourseApprove();
    this.listAllEstudentsCourseInscribed();
  }

  listPeriod(): void {
    this.loading = true;

    this.periodService.list()
    .subscribe( (data) => {
        this.loading = false;
        this.periodsDTO = data;
        if(this.periodsDTO.length>0) {
          this.cod_periodo = this.periodsDTO[0].cod_periodo;
          this.listCouse();
          this.listAllEstudentsCourseApprove();
          this.listAllEstudentsCourseInscribed();
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

  listCouse(): void {
    this.loading = true;

    this.courseService.listCoursePeriod(this.cod_periodo)
    .subscribe( (data) => {
        this.loading = false;
        this.countCourses = data.length;
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

  listAllEstudentsCourseApprove(): void {
    this.loading = true;
    this.enrollService.listAllEstudentsCourseApprove(this.cod_periodo)
    .subscribe( (data) => {
        this.loading = false;
          data.forEach((element) => {
            if (element.estado_aprobacion === 2) {
              this.countApproved = this.countApproved + 1;
            }
          });
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

  listAllEstudentsCourseInscribed(): void {
    this.loading = true;

    this.enrollService.listAllEstudentsCourseInscribed(this.cod_periodo)
    .subscribe( (data) => {
        this.loading = false;
        data.forEach((element) => {
          if (Number(element.estado_matricula) === 0 || Number(element.estado_matricula) === 1 || Number(element.estado_matricula) === 2) {
            this.countEarrings = this.countEarrings + 1;
          }
          
          if (element.estado_matricula === 3) {
            this.countEnrolled = this.countEnrolled + 1;
          }
        });
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
}
