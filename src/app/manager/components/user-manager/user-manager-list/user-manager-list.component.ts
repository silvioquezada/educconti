import { Component, OnInit } from '@angular/core';
import { ManagerDTO } from 'src/app/manager/models/manager.dto';
import { ManagerService } from 'src/app/manager/services/manager.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-user-manager-list',
  templateUrl: './user-manager-list.component.html',
  styleUrls: ['./user-manager-list.component.scss']
})
export class UserManagerListComponent implements OnInit {
  loading: boolean = false;
  managersDTO: ManagerDTO[];
  filterpost = "";
  page = 1;
  count = 0;
  pagesize = 5;

  constructor(private managerService: ManagerService) {
  }

  ngOnInit(): void {
    this.listUserManager();
  }

  listUserManager(): void {
    this.loading = true;

    this.managerService.listUserManager()
    .subscribe( (data) => {
        this.loading = false;
        this.managersDTO = data;
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

}