import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CourseDTO } from 'src/app/manager/models/course.dto';
import { CourseService } from 'src/app/manager/services/course.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  cod_categoria: number = 0;
  categoria: string = '';
  loading: boolean = false;
  coursesDTO: CourseDTO[];

  constructor(private courseService: CourseService, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.rutaActiva.paramMap.subscribe( (params: ParamMap) => {
      this.cod_categoria = Number(params.get('cod_categoria'));
      this.categoria = 'Cursos de ' + params.get('categoria');
      this.listCourse();
    });
  }

  listCourse(): void {
    this.loading = true;
    this.coursesDTO = [];
    this.courseService.listCourseCategory(this.cod_categoria)
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
}