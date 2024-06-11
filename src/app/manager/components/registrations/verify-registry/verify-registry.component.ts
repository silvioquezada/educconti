import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { EnrollDTO } from 'src/app/manager/models/enroll.dto';
import { EnrollService } from 'src/app/manager/services/enroll.service';
declare var $:any;
import { environment } from 'src/environments/environment';
import { InscriptionDTO } from 'src/app/manager/models/inscription.dto';

@Component({
  selector: 'app-verify-registry',
  templateUrl: './verify-registry.component.html',
  styleUrls: ['./verify-registry.component.scss']
})
export class VerifyRegistryComponent implements OnInit {
  @Output() dataSend: EventEmitter<any> = new EventEmitter<any>();
  baseUrlFile = environment.baseUrlFile + 'requirementpdf/';
  enrollDTO: EnrollDTO = new EnrollDTO(0, null, 0, 0, 0, 0, 0, '', '', '', 1, null);
  cod_matricula: number;
  cod_curso: number;
  loading: boolean = false;
  documento_descripcion: string = '';
  isValidForm!: boolean | null;
  registerForm: FormGroup;
  observacion_revision: FormControl;
  title: string = '';


  constructor(private formBuilder: FormBuilder, private enrollService: EnrollService) { }

  ngOnInit(): void {
    this.formNormal();
  }

  formNormal() {
    this.observacion_revision = new FormControl(this.enrollDTO.observacion_revision, [
      Validators.required
    ]);
    this.registerForm = this.formBuilder.group({
      observacion_revision: this.observacion_revision
    });
    this.documento_descripcion = '';
  }

  assignValues(inscriptionDTO: InscriptionDTO): void {
    this.title = "Editar Registro";
    this.cod_matricula = Number(inscriptionDTO.cod_matricula);
    this.documento_descripcion = inscriptionDTO.documento_descripcion;
    this.observacion_revision.setValue(inscriptionDTO.observacion_revision);
    this.title = inscriptionDTO.usuario + ' - ' + inscriptionDTO.nombre_curso;
  }

  view(): void {
    let miWindow = window.open(this.baseUrlFile + this.documento_descripcion, "", 'width=600,height=400,left=300,top=100');
    miWindow.focus();
  }

  register(): void {
    this.isValidForm = false;
    if (this.registerForm.status === 'INVALID') {
        Swal.fire({
          icon: 'error',
          title: 'Algunos datos son inválidos, revise por favor',
          showConfirmButton: false,
          timer: 1500
        });
        return;
    }

    this.isValidForm = true;
    this.enrollDTO = this.registerForm.value;
    this.enrollDTO.cod_matricula = this.cod_matricula;
    this.update();
  }

  update(): void {
    this.loading = true;
    this.enrollService.sendObservation(this.enrollDTO)
    .subscribe( async (data) => {
        this.loading = false;
        const dataResult = data;
        
        if (dataResult.estado === 1)
        {
          await Swal.fire({
            icon: 'success',
            title: 'Se actualizado la inscripción satisfactoriamente',
            showConfirmButton: false,
            timer: 1500
          });
          $("#modalVerifyInscription").modal("hide");
          this.dataSend.emit();
        }
        else
        {
          Swal.fire({
            icon: 'error',
            title: 'Registro no se pudo almacenar, vuelva a intertarlo por favor',
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