import { Component, OnInit } from '@angular/core';
import { ManagerDTO } from 'src/app/manager/models/manager.dto';

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.scss']
})
export class CategorySearchComponent implements OnInit {
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
