import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseDTO } from 'src/app/manager/models/course.dto';
import { CourseService } from 'src/app/manager/services/course.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CourseFormComponent } from '../course-form/course-form.component';
import { CourseSearchComponent } from '../course-search/course-search.component';

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
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  @ViewChild(CourseFormComponent)  periodFormComponent: any;
  @ViewChild(CourseSearchComponent) periodSearchComponent: any;

  editorConfig = editorConfig;
  public editorcodigo = ClassicEditor;
  codigo : string ="";
  
  loading: boolean = false;
  coursesDTO: CourseDTO[];
  filterpost = "";
  page = 1;
  count = 0;
  pagesize = 5;

  constructor(private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.listUserManager();
  }

  listUserManager(): void {
    this.loading = true;

    this.courseService.list()
    .subscribe( (data) => {
        this.loading = false;
        this.coursesDTO = data;
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
    this.listUserManager();
  }

  keyFilter() {
    this.page = 1;
  }

  handlePageChange(event: number): void {
    this.page = event;
  }

  newRow(): void {
    this. periodFormComponent.formNormal();
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
          this.listUserManager();
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