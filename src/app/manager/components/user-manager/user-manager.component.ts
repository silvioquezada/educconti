import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ManagerDTO } from '../../models/manager.dto';
import { ManagerService } from '../../services/manager.service';

import { HttpErrorResponse } from '@angular/common/http';

import * as moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  managerDTO: ManagerDTO;
  managersDTO: ManagerDTO[];
  cedula: FormControl;
  apellido: FormControl;
  nombre: FormControl;
  celular: FormControl;
  correo: FormControl;
  usuario: FormControl;
  password: FormControl;
  password2: FormControl;
  signUpForm: FormGroup;
  isValidForm!: boolean | null;
  isValidFormCedula: boolean;
  isValidFormEmail: boolean;
  isValidFormUser: boolean;
  messagueCedula: string = '';
  messagueEmail: string = '';
  messaguePassword: string = '';
  loading: boolean = false;

  filterpost = "";
  page = 1;
  count = 0;
  pagesize = 5;

  constructor(private formBuilder: FormBuilder, private managerService: ManagerService, private router: Router) {

    this.managerDTO = new ManagerDTO(0, '', '', '', '', '', '', 1, '', '');

    this.apellido = new FormControl(this.managerDTO.apellido, [
      Validators.required
    ]);

    this.nombre = new FormControl(this.managerDTO.nombre, [
      Validators.required
    ]);

    this.celular = new FormControl(this.managerDTO.celular, [
      Validators.required
    ]);

    this.correo = new FormControl(this.managerDTO.correo, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
    ]);


    this.usuario = new FormControl(this.managerDTO.usuario, [
      Validators.required
    ]);

    this.password = new FormControl(this.managerDTO.password, [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]).{8,}$/)
    ]);

    this.password2 = new FormControl('', [
      this.passwordValidator
    ]);

    this.signUpForm = this.formBuilder.group({
      cod_usuario : moment().unix().toString(),
      apellido: this.apellido,
      nombre: this.nombre,
      celular: this.celular,
      correo: this.correo,
      usuario: this.usuario,
      password: this.password,
      password2: this.password2
    });
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
    this.listUserManager();
  }

  listUserManager(): void {
    this.loading = true;

    this.managerService.listUserManager()
    .subscribe( (data) => {
        this.loading = false;
        this.managersDTO = data;
        //console.log(this.managersDTO);
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

  signUp() {
    this.isValidForm = false;
    if (this.signUpForm.status == 'INVALID') {
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
    this.managerDTO = this.signUpForm.value;
    this.managerDTO.tipo_usuario = 'NORMAL';

    const promise2 = this.searchEmail().then();
    const promise3 = this.searchUser().then();
    Promise.all([promise2, promise3])
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

  searchEmail() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.managerService.searchEmail(this.correo.value)
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
    });
  }

  searchUser() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.managerService.searchUser(this.usuario.value)
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
    });
  }

  save(): void {

    this.loading = true;

    this.managerService.save(this.managerDTO)
    .subscribe( async (data) => {
        this.loading = false;
        const dataResult = data;
        
        if (dataResult.estado === 1)
        {
          await Swal.fire({
            icon: 'success',
            title: 'Se ha registrado correctamente',
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

  keyFilter() {
    this.page = 1;
  }

  handlePageChange(event: number): void {
    this.page = event;
  }

}
