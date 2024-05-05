import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { EnrollDTO } from 'src/app/manager/models/enroll.dto';
import { EnrollService } from 'src/app/manager/services/enroll.service';
declare var $:any;
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-inscription',
  templateUrl: './form-inscription.component.html',
  styleUrls: ['./form-inscription.component.scss']
})
export class FormInscriptionComponent implements OnInit {
  baseUrlFile = environment.baseUrlFile + 'requirementpdf/';
  enrollDTO: EnrollDTO = new EnrollDTO(0, null, 0, 0, 0, 0, 0, '', '', '', 1, null);
  cod_matricula: number;
  cod_curso: number;
  loading: boolean = false;
  registerForm: FormGroup;
  documento_descripcion: FormControl;
  selectedPdf: File = null;
  @ViewChild("filePdf") filePdf: ElementRef = null;
  ban: boolean = true;
  textButton: string = '';
  title: string = '';
  typeForm: string = '';

  constructor(private formBuilder: FormBuilder, private enrollService: EnrollService) { }

  ngOnInit(): void {
    this.formNormal();
  }

  formNormal() {
    this.documento_descripcion = new FormControl(this.enrollDTO.documento_descripcion);
    this.registerForm = this.formBuilder.group({
      documento_descripcion: this.documento_descripcion
    });
    this.cod_matricula = Number(moment().unix().toString());
    this.selectedPdf = null;
    this.title = 'Confirmar Inscripción';
    this.ban = true;
    this.textButton = 'Enviar';
    this.typeForm = 'nuevo';
  }

  assignValues(enrollDTO: EnrollDTO): void {
    this.title = "Editar Registro";
    this.cod_matricula = Number(enrollDTO.cod_matricula);
    this.documento_descripcion.setValue(enrollDTO.documento_descripcion);
    this.ban = false;
    this.textButton = 'Actualizar';
    this.restoreFile();
  }

  view(): void {
    let miWindow = window.open(this.baseUrlFile + this.documento_descripcion.value, "", 'width=600,height=400,left=300,top=100');
    miWindow.focus();
  }

  restoreFile(): void {
    this.filePdf.nativeElement.value = null;
  }

  selectPdf(event): void {
    this.selectedPdf = <File>event.target.files[0];
    this.documento_descripcion.setValue(this.cod_matricula);
  }

  register(): void {
    this.enrollDTO = this.registerForm.value;
    this.enrollDTO.cod_matricula = this.cod_matricula;
    this.enrollDTO.cod_curso = this.cod_curso;
    this.uploadFile();
  }

  uploadFile(): void {
    const promise = this.uploadPdf().then();
    Promise.all([promise])
    .then(() => {
      if(this.ban) {
        this.save();
      } else {
        this.update();
      }
    })
    .catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Error en la conexión intente mas tarde',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  uploadPdf() {
    return new Promise((resolve, reject) => {
      if( (this.selectedPdf !== null && this.ban === false) || (this.selectedPdf !== null && this.ban === true)) {
        this.loading = true;
        let formPdf = new FormData();
        formPdf.append("pdf", this.selectedPdf);
        formPdf.append("name_pdf", String(this.cod_matricula));
        this.enrollService.uploadPdf(formPdf).subscribe( (data : any) => {
          this.loading = false;
          if(data.estado) {
            this.enrollDTO.documento_descripcion = data.file;
            resolve(true);
          } else {
            reject(false);
          }
        }, () => {
          this.loading = false;
          reject(false);
        });
      } else {
        resolve(true);
      }
    });
  }

  save(): void {
    this.loading = true;
    this.enrollService.save(this.enrollDTO)
    .subscribe( async (data) => {
        this.loading = false;
        const dataResult = data;
        
        if (dataResult.estado === 1)
        {
          await Swal.fire({
            icon: 'success',
            title: 'Se ha inscrito satisfactoriamente',
            showConfirmButton: false,
            timer: 1500
          });
          $("#modalConfirmInscription").modal("hide");
          //this.dataSend.emit();
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

  update(): void {
    this.loading = true;
    this.enrollService.update(this.enrollDTO)
    .subscribe( async (data) => {
        this.loading = false;
        const dataResult = data;
        
        if (dataResult.estado === 1)
        {
          await Swal.fire({
            icon: 'success',
            title: 'Se ha inscrito satisfactoriamente',
            showConfirmButton: false,
            timer: 1500
          });
          $("#modalConfirmInscription").modal("hide");
          //this.dataSend.emit();
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
