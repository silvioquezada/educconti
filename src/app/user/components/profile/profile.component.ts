import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { UsuarioDTO } from '../../models/usuario.dto';
import { UsuarioService } from '../../services/usuario.service';

import { HttpErrorResponse } from '@angular/common/http';

import * as moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  usuarioDTO: UsuarioDTO
  cod_usuario: number = 0;
  cedula: FormControl;
  apellido: FormControl;
  nombre: FormControl;
  genero: FormControl;
  etnia: FormControl;
  direccion: FormControl;
  celular: FormControl;
  correo: FormControl;
  nivelInstruccion: FormControl;
  usuario: FormControl;
  password: FormControl;
  password2: FormControl;
  profileForm: FormGroup;
  isValidForm: boolean  = true;
  isValidFormCedula: boolean;
  isValidFormEmail: boolean;
  isValidFormUser: boolean;
  messagueCedula: string = '';
  messagueEmail: string = '';
  messaguePassword: string = '';
  loading: boolean = false;
  cedulaTemporal: string = '';
  correoTemporal: string = '';
  usuarioTemporal: string = '';
  tipo_usuario: string = this.localStorageService.getData('tipo_usuario');

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private router: Router, private localStorageService: LocalStorageService) {

    this.usuarioDTO = new UsuarioDTO(0, '', '', '', '', '', '', '', '', '', '', '', 1, '', ''); 

    this.apellido = new FormControl(this.usuarioDTO.apellido, [
      Validators.required
    ]);

    this.nombre = new FormControl(this.usuarioDTO.nombre, [
      Validators.required
    ]);

    this.celular = new FormControl(this.usuarioDTO.celular, [
      Validators.required
    ]);

    this.correo = new FormControl(this.usuarioDTO.correo, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
    ]);

    this.usuario = new FormControl(this.usuarioDTO.usuario, [
      Validators.required
    ]);

    this.password = new FormControl(this.usuarioDTO.password, [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]).{8,}$/)
    ]);

    this.password2 = new FormControl('', [
      this.passwordValidator
    ]);

    if(this.tipo_usuario === 'NORMAL') {
      this.cedula = new FormControl(this.usuarioDTO.cedula, [
        this.cedulaValidator
      ]);

      this.genero = new FormControl(this.usuarioDTO.genero, [
        Validators.required
      ]);
  
      this.etnia = new FormControl(this.usuarioDTO.etnia, [
        Validators.required
      ]);
  
      this.direccion = new FormControl(this.usuarioDTO.direccion, [
        Validators.required
      ]);

      this.nivelInstruccion = new FormControl(this.usuarioDTO.nivel_instruccion, [
        Validators.required
      ]);
      
      this.profileForm = this.formBuilder.group({
        cedula: this.cedula,
        apellido: this.apellido,
        nombre: this.nombre,
        genero: this.genero,
        etnia: this.etnia,
        direccion: this.direccion,
        celular: this.celular,
        correo: this.correo,
        nivel_instruccion: this.nivelInstruccion,
        usuario: this.usuario,
        password: this.password,
        password2: this.password2
      });
    } else {
      this.profileForm = this.formBuilder.group({
        apellido: this.apellido,
        nombre: this.nombre,
        celular: this.celular,
        correo: this.correo,
        usuario: this.usuario,
        password: this.password,
        password2: this.password2
      });
    }

    
  }

  cedulaValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    this.isValidFormCedula = true;
    this.messagueCedula = 'La cédula es inválida';
    return this.usuarioDTO.ValidateCedula(control.value);
  }

  passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    this.messaguePassword = '';
    let password2 = control.value;
    
    if(password2 === ''){
      this.messaguePassword = 'Contraseña de confirmación es requerida';
      return { isValid: true }
    }

    if (this.password.value !== password2){
      this.messaguePassword = 'Las contraseñas no coinciden';
      return { isValid: true }
    }
  
    return null;
  }

  ngOnInit(): void {
    this.isValidFormCedula = true;
    this.isValidFormEmail = true;
    this.isValidFormUser = true;
    this.searchRowUser();
  }

  searchRowUser() {
    this.loading = true;

    this.usuarioService.searchRowUser(this.usuarioDTO)
    .subscribe( async (data) => {
        this.loading = false;
        const dataResult = data;
        if (dataResult.estado === 0)
        {
          Swal.fire({
            icon: 'error',
            title: 'Registro no se encontró',
            showConfirmButton: false,
            timer: 1500
          });
        }
        else
        {
          if(this.tipo_usuario === 'NORMAL') {
            this.cedula.setValue(dataResult.cedula);
            this.genero.setValue(dataResult.genero);
            this.etnia.setValue(dataResult.etnia);
            this.direccion.setValue(dataResult.direccion);
            this.nivelInstruccion.setValue(dataResult.nivel_instruccion);
            this.usuarioDTO.tipo_usuario = 'NORMAL';
          }

          this.cod_usuario = Number(dataResult.cod_usuario);
          this.apellido.setValue(dataResult.apellido);
          this.nombre.setValue(dataResult.nombre);
          this.celular.setValue(dataResult.celular);
          this.correo.setValue(dataResult.correo);
          this.usuario.setValue(dataResult.usuario);
          this.password.setValue("");
          this.password2.setValue("");
          this.cedulaTemporal = dataResult.cedula;
          this.correoTemporal = dataResult.correo;
          this.usuarioTemporal = dataResult.usuario;
          this.usuarioDTO.tipo_usuario = 'GESTOR';
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

  profile() {
    this.isValidForm = false;
    if (this.profileForm.status === 'INVALID') {
      Swal.fire({
        icon: 'error',
        title: 'Algunos datos son inválidos, revise por favor',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    this.isValidForm = true;
    this.isValidFormCedula = true;
    this.isValidFormEmail = true;
    this.isValidFormUser = true;
    this.usuarioDTO = this.profileForm.value;
    this.usuarioDTO.cod_usuario = this.cod_usuario;
    if(this.tipo_usuario === 'NORMAL') {
      this.usuarioDTO.tipo_usuario = 'NORMAL';
    } else {
      this.usuarioDTO.tipo_usuario = 'GESTOR';
      this.usuarioDTO.cedula = '0';
      this.usuarioDTO.genero = '0';
      this.usuarioDTO.etnia = '0';
      this.usuarioDTO.direccion = '0';
      this.usuarioDTO.nivel_instruccion = '0';
    }

    const promise1 = this.searchCedula().then();
    const promise2 = this.searchEmail().then();
    const promise3 = this.searchUser().then();
    Promise.all([promise1, promise2, promise3])
    .then(() => {
      if(this.isValidFormCedula && this.isValidFormEmail && this.isValidFormUser) {
        this.update();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Algunos valores son existentes, revise por favor',
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

  searchCedula() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      if(this.tipo_usuario === 'GESTOR') {
        if(this.cedulaTemporal === this.usuarioDTO.cedula) {
          resolve(true);
        } else {
          this.usuarioService.searchCedula(this.cedula.value)
          .subscribe( (data : any) =>
          {
            this.loading = false;
            const dataResult = data;
            if (dataResult.estado) {
              this.isValidFormCedula = false;
              this.messagueCedula = 'Cédula ya está registrada';
            } else {
              this.isValidFormCedula = true;
            }
            resolve(true);
          }, (error: HttpErrorResponse) => {
            this.loading = false;
            this.isValidFormCedula = true;
            reject(false);
          });
        }
      } else {
        resolve(true);
      }
    });
  }

  searchEmail() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      if(this.correoTemporal === this.usuarioDTO.correo) {
        resolve(true);
      } else {
        this.usuarioService.searchEmail(this.correo.value)
        .subscribe( (data : any) =>
        {
          this.loading = false;
          const dataResult = data;
          if (dataResult.estado) {
            this.isValidFormEmail = false;
          } else {
            this.isValidFormEmail = true;
          }
          resolve(true);
        }, (error: HttpErrorResponse) => {
          this.loading = false;
          this.isValidFormEmail = true;
          reject(false);
        });
      }
    });
  }

  searchUser() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      if(this.usuarioTemporal === this.usuarioDTO.usuario) {
        resolve(true);
      } else {
        this.usuarioService.searchUser(this.usuario.value)
        .subscribe( (data : any) =>
        {
          this.loading = false;
          const dataResult = data;
          if (dataResult.estado) {
            this.isValidFormUser = false;
          } else {
            this.isValidFormUser = true;
          }
          resolve(true);
        }, (error: HttpErrorResponse) => {
          this.loading = false;
          this.isValidFormUser = true;
          reject(false);
        });
      }
    });
  }

  update(): void {

    this.loading = true;
    this.usuarioService.update(this.usuarioDTO)
    .subscribe( async (data) => {
        this.loading = false;
        const dataResult = data;
        
        if (dataResult.estado === 1)
        {
          await Swal.fire({
            icon: 'success',
            title: 'Se ha inscrito correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigateByUrl('inicio');
        }
        else
        {
          Swal.fire({
            icon: 'error',
            title: 'Registro no se pudo Almacenar, vuelva a intertarlo por favor',
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
