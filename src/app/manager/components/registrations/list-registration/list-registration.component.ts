import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { VerifyRegistryComponent } from '../verify-registry/verify-registry.component';
import { PeriodService } from 'src/app/manager/services/period.service';
import { PeriodDTO } from 'src/app/manager/models/period.dto';
import { EnrollService } from 'src/app/manager/services/enroll.service';
import { EnrollDTO } from 'src/app/manager/models/enroll.dto';
import { InscriptionDTO } from 'src/app/manager/models/inscription.dto';

@Component({
  selector: 'app-list-registration',
  templateUrl: './list-registration.component.html',
  styleUrls: ['./list-registration.component.scss']
})
export class ListRegistrationComponent implements OnInit {
  cod_periodo: number = 0;
  cod_estado_inscripcion: number = 0;

  @ViewChild(VerifyRegistryComponent) verifyRegistryComponent: any;
  
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
    this.listRegistration();
  }

  changeStatus(event: any): void {
    const elemento = event.target.value;
    this.cod_estado_inscripcion = elemento;
    this.listRegistration();
  }

  listPeriod(): void {
    this.loading = true;

    this.periodService.list()
    .subscribe( (data) => {
        this.loading = false;
        this.periodsDTO = data;
        if(this.periodsDTO.length>0) {
          this.cod_periodo = this.periodsDTO[0].cod_periodo;
          this.listRegistration();
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

  listRegistration(): void {
    this.loading = true;

    this.enrollService.listInscriptions(this.cod_periodo, this.cod_estado_inscripcion)
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
    this.listRegistration();
  }

  keyFilter() {
    this.page = 1;
  }

  handlePageChange(event: number): void {
    this.page = event;
  }

  verifyRegistry(inscriptionDTO: InscriptionDTO) {
    this.verifyRegistryComponent.formNormal();
    this.verifyRegistryComponent.assignValues(inscriptionDTO);
  }

  approveRow(inscriptionDTO: InscriptionDTO): void {
    Swal.fire({
      title: inscriptionDTO.usuario + ' - ' +  inscriptionDTO.nombre_curso,
      text: '¿Estás seguro de matricular usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Matricular',
      cancelButtonText: 'No, Cerrar'
    }).then((result) => {
      if (result.value) {
        this.approve(inscriptionDTO);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    });
  }

  approve(inscriptionDTO: InscriptionDTO): void {
    this.loading = true;
    this.enrollService.approve(inscriptionDTO)
    .subscribe( async (data) => {
        this.loading = false;
        const dataResult = data;
        
        if (dataResult.estado === 1)
        {
          await Swal.fire({
            icon: 'success',
            title: 'Se ha matriculado el usuario satisfactoriamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.receiveVerifyRegistryData();
        }
        else
        {
          Swal.fire({
            icon: 'error',
            title: 'No se pudo matricular el usuario, vuelva a intertarlo por favor',
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
          this.listRegistration();
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