import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { UsuarioDTO } from '../../models/usuario.dto';
import { UsuarioService } from '../../services/usuario.service';

import { HttpErrorResponse } from '@angular/common/http';

import * as moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

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
  isValidForm!: boolean | null;
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
  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router) {

    this.usuarioDTO = new UsuarioDTO(0, '', '', '', '', '', '', '', '', '', '', '', 1, '', '');

    this.cedula = new FormControl(this.usuarioDTO.cedula, [
      this.cedulaValidator
    ]);

    this.apellido = new FormControl(this.usuarioDTO.apellido, [
      Validators.required
    ]);

    this.nombre = new FormControl(this.usuarioDTO.nombre, [
      Validators.required
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

    this.celular = new FormControl(this.usuarioDTO.celular, [
      Validators.required
    ]);

    this.correo = new FormControl(this.usuarioDTO.correo, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
    ]);

    this.nivelInstruccion = new FormControl(this.usuarioDTO.nivel_instruccion, [
      Validators.required
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
  }

  cedulaValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    this.isValidFormCedula = true;
    this.messagueCedula = '';
    let cedula = control.value;

     if(cedula.length == 10){
        
        let digito_region = cedula.substring(0,2);
        
        if( digito_region >= 1 && digito_region <=24 ){
          
          let ultimo_digito   = cedula.substring(9,10);

          let pares = parseInt(cedula.substring(1,2)) + parseInt(cedula.substring(3,4)) + parseInt(cedula.substring(5,6)) + parseInt(cedula.substring(7,8));

          let numero1 = cedula.substring(0,1);
          numero1 = (numero1 * 2);
          if( numero1 > 9 ){ numero1 = (numero1 - 9); }

          let numero3 = cedula.substring(2,3);
          numero3 = (numero3 * 2);
          if( numero3 > 9 ){ numero3 = (numero3 - 9); }

          let numero5 = cedula.substring(4,5);
          numero5 = (numero5 * 2);
          if( numero5 > 9 ){ numero5 = (numero5 - 9); }

          let numero7 = cedula.substring(6,7);
          numero7 = (numero7 * 2);
          if( numero7 > 9 ){ numero7 = (numero7 - 9); }

          let numero9 = cedula.substring(8,9);
          numero9 = (numero9 * 2);
          if( numero9 > 9 ){ numero9 = (numero9 - 9); }

          let impares = numero1 + numero3 + numero5 + numero7 + numero9;

          let suma_total = (pares + impares);

          let primer_digito_suma = String(suma_total).substring(0,1);

          let decena = (parseInt(primer_digito_suma) + 1)  * 10;

          let digito_validador = decena - suma_total;

          if(digito_validador == 10)
            digito_validador = 0;

          if(digito_validador == ultimo_digito){
            return null;
          }else{
            this.messagueCedula = 'Cédula es incorrecta';
            return { isValid: true }
          }
          
        }else{
          this.messagueCedula = 'Cédula no pertenece a ninguna region';
          return { isValid: true }
        }
     }else{
        this.messagueCedula = 'Cédula tiene menos de 10 Digitos';
        return { isValid: true }
     } 
  }

  passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    this.messaguePassword = '';
    let password2 = control.value;
    
    if(password2 === ''){
      this.messaguePassword = 'Contraseña de confirmación es requerida';
      return { isValid: true }
    }

    if (this.password.value != password2){
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
          this.cod_usuario = Number(dataResult.cod_usuario);
          this.cedula.setValue(dataResult.cedula);
          this.apellido.setValue(dataResult.apellido);
          this.nombre.setValue(dataResult.nombre);
          this.genero.setValue(dataResult.genero);
          this.etnia.setValue(dataResult.etnia);
          this.direccion.setValue(dataResult.direccion);
          this.celular.setValue(dataResult.celular);
          this.correo.setValue(dataResult.correo);
          this.nivelInstruccion.setValue(dataResult.nivel_instruccion);
          this.usuario.setValue(dataResult.usuario);
          this.password.setValue("");
          this.password2.setValue("");
          this.cedulaTemporal = dataResult.cedula;
          this.correoTemporal = dataResult.correo;
          this.usuarioTemporal = dataResult.usuario;
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
    if (this.profileForm.status == 'INVALID') {
      return;
    }

    this.isValidForm = true;
    this.isValidFormCedula = true;
    this.isValidFormEmail = true;
    this.isValidFormUser = true;
    this.usuarioDTO = this.profileForm.value;
    this.usuarioDTO.tipo_usuario = 'NORMAL';
    this.usuarioDTO.cod_usuario = this.cod_usuario;

    const promise1 = this.searchCedula().then();
    const promise2 = this.searchEmail().then();
    const promise3 = this.searchUser().then();
    Promise.all([promise1, promise2, promise3])
    .then(() => {
      if(this.isValidFormCedula && this.isValidFormEmail && this.isValidFormUser) {
        this.save();
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
        title: 'Error enla conexión intente mas tarde',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  searchCedula() {
    this.loading = true;
    return new Promise((resolve, reject) => {

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
          this.isValidFormCedula = false;
          Swal.fire({
            icon: 'error',
            title: 'Error enla conexión intente mas tarde',
            showConfirmButton: false,
            timer: 1500
          });
          reject(false);
        });
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
          this.isValidFormEmail = false;
          Swal.fire({
            icon: 'error',
            title: 'Error enla conexión intente mas tarde',
            showConfirmButton: false,
            timer: 1500
          });
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
          this.isValidFormUser = false;
          Swal.fire({
            icon: 'error',
            title: 'Error enla conexión intente mas tarde',
            showConfirmButton: false,
            timer: 1500
          });
          reject(false);
        });
      }
    });
  }

  save(): void {

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
