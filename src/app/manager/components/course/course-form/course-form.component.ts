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
import { environment } from 'src/environments/environment';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const editorConfig = {
  // ui: 'pt',
  // language: 'pt',
  toolbar: {
    items: [
      'undo',
      'redo',
      '|',
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      '|',
      'strikethrough',
      'code',
      '|', // Não tem ainda
      'bulletedList',
      'numberedList',
    ],
  },
};

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  editorConfig = editorConfig;
  public editorcodigo = ClassicEditor;
  codigo : string ="";
  
  courseDTO: CourseDTO;
  @Output() dataSend: EventEmitter<any> = new EventEmitter<any>();
  title: string = "";
  periodDTO: PeriodDTO;
  periodsDTO: PeriodDTO[];
  categoryDTO: CategoryDTO;
  categoriesDTO: CategoryDTO[];

  codigo_curso: FormControl;
  periodo: FormControl;
  categoria: FormControl;
  nombre_curso: FormControl;
  imagen_curso: FormControl;
  fecha_inicio_inscripcion: FormControl;
  fecha_fin_inscripcion: FormControl;
  fecha_inicio: FormControl;
  fecha_fin: FormControl;
  modalidad: FormControl;
  cupo: FormControl;
  descripcion: FormControl;
  documento_descripcion: FormControl;

  selectedImge: File = null;
  selectedPdf: File = null;

  cod_curso: number = 0;

  registerForm: FormGroup;
  isValidFormImage!: boolean | null;
  isValidForm!: boolean | null;
  isValidFormCourse: boolean;
  messagueImage: string = '';
  codigoCursoTemporal: string = '';
  loading: boolean = false;
  ban: boolean = true;
  textButton: string = '';
  urlImage: string = '';

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
    this.title = "Nuevo Registro";
    this.courseDTO = new CourseDTO(0, null, '', null, '', '', '', '', null, null, null, null, '', null, '', '', 1);

    this.periodo = new FormControl(this.courseDTO.cod_periodo, [
      Validators.required
    ]);

    this.categoria = new FormControl(this.courseDTO.cod_categoria, [
      Validators.required
    ]);

    this.codigo_curso = new FormControl(this.courseDTO.codigo_curso, [
      Validators.required
    ]);

    this.nombre_curso = new FormControl(this.courseDTO.nombre_curso, [
      Validators.required
    ]);

    this.imagen_curso = new FormControl(this.courseDTO.imagen_curso, [
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

    this.cupo = new FormControl(this.courseDTO.cupo, [
      Validators.required
    ]);

    this.descripcion = new FormControl(this.courseDTO.descripcion, [
      Validators.required
    ]);

    this.documento_descripcion = new FormControl(this.courseDTO.documento_descripcion);

    this.registerForm = this.formBuilder.group({
      cod_periodo: this.periodo,
      cod_categoria: this.categoria,
      codigo_curso: this.codigo_curso,
      nombre_curso: this.nombre_curso,
      imagen_curso: this.imagen_curso,
      fecha_inicio_inscripcion: this.fecha_inicio_inscripcion,
      fecha_fin_inscripcion: this.fecha_fin_inscripcion,
      fecha_inicio: this.fecha_inicio,
      fecha_fin: this.fecha_fin,
      modalidad: this.modalidad,
      cupo: this.cupo,
      descripcion: this.descripcion,
      documento_descripcion: this.documento_descripcion
    });
    this.cod_curso = Number(moment().unix().toString());
    
    this.selectedImge = null;
    this.selectedPdf = null;

    this.messagueImage = '';

    this.isValidFormImage = true;
    this.isValidForm = true;
    this.isValidFormCourse = true;
    this.ban = true;
    this.textButton = 'Guardar';
  }

  assignValues(courseDTO: CourseDTO): void {
    this.title = "Editar Registro";
    this.cod_curso = Number(courseDTO.cod_curso);
    this.codigo_curso.setValue(courseDTO.codigo_curso);
    this.periodo.setValue(courseDTO.cod_periodo);
    this.categoria.setValue(courseDTO.cod_categoria);
    this.nombre_curso.setValue(courseDTO.nombre_curso);
    //this.imagen_curso.setValue(null);
    this.imagen_curso.setValue(courseDTO.imagen_curso);
    this.urlImage = environment.baseUrlFile + 'img/' + courseDTO.imagen_curso;
    this.fecha_inicio_inscripcion.setValue(courseDTO.fecha_inicio_inscripcion);
    this.fecha_fin_inscripcion.setValue(courseDTO.fecha_fin_inscripcion);
    this.fecha_inicio.setValue(courseDTO.fecha_inicio);
    this.fecha_fin.setValue(courseDTO.fecha_fin);
    this.modalidad.setValue(courseDTO.modalidad);
    this.cupo.setValue(courseDTO.cupo);
    this.descripcion.setValue(courseDTO.descripcion);
    //this.documento_descripcion.setValue(null);
    this.documento_descripcion.setValue(courseDTO.documento_descripcion);
    this.codigoCursoTemporal = courseDTO.codigo_curso;
    this.ban = false;
    //this.courseDTO.imagen_curso = courseDTO.imagen_curso;
    //this.courseDTO.documento_descripcion = courseDTO.descripcion;
    this.textButton = 'Actualizar';
  }

  ngOnInit(): void {
    this.isValidFormCourse = true;
  }

  register(): void {
    this.isValidForm = false;
    if (this.registerForm.status == 'INVALID') {

      //if (this.ban) {
        Swal.fire({
          icon: 'error',
          title: 'Algunos datos son inválidos, revise por favor',
          showConfirmButton: false,
          timer: 1500
        });
        return;
      //}
      /*
      if (this.ban === false && this.imagen_curso.value !== null) {
        Swal.fire({
          icon: 'error',
          title: 'Algunos datos son inválidos, revise por favor',
          showConfirmButton: false,
          timer: 1500
        });
        return;
      }
      */
      
    }

    this.isValidForm = true;
    this.isValidFormCourse = true;
    this.courseDTO = this.registerForm.value;
    this.courseDTO.cod_curso = this.cod_curso;
    
    this.searchCodigoCurso();
  }

  searchCodigoCurso() {
    this.loading = true;
      if(this.codigoCursoTemporal === this.codigo_curso.value && this.ban === false) {
        this.uploadFile();
      } else {
        this.courseService.searchCodeCourse(this.codigo_curso.value)
        .subscribe( (data : any) =>
        {
          this.loading = false;
          const dataResult = data;
          if (dataResult.estado) {
            this.isValidFormCourse = false;
            Swal.fire({
              icon: 'error',
              title: 'Algunos valores son existentes, revise por favor',
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            this.isValidFormCourse = true;
            this.uploadFile();
          }
        }, (error: HttpErrorResponse) => {
          this.loading = false;
          this.isValidFormCourse = false;
          Swal.fire({
            icon: 'error',
            title: 'Error en la conexión intente mas tarde',
            showConfirmButton: false,
            timer: 1500
          });
        });
      }
  }

  uploadFile() {
    const promise1 = this.uploadImage().then();
    const promise2 = this.uploadPdf().then();
    Promise.all([promise1, promise2])
    .then(() => {
      if(this.isValidFormImage) {
        if(this.ban) {
          this.save();
        } else {
          this.update();
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Los archivos no son correctos, revise por favor',
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
    this.loading = true;
    this.categoryService.list()
    .subscribe( (data) => {
        this.loading = false;
        this.categoriesDTO = data;
    }, (error: HttpErrorResponse) => {
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Se ha originado un error en el servidor',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  listPeriod() {
    this.loading = true;
    this.periodService.list()
    .subscribe( (data) => {
        this.loading = false;
        this.periodsDTO = data;
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

  selectImagen(event) {
    this.selectedImge = <File>event.target.files[0];
    this.imagen_curso.setValue(this.cod_curso);
  }

  selectPdf(event) {
    this.selectedPdf = <File>event.target.files[0];
    this.documento_descripcion.setValue(this.cod_curso);
  }

  uploadImage() {
    return new Promise((resolve, reject) => {
      if( (this.selectedImge !== null && this.ban === false) || (this.selectedImge !== null && this.ban === true)) {
        this.loading = true;
        let formImage = new FormData();
        formImage.append("image", this.selectedImge);
        formImage.append("name_image", String(this.cod_curso));
        this.courseService.uploadImage(formImage).subscribe( (data : any) => {
          this.loading = false;
          if(data.estado) {
            this.isValidFormImage = true;
            this.courseDTO.imagen_curso = data.file;
            resolve(true);
          } else {
            this.isValidFormImage = false;
            this.messagueImage = data.messague
            resolve(true);
          }
        }, () => {
          this.loading = false;
          this.isValidFormImage = true;
          reject(false);
        });
      } else {
        this.isValidFormImage = true;
        resolve(true);
      }
    });
  }

  uploadPdf() {
    return new Promise((resolve, reject) => {
      if( (this.selectedPdf !== null && this.ban === false) || (this.selectedPdf !== null && this.ban === true)) {
        this.loading = true;
        let formPdf = new FormData();
        formPdf.append("pdf", this.selectedPdf);
        formPdf.append("name_pdf", String(this.cod_curso));
        this.courseService.uploadPdf(formPdf).subscribe( (data : any) => {
          this.loading = false;
          if(data.estado) {
            this.courseDTO.documento_descripcion = data.file;
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

  keyFilter() {
    this.page = 1;
  }

  handlePageChange(event: number): void {
    this.page = event;
  }

}