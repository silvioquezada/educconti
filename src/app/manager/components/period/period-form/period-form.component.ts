import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PeriodDTO } from 'src/app/manager/models/period.dto';
import { PeriodService } from 'src/app/manager/services/period.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
declare var $:any;

@Component({
  selector: 'app-period-form',
  templateUrl: './period-form.component.html',
  styleUrls: ['./period-form.component.scss']
})
export class PeriodFormComponent implements OnInit {
  @Output() dataSend: EventEmitter<any> = new EventEmitter<any>();
  title: string = "";
  periodDTO: PeriodDTO;
  cod_periodo: number = 0;
  codigo_periodo: FormControl;
  anio: FormControl;
  descripcion: FormControl;
  registerForm: FormGroup;
  isValidForm!: boolean | null;
  isValidFormPeriod: boolean;
  messaguePeriod: string = '';
  periodTemporal: string = '';
  loading: boolean = false;
  ban: boolean = true;
  textButton: string = '';

  filterpost = "";
  page = 1;
  count = 0;
  pagesize = 5;

  constructor(private formBuilder: FormBuilder, private periodService: PeriodService, private router: Router) {
    this.formNormal();
  }

  formNormal() : void {
    this.title = "Nuevo Registro";
    this.periodDTO = new PeriodDTO(0, '', '', '', 1);

    this.codigo_periodo = new FormControl(this.periodDTO.codigo_periodo, [
      Validators.required
    ]);

    this.anio = new FormControl(this.periodDTO.anio, [
      Validators.required
    ]);

    this.descripcion = new FormControl(this.periodDTO.descripcion, [
      Validators.required
    ]);

    this.registerForm = this.formBuilder.group({
      codigo_periodo: this.codigo_periodo,
      anio: this.anio,
      descripcion: this.descripcion
    });

    this.cod_periodo = Number(moment().unix().toString());

    this.isValidForm = true;
    this.isValidFormPeriod = true;
    this.ban = true;
    this.textButton = 'Guardar';
  }

  assignValues(periodDTO: PeriodDTO): void {
    this.title = "Editar Registro";
    this.cod_periodo = Number(periodDTO.cod_periodo);
    this.codigo_periodo.setValue(periodDTO.codigo_periodo);
    this.anio.setValue(periodDTO.anio);
    this.descripcion.setValue(periodDTO.descripcion);
    this.periodTemporal = periodDTO.codigo_periodo;
    this.ban = false;
    this.textButton = 'Actualizar';
  }

  ngOnInit(): void {
    this.isValidFormPeriod = true;
  }

  register() {
    this.isValidForm = false;
    if (this.registerForm.status == 'INVALID') {
      Swal.fire({
        icon: 'error',
        title: 'Algunos datos son inválidos, revise por favor',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    this.isValidForm = true;
    this.isValidFormPeriod = true;
    this.periodDTO = this.registerForm.value;
    this.periodDTO.cod_periodo = this.cod_periodo;

    const promise1 = this.searchCodePeriod().then();
    Promise.all([promise1])
    .then(() => {
      if(this.isValidFormPeriod) {
        if(this.ban) {
          this.save();
        } else {
          this.update();
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Algunos valores son existentes, revise por favor',
          showConfirmButton: false,
          timer: 1500
        });
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

  searchCodePeriod() {
    this.loading = true;
    return new Promise((resolve, reject) => {

      if(this.periodTemporal === this.codigo_periodo.value && this.ban === false) {
        resolve(true);
      } else {
        this.periodService.searchCodePeriod(this.codigo_periodo.value)
        .subscribe( (data : any) =>
        {
          this.loading = false;
          const dataResult = data;
          if (dataResult.estado) {
            this.isValidFormPeriod = false;
          } else {
            this.isValidFormPeriod = true;
          }
          resolve(true);
        }, (error: HttpErrorResponse) => {
          this.loading = false;
          this.isValidFormPeriod = true;
          reject(false);
        });
      }
    });
  }

  save(): void {
    this.loading = true;
    this.periodService.save(this.periodDTO)
    .subscribe( async (data) => {
        this.loading = false;
        const dataResult = data;
        
        if (dataResult.estado === 1)
        {
          await Swal.fire({
            icon: 'success',
            title: 'Se ha creado el registrado satisfactoriamente',
            showConfirmButton: false,
            timer: 1500
          });
          $("#modalForm").modal("hide");
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

  update(): void {
    this.loading = true;
    this.periodService.update(this.periodDTO)
    .subscribe( async (data) => {
        this.loading = false;
        const dataResult = data;
        
        if (dataResult.estado === 1)
        {
          await Swal.fire({
            icon: 'success',
            title: 'Se actualizado el registro satisfactoriamente',
            showConfirmButton: false,
            timer: 1500
          });
          $("#modalForm").modal("hide");
          this.dataSend.emit();
        }
        else
        {
          Swal.fire({
            icon: 'error',
            title: 'Registro no se pudo actualizar, vuelva a intertarlo por favor',
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

  keyFilter() {
    this.page = 1;
  }

  handlePageChange(event: number): void {
    this.page = event;
  }

}