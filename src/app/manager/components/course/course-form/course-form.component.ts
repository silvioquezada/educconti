import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseDTO } from 'src/app/manager/models/course.dto';
import { PeriodDTO } from 'src/app/manager/models/period.dto';
import { CategoryDTO } from 'src/app/manager/models/category.dto';
import { PeriodService } from 'src/app/manager/services/period.service';
import { CategoryService } from 'src/app/manager/services/category.service';
import { CourseService } from 'src/app/manager/services/course.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
declare var $:any;

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  courseDTO: CourseDTO;
  @Output() dataSend: EventEmitter<any> = new EventEmitter<any>();
  title: string = "";
  periodDTO: PeriodDTO;
  periodsDTO: PeriodDTO[];
  categoryDTO: CategoryDTO;
  categoriesDTO: CategoryDTO[];

  cod_periodo: number = 0;
  cod_categoria: number =0;

  codigo_curso: FormControl;
  periodo: FormControl;
  categoria: FormControl;
  nombre_curso: FormControl;
  imagen: FormControl;
  fecha_inicio_inscripcion: FormControl;
  fecha_fin_inscripcion: FormControl;
  fecha_inicio: FormControl;
  fecha_fin: FormControl;
  modalidad: FormControl;
  cupo: FormControl;
  descripcion: FormControl;
  documento_descripcion: FormControl;

  cod_curso: number = 0;

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

  constructor(private formBuilder: FormBuilder, private periodService: PeriodService, private router: Router, private categoryService: CategoryService, private courseService: CourseService) {
    this.listPeriod();
    this.listCategories();
    this.formNormal();
  }

  formNormal() {
    /*
    const promise1 = this.listPeriod().then();
    const promise2 = this.listCategories().then();
    Promise.all([promise1, promise2])
    .then(() => {
      





    })
    .catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Error enla conexión intente mas tarde',
        showConfirmButton: false,
        timer: 1500
      });
    });
  */


    
    this.title = "Nuevo Registro";
    this.courseDTO = new CourseDTO(0, 0, 0, '', '', '', new Date(), new Date(), new Date(), new Date(), '', 0, '', '', 1);
    //this.periodDTO = new PeriodDTO(0, '', '', '', 1);
    //this.categoryDTO = new CategoryDTO(0, '', 1);

    this.cod_periodo = null;
    this.cod_categoria = null;

    this.periodo = new FormControl(this.cod_periodo, [
      Validators.required
    ]);

    this.categoria = new FormControl(this.cod_categoria, [
      Validators.required
    ]);

    this.codigo_curso = new FormControl(this.courseDTO.codigo_curso, [
      Validators.required
    ]);

    this.nombre_curso = new FormControl(this.courseDTO.nombre_curso, [
      Validators.required
    ]);

    this.imagen = new FormControl(this.courseDTO.imagen, [
      Validators.required
    ]);

    this.fecha_inicio_inscripcion = new FormControl(this.courseDTO.fecha_inicio_inscripcion, [
      Validators.required
    ]);

    this.fecha_fin_inscripcion = new FormControl(this.courseDTO.fecha_fin_inscripcion, [
      Validators.required
    ]);

    this.fecha_inicio = new FormControl(this.courseDTO.fecha_inicio, [
      Validators.required
    ]);

    this.fecha_fin = new FormControl(this.courseDTO.fecha_fin, [
      Validators.required
    ]);

    this.modalidad = new FormControl(this.courseDTO.modalidad, [
      Validators.required
    ]);

    this.registerForm = this.formBuilder.group({
      periodo: this.periodo,
      categoria: this.categoria,
      codigo_curso: this.codigo_curso,
      nombre_curso: this.nombre_curso,
      modalidad: this.modalidad
    });

    this.cod_curso = Number(moment().unix().toString());
    
    this.isValidForm = true;
    this.isValidFormPeriod = true;
    this.ban = true;
    this.textButton = 'Guardar';

    

    console.log(1);
  }

  assignValues(courseDTO: CourseDTO): void {
    console.log(2);
    this.title = "Editar Registro";
    this.cod_curso = Number(courseDTO.cod_curso);
    this.codigo_curso.setValue(courseDTO.codigo_curso);
    this.periodo.setValue(courseDTO.cod_periodo);
    this.categoria.setValue(courseDTO.cod_categoria);
    this.nombre_curso.setValue(courseDTO.nombre_curso);

    this.imagen.setValue(courseDTO.imagen);
    this.fecha_inicio_inscripcion.setValue(courseDTO.fecha_inicio_inscripcion);
    this.fecha_fin_inscripcion.setValue(courseDTO.fecha_fin_inscripcion);

    this.modalidad.setValue(courseDTO.modalidad);
    this.periodTemporal = courseDTO.codigo_curso;
    this.ban = false;
    this.textButton = 'Actualizar';

    //this.cod_periodo = courseDTO.cod_periodo;
    //this.cod_categoria = courseDTO.cod_categoria;
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
    this.courseDTO = this.registerForm.value;
    this.courseDTO.cod_curso = this.cod_curso;

    const promise1 = this.searchEmail().then();
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
        title: 'Error enla conexión intente mas tarde',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  searchEmail() {
    this.loading = true;
    return new Promise((resolve, reject) => {

      if(this.periodTemporal === this.codigo_curso.value && this.ban === false) {
        resolve(true);
      } else {
        this.periodService.searchCodePeriod(this.codigo_curso.value)
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
          this.isValidFormPeriod = false;
          Swal.fire({
            icon: 'error',
            title: 'Error enla conexión intente mas tarde',
            showConfirmButton: false,
            timer: 1500
          });
          reject(false);
        });
      }
    });
  }

  save(): void {
    this.loading = true;
    this.courseService.save(this.courseDTO)
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
    this.courseService.update(this.courseDTO)
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

  listCategories() {

    //return new Promise((resolve, reject) => {
      this.loading = true;
        this.categoryService.list()
        .subscribe( (data) => {
            this.loading = false;
            this.categoriesDTO = data;
          //resolve(true);
        }, (error: HttpErrorResponse) => {
          this.loading = false;
          Swal.fire({
            icon: 'error',
            title: 'Se ha originado un error en el servidor',
            showConfirmButton: false,
            timer: 1500
          });
          //reject(false);
        });
    //});

  }

  listPeriod() {
    //return new Promise((resolve, reject) => {
      this.loading = true;

      this.periodService.list()
      .subscribe( (data) => {
          this.loading = false;
          this.periodsDTO = data;
          //resolve(true);
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          Swal.fire({
            icon: 'error',
            title: 'Se ha originado un error en el servidor',
            showConfirmButton: false,
            timer: 1500
          });
          //reject(false);
        }
      );
    //});
  }

  keyFilter() {
    this.page = 1;
  }

  handlePageChange(event: number): void {
    this.page = event;
  }

}