import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { RequirementsService } from 'src/app/manager/services/requirements.service';
import { RequirementsDTO } from 'src/app/manager/models/requirements.dto';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.scss']
})
export class RequirementsComponent implements OnInit {
  loading: boolean = false;
  requirementDTO: RequirementsDTO = new RequirementsDTO(1, '');

  constructor(private requirementsService: RequirementsService) { }

  ngOnInit(): void {
    this.viewRequirement();
  }

  viewRequirement(): void {
    this.loading = true;

    this.requirementsService.viewRequirement()
    .subscribe( (data) => {
        this.loading = false;
        this.requirementDTO.requisitos = data.requisitos;
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
