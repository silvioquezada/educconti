import { Component, OnInit } from '@angular/core';
import { ManagerDTO } from 'src/app/manager/models/manager.dto';

@Component({
  selector: 'app-user-manager-search',
  templateUrl: './user-manager-search.component.html',
  styleUrls: ['./user-manager-search.component.scss']
})
export class UserManagerSearchComponent implements OnInit {
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
