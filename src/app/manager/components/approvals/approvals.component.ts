import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { VerifyRegistryComponent } from '../registrations/verify-registry/verify-registry.component';
import { PeriodService } from 'src/app/manager/services/period.service';
import { PeriodDTO } from 'src/app/manager/models/period.dto';
import { EnrollService } from 'src/app/manager/services/enroll.service';
import { EnrollDTO } from 'src/app/manager/models/enroll.dto';
import { InscriptionDTO } from 'src/app/manager/models/inscription.dto';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss']
})
export class ApprovalsComponent implements OnInit {
  cod_periodo: number = 0;
  cod_estado_inscripcion: number = 0;
  //cod_estado_aprobacion: number = 0;
  
  loading: boolean = false;
  enrollDTO: EnrollDTO[];
  periodsDTO: PeriodDTO[];
  inscriptionDTO: InscriptionDTO[];
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
      "estado_inscripcion" : "Por respuesta"
    },
    {
      "cod_estado_inscripcion" : 3,
      "estado_inscripcion" : "Matriculados"
    }
  ];

  dataStatusApproval: any[] = [
    {
      "cod_estado_aprobacion" : 0,
      "estado_aprobacion" : "Sin asignar"
    },
    {
      "cod_estado_aprobacion" : 1,
      "estado_aprobacion" : "No Aprobado"
    },
    {
      "cod_estado_aprobacion" : 2,
      "estado_aprobacion" : "Aprobado"
    }
  ];

  filterpost = "";
  page = 1;
  count = 0;
  pagesize = 5;

  constructor(private periodService: PeriodService, private enrollService: EnrollService) {
  }

  ngOnInit(): void {
    this.cod_estado_inscripcion = 0;
    this.listPeriod();
  }

  changePeriod(event: any): void {
    const elemento = event.target.value;
    this.cod_periodo = elemento;
    this.listAllEstudentsCourse();
  }

  changeStatus(event: any): void {
    const elemento = event.target.value;
    //this.cod_estado_inscripcion = elemento;
    this.listAllEstudentsCourse();
  }

  changeStatusApprovals(event: any, inscriptionDTO: InscriptionDTO): void {
    const elemento = event.target.value;
    //this.cod_estado_inscripcion = elemento;
    this.approve(inscriptionDTO, elemento);
  }

  listPeriod(): void {
    this.loading = true;

    this.periodService.list()
    .subscribe( (data) => {
        this.loading = false;
        this.periodsDTO = data;
        if(this.periodsDTO.length>0) {
          this.cod_periodo = this.periodsDTO[0].cod_periodo;
          this.listAllEstudentsCourse();
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

  listAllEstudentsCourse(): void {
    this.loading = true;

    this.enrollService.listAllEstudentsCourse(this.cod_periodo)
    .subscribe( (data) => {
        this.loading = false;
        this.inscriptionDTO = data;
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

  receiveVerifyRegistryData(): void {
    this.listAllEstudentsCourse();
  }

  keyFilter() {
    this.page = 1;
  }

  handlePageChange(event: number): void {
    this.page = event;
  }

  approve(inscriptionDTO: InscriptionDTO, elemento: number): void {
    this.loading = true;
    inscriptionDTO.estado_aprobacion = Number(elemento);
    this.enrollService.enroll(inscriptionDTO)
    .subscribe( async (data) => {
        this.loading = false;
        const dataResult = data;
        
        if (dataResult.estado === 1)
        {
          await Swal.fire({
            icon: 'success',
            title: 'El usuario se actualizado satisfactoriamente',
            showConfirmButton: false,
            timer: 1500
          });
        }
        else
        {
          Swal.fire({
            icon: 'error',
            title: 'No se pudo matricular el usuario, vuelva a intertarlo por favor',
            showConfirmButton: false,
            timer: 1500
          });
          inscriptionDTO.estado_aprobacion = 0;
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

  deleteRow(inscriptionDTO: InscriptionDTO): void {
    Swal.fire({
      title: inscriptionDTO.usuario + ' ' +  inscriptionDTO.nombre_curso,
      text: '¿Estás seguro de eliminar registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cerrar'
    }).then((result) => {
      if (result.value) {
        this.delete(inscriptionDTO);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    });
  }

  delete(inscriptionDTO: InscriptionDTO) : void {
    this.loading = true;
    this.enrollService.delete(inscriptionDTO)
    .subscribe( async (data) => {
        this.loading = false;
        const dataResult = data;
        
        if (dataResult.estado === 1)
        {
          await Swal.fire({
            icon: 'success',
            title: 'Se ha eliminado la inscripción correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.listAllEstudentsCourse();
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