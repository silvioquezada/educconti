import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { CategoryService } from 'src/app/manager/services/category.service';
import { UsuarioService } from '../../services/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UsuarioDTO } from '../../models/usuario.dto';
declare var $:any;

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  usuarioDTO: UsuarioDTO;
  cod_usuario: number = 0;
  correo: FormControl;
  registerForm: FormGroup;
  isValidForm!: boolean | null;
  isValidFormEmail: boolean;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.formNormal();
  }

  formNormal() : void {
    this.usuarioDTO = new UsuarioDTO(0, '', '', '', '', '', '', '', '', '', '', '', 1, '', '');

    this.correo = new FormControl(this.usuarioDTO.correo, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
    ]);

    this.registerForm = this.formBuilder.group({
      correo: this.correo,
    });

    this.isValidForm = true;
    this.isValidFormEmail = true;
  }

  register() {
    this.isValidForm = false;
    if (this.registerForm.status == 'INVALID') {
      Swal.fire({
        icon: 'error',
        title: 'Algunos datos son inválidos, revise por favor',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    this.isValidForm = true;
    this.isValidFormEmail = true;
    
    this.usuarioDTO = this.registerForm.value;
    this.usuarioDTO.cod_usuario = this.cod_usuario;

    const promise1 = this.searchEmail().then();
    Promise.all([promise1])
    .then(() => {
      if(this.isValidFormEmail) {
        this.send();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'El correo ingresado no está registrado',
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
    .catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Error en la conexión intente mas tarde',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  searchEmail() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.usuarioService.searchEmail(this.correo.value)
      .subscribe( (data : any) =>
      {
        this.loading = false;
        const dataResult = data;
        if (dataResult.estado) {
          this.isValidFormEmail = true;
        } else {
          this.isValidFormEmail = false;
        }
        resolve(true);
      }, (error: HttpErrorResponse) => {
        this.loading = false;
        this.isValidFormEmail = true;
        reject(false);
      });
    });
  }

  send(): void {
    this.loading = true;
    this.usuarioService.recoverPassword(this.usuarioDTO)
    .subscribe( async (data) => {
        this.loading = false;
        const dataResult = data;
        
        if (dataResult.estado === 1)
        {
          await Swal.fire({
            icon: 'success',
            title: 'Se ha enviado una contraseña a su cuenta de correo electrónico',
            showConfirmButton: false,
            timer: 1500
          });
          $("#modalFormRecover").modal("hide");
        }
        else
        {
          Swal.fire({
            icon: 'error',
            title: 'Registro no se pudo almacenar, vuelva a intertarlo por favor',
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