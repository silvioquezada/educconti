import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { CategoryDTO } from 'src/app/manager/models/category.dto';
import { CategoryService } from 'src/app/manager/services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
declare var $:any;

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  @Output() dataSend: EventEmitter<any> = new EventEmitter<any>();
  title: string = "";
  categoryDTO: CategoryDTO;
  cod_categoria: number = 0;
  categoria: FormControl;
  registerForm: FormGroup;
  isValidForm!: boolean | null;
  isValidFormCategory: boolean;
  messaguePeriod: string = '';
  periodTemporal: string = '';
  loading: boolean = false;
  ban: boolean = true;
  textButton: string = '';

  filterpost = "";
  page = 1;
  count = 0;
  pagesize = 5;

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService, private router: Router) {
    this.formNormal();
  }

  formNormal() : void {
    this.title = "Nuevo Registro";
    this.categoryDTO = new CategoryDTO(0, '', 1);

    this.categoria = new FormControl(this.categoryDTO.categoria, [
      Validators.required
    ]);

    this.registerForm = this.formBuilder.group({
      categoria: this.categoria,
    });

    this.cod_categoria = Number(moment().unix().toString());

    this.isValidForm = true;
    this.isValidFormCategory = true;
    this.ban = true;
    this.textButton = 'Guardar';
  }

  assignValues(categoryDTO: CategoryDTO): void {
    this.title = "Editar Registro";
    this.cod_categoria = Number(categoryDTO.cod_categoria);
    this.categoria.setValue(categoryDTO.categoria);
    this.periodTemporal = categoryDTO.categoria;
    this.ban = false;
    this.textButton = 'Actualizar';
  }

  ngOnInit(): void {
    this.isValidFormCategory = true;
  }

  register() {
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
    this.isValidFormCategory = true;
    this.categoryDTO = this.registerForm.value;
    this.categoryDTO.cod_categoria = this.cod_categoria;

    const promise1 = this.searchCategory().then();
    Promise.all([promise1])
    .then(() => {
      if(this.isValidFormCategory) {
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

  searchCategory() {
    this.loading = true;
    return new Promise((resolve, reject) => {

      if(this.periodTemporal === this.categoria.value && this.ban === false) {
        resolve(true);
      } else {
        this.categoryService.searchCategory(this.categoria.value)
        .subscribe( (data : any) =>
        {
          this.loading = false;
          const dataResult = data;
          if (dataResult.estado) {
            this.isValidFormCategory = false;
          } else {
            this.isValidFormCategory = true;
          }
          resolve(true);
        }, (error: HttpErrorResponse) => {
          this.loading = false;
          this.isValidFormCategory = true;
          reject(false);
        });
      }
    });
  }

  save(): void {
    this.loading = true;
    this.categoryService.save(this.categoryDTO)
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
    this.categoryService.update(this.categoryDTO)
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