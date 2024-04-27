import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryDTO } from 'src/app/manager/models/category.dto';
import { CategoryService } from 'src/app/manager/services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { CategorySearchComponent } from '../category-search/category-search.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  @ViewChild(CategoryFormComponent) categoryFormComponent: any;
  @ViewChild(CategorySearchComponent) categorySearchComponent: any;
  loading: boolean = false;
  categoriesDTO: CategoryDTO[];
  filterpost = "";
  page = 1;
  count = 0;
  pagesize = 5;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.listUserManager();
  }

  listUserManager(): void {
    this.loading = true;

    this.categoryService.list()
    .subscribe( (data) => {
        this.loading = false;
        this.categoriesDTO = data;
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

  receiveCategoryData(): void {
    this.listUserManager();
  }

  keyFilter() {
    this.page = 1;
  }

  handlePageChange(event: number): void {
    this.page = event;
  }

  newRow(): void {
    this. categoryFormComponent.formNormal();
  }

  editRow(categoryDTO: CategoryDTO): void {
    this. categoryFormComponent.formNormal();
    this. categoryFormComponent.assignValues(categoryDTO);
  }

  viewRow(categoryDTO: CategoryDTO): void {
    this.categorySearchComponent.formNormal();
    this.categorySearchComponent.assignValues(categoryDTO);
  }

  deleteRow(categoryDTO: CategoryDTO): void {
    Swal.fire({
      title: categoryDTO.categoria,
      text: '¿Estás seguro de eliminar registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cerrar'
    }).then((result) => {
      if (result.value) {
        this.delete(categoryDTO);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    });
  }

  delete(categoryDTO: CategoryDTO) : void {
    this.loading = true;
    this.categoryService.delete(categoryDTO)
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