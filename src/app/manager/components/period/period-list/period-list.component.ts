import { Component, OnInit, ViewChild } from '@angular/core';
import { ManagerDTO } from 'src/app/manager/models/manager.dto';
import { ManagerService } from 'src/app/manager/services/manager.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UserManagerFormComponent } from '../../user-manager/user-manager-form/user-manager-form.component';
import { UserManagerSearchComponent } from '../../user-manager/user-manager-search/user-manager-search.component';

@Component({
  selector: 'app-period-list',
  templateUrl: './period-list.component.html',
  styleUrls: ['./period-list.component.scss']
})
export class PeriodListComponent implements OnInit {
  @ViewChild(UserManagerFormComponent) userManagerForm: any;
  @ViewChild(UserManagerSearchComponent) userManagerSearchForm: any;
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

  newRow(): void {
    this.userManagerForm.formNormal();
  }

  editRow(managerDTO: ManagerDTO): void {
    this.userManagerForm.formNormal();
    this.userManagerForm.assignValues(managerDTO);
  }

  viewRow(managerDTO: ManagerDTO): void {
    this.userManagerSearchForm.formNormal();
    this.userManagerSearchForm.assignValues(managerDTO);
  }

  deleteRow(managerDTO: ManagerDTO): void {
    Swal.fire({
      title: managerDTO.nombre + ' ' + managerDTO.apellido,
      text: '¿Estás seguro de eliminar registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cerrar'
    }).then((result) => {
      if (result.value) {
        this.delete(managerDTO);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    });
  }

  delete(managerDTO: ManagerDTO) : void {
    this.loading = true;
    this.managerService.deleteManager(managerDTO)
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