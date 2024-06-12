import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { RequirementsService } from '../../services/requirements.service';
import { RequirementsDTO } from '../../models/requirements.dto';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const editorConfig = {
  toolbar: {
    items: [
      'undo',
      'redo',
      '|',
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      '|',
      'strikethrough',
      'code',
      '|', // Não tem ainda
      'bulletedList',
      'numberedList',
    ],
  },
};

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.scss']
})
export class RequirementsComponent implements OnInit {
  loading: boolean = false;
  editorConfig = editorConfig;
  public editorcodigo = ClassicEditor;
  requisitos: FormControl;
  registerForm: FormGroup;
  isValidForm: boolean  = true;
  requirementDTO: RequirementsDTO;

  constructor(private requirementsService: RequirementsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.requirementDTO = new RequirementsDTO(1, '');
    this.requisitos = new FormControl(this.requirementDTO.requisitos, [
      Validators.required
    ]);
    this.registerForm = this.formBuilder.group({
      requisitos: this.requisitos
    });

    this.search();
  }

  search(): void {
    this.loading = true;

    this.requirementsService.search()
    .subscribe( (data) => {
        this.loading = false;
        this.requisitos.setValue(data.requisitos);
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

  register(): void {
    this.isValidForm = false;
    if (this.registerForm.status === 'INVALID') {
        Swal.fire({
          icon: 'error',
          title: 'Algunos datos son inválidos, revise por favor',
          showConfirmButton: false,
          timer: 1500
        });
        return;
    }

    this.isValidForm = true;
    this.requirementDTO = this.registerForm.value;
    this.requirementDTO.cod_requisitos = 1;
    this.update();
  }

  update(): void {
    this.loading = true;
    this.requirementsService.update(this.requirementDTO)
    .subscribe( async (data) => {
        this.loading = false;
        const dataResult = data;
        
        if (dataResult.estado === 1)
        {
          await Swal.fire({
            icon: 'success',
            title: 'Se actualizado el registro satisfactoriamente',
            showConfirmButton: false,
            timer: 1500
          });
        }
        else
        {
          Swal.fire({
            icon: 'error',
            title: 'Registro no se pudo actualizar, vuelva a intertarlo por favor',
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
