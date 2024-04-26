import { Component, OnInit } from '@angular/core';
import { ManagerDTO } from 'src/app/manager/models/manager.dto';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.scss']
})
export class CourseSearchComponent implements OnInit {
  managerDTO: ManagerDTO;
  constructor() {
    this.formNormal();
  }

  ngOnInit(): void {
  }

  formNormal() : void {
    this.managerDTO = new ManagerDTO(0, '', '', '', '', '', '', 1, '', '');
  }

  assignValues(managerDTO: ManagerDTO): void {
    this.managerDTO = managerDTO;
  }

}
