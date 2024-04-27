import { Component, OnInit, ViewChild } from '@angular/core';
import { PeriodDTO } from 'src/app/manager/models/period.dto';
import { PeriodService } from 'src/app/manager/services/period.service';
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
  periodsDTO: PeriodDTO[];
  filterpost = "";
  page = 1;
  count = 0;
  pagesize = 5;

  constructor(private periodService: PeriodService) {
  }

  ngOnInit(): void {
    this.listUserManager();
  }

  listUserManager(): void {
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

  editRow(periodDTO: PeriodDTO): void {
    this.userManagerForm.formNormal();
    this.userManagerForm.assignValues(periodDTO);
  }

  viewRow(periodDTO: PeriodDTO): void {
    this.userManagerSearchForm.formNormal();
    this.userManagerSearchForm.assignValues(periodDTO);
  }

  deleteRow(periodDTO: PeriodDTO): void {
    Swal.fire({
      title: periodDTO.descripcion + ' ' + periodDTO.anio,
      text: '¿Estás seguro de eliminar registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cerrar'
    }).then((result) => {
      if (result.value) {
        this.delete(periodDTO);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    });
  }

  delete(periodDTO: PeriodDTO) : void {
    this.loading = true;
    this.periodService.delete(periodDTO)
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