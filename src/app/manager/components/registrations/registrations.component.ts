import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseDTO } from 'src/app/manager/models/course.dto';
import { CourseService } from 'src/app/manager/services/course.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CourseFormComponent } from '../course/course-form/course-form.component';
import { CourseSearchComponent } from '../course/course-search/course-search.component';
import { PeriodService } from '../../services/period.service';
import { PeriodDTO } from '../../models/period.dto';
import { EnrollService } from '../../services/enroll.service';
import { EnrollDTO } from '../../models/enroll.dto';


@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent implements OnInit {
  cod_periodo: number = 0;
  cod_estado_inscripcion: number = 0;

  @ViewChild(CourseFormComponent)  periodFormComponent: any;
  @ViewChild(CourseSearchComponent) periodSearchComponent: any;
  
  loading: boolean = false;
  enrollDTO: EnrollDTO[];
  coursesDTO: CourseDTO[];
  periodsDTO: PeriodDTO[];
  dataStatusInscription: any[] = [
    {
      "cod_estado_inscripcion" : 0,
      "estado_inscripcion" : "Por revisar"
    },
    {
      "cod_estado_inscripcion" : 1,
      "estado_inscripcion" : "Por rectificar"
    },
    {
      "cod_estado_inscripcion" : 2,
      "estado_inscripcion" : "Matriculados"
    },
    {
      "cod_estado_inscripcion" : 3,
      "estado_inscripcion" : "Por respuesta"
    },
  ];

  filterpost = "";
  page = 1;
  count = 0;
  pagesize = 5;

  constructor(private courseService: CourseService, private periodService: PeriodService, private enrollService: EnrollService) {
  }

  ngOnInit(): void {
    this.cod_estado_inscripcion = 0;
    this.listPeriod();
  }

  listPeriod(): void {
    this.loading = true;

    this.periodService.list()
    .subscribe( (data) => {
        this.loading = false;
        this.periodsDTO = data;
        if(this.periodsDTO.length>0) {
          this.cod_periodo = this.periodsDTO[0].cod_periodo;
          this.listCouseManager();
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

  listCouseManager(): void {
    this.loading = true;

    this.enrollService.listInscriptions(this.cod_periodo, this.cod_estado_inscripcion)
    .subscribe( (data) => {
        this.loading = false;
        console.log(data);
        //this.enrollDTO = data;
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

  receiveManagerData(): void {
    this.listCouseManager();
  }

  keyFilter() {
    this.page = 1;
  }

  handlePageChange(event: number): void {
    this.page = event;
  }

  newRow(): void {
    this. periodFormComponent.formNormal();
    this.periodFormComponent.restoreFile();
  }

  editRow(courseDTO: CourseDTO) {
    this.periodFormComponent.formNormal();
    this.periodFormComponent.assignValues(courseDTO);
  }

  viewRow(courseDTO: CourseDTO): void {
    this.periodSearchComponent.formNormal();
    this.periodSearchComponent.assignValues(courseDTO);
  }

  deleteRow(courseDTO: CourseDTO): void {
    Swal.fire({
      title: courseDTO.nombre_curso,
      text: '¿Estás seguro de eliminar registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cerrar'
    }).then((result) => {
      if (result.value) {
        this.delete(courseDTO);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    });
  }

  delete(courseDTO: CourseDTO) : void {
    this.loading = true;
    this.courseService.delete(courseDTO)
    .subscribe( async (data) => {
        this.loading = false;
        const dataResult = data;
        
        if (dataResult.estado === 1)
        {
          await Swal.fire({
            icon: 'success',
            title: 'Se ha eliminado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.listCouseManager();
        }
        else
        {
          Swal.fire({
            icon: 'error',
            title: 'Registro no se pudo eliminar, vuelva a intertarlo por favor',
            showConfirmButton: false,
            timer: 1500
          });
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

}