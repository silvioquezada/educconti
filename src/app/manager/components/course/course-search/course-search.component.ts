import { Component, OnInit } from '@angular/core';
import { CourseDTO } from 'src/app/manager/models/course.dto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.scss']
})
export class CourseSearchComponent implements OnInit {
  courseDTO: CourseDTO;
  urlImage: string = '';

  constructor() {
    this.formNormal();
  }

  ngOnInit(): void {
  }

  formNormal() : void {
    this.courseDTO = new CourseDTO(0, null, '', null, '', '', '', '', null, null, null, null, '', null, '', '', 1);
  }

  assignValues(managerDTO: CourseDTO): void {
    this.courseDTO = managerDTO;
    this.urlImage = environment.baseUrlFile + 'img/' + this.courseDTO.imagen_curso;
  }

  viewProgram(documento_descripcion: string) {
    let miWindow = window.open(environment.baseUrlFile + 'pdf/' + documento_descripcion, "", 'width=600,height=400,left=300,top=100');
    miWindow.focus();
  }

}
