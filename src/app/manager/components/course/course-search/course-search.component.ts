import { Component, OnInit } from '@angular/core';
import { CourseDTO } from 'src/app/manager/models/course.dto';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.scss']
})
export class CourseSearchComponent implements OnInit {
  courseDTO: CourseDTO;
  constructor() {
    this.formNormal();
  }

  ngOnInit(): void {
  }

  formNormal() : void {
    this.courseDTO = new CourseDTO(0, 0, 0, '', '', new Date(), new Date(), new Date(), new Date(), '', 0, '', '', 1);
  }

  assignValues(managerDTO: CourseDTO): void {
    this.courseDTO = managerDTO;
  }

}
