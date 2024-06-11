import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ManagerDTO } from 'src/app/manager/models/manager.dto';
import { ManagerService } from 'src/app/manager/services/manager.service';
import { UsuarioService } from 'src/app/user/services/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
declare var $:any;

@Component({
  selector: 'app-user-manager-form',
  templateUrl: './user-manager-form.component.html',
  styleUrls: ['./user-manager-form.component.scss']
})
export class UserManagerFormComponent implements OnInit {
  @Output() dataSend: EventEmitter<any> = new EventEmitter<any>();
  title: string = "";
  managerDTO: ManagerDTO;
  cod_usuario: number = 0;
  apellido: FormControl;
  nombre: FormControl;
  celular: FormControl;
  correo: FormControl;
  usuario: FormControl;
  password: FormControl;
  password2: FormControl;
  registerForm: FormGroup;
  isValidForm!: boolean | null;
  isValidFormEmail: boolean;
  isValidFormUser: boolean;
  messagueEmail: string = '';
  messaguePassword: string = '';
  correoTemporal: string = '';
  usuarioTemporal: string = '';
  loading: boolean = false;
  ban: boolean = true;
  textButton: string = '';

  filterpost = "";
  page = 1;
  count = 0;
  pagesize = 5;

  constructor(private formBuilder: FormBuilder, private managerService: ManagerService, private router: Router, private usuarioService: UsuarioService) {
    this.formNormal();
  }

  formNormal() : void {
    this.title = "Nuevo Registro";
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

    this.registerForm = this.formBuilder.group({
      apellido: this.apellido,
      nombre: this.nombre,
      celular: this.celular,
      correo: this.correo,
      usuario: this.usuario,
      password: this.password,
      password2: this.password2
    });

    this.cod_usuario = Number(moment().unix().toString());

    this.isValidForm = true;
    this.isValidFormEmail = true;
    this.isValidFormUser = true;
    this.ban = true;
    this.textButton = 'Guardar';
  }

  assignValues(managerDTO: ManagerDTO): void {
    this.title = "Editar Registro";
    this.cod_usuario = Number(managerDTO.cod_usuario);
    this.apellido.setValue(managerDTO.apellido);
    this.nombre.setValue(managerDTO.nombre);
    this.celular.setValue(managerDTO.celular);
    this.correo.setValue(managerDTO.correo);
    this.usuario.setValue(managerDTO.usuario);
    this.password.setValue("");
    this.password2.setValue("");
    this.correoTemporal = managerDTO.correo;
    this.usuarioTemporal = managerDTO.usuario;
    this.ban = false;
    this.textButton = 'Actualizar';
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
    this.isValidFormEmail = true;
    this.isValidFormUser = true;
  }

  register() {
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
    this.isValidFormEmail = true;
    this.isValidFormUser = true;
    this.managerDTO = this.registerForm.value;
    this.managerDTO.tipo_usuario = 'GESTOR';
    this.managerDTO.cod_usuario = this.cod_usuario;

    const promise1 = this.searchEmail().then();
    const promise2 = this.searchUser().then();
    Promise.all([promise1, promise2])
    .then(() => {
      if(this.isValidFormEmail && this.isValidFormUser) {
        if(this.ban) {
          this.save();
        } else {
          this.update();
        }
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

  searchEmail() {
    this.loading = true;
    return new Promise((resolve, reject) => {

      if(this.correoTemporal === this.correo.value && this.ban === false) {
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
            title: 'Error en la conexión intente mas tarde',
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
      if(this.usuarioTemporal === this.usuario.value && this.ban === false) {
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
            title: 'Error en la conexión intente mas tarde',
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
    this.managerService.saveManager(this.managerDTO)
    .subscribe( async (data) => {
        this.loading = false;
        const dataResult = data;
        
        if (dataResult.estado === 1)
        {
          await Swal.fire({
            icon: 'success',
            title: 'Se ha creado el registrado satisfactoriamente',
            showConfirmButton: false,
            timer: 1500
          });
          $("#modalForm").modal("hide");
          this.dataSend.emit();
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

  update(): void {
    this.loading = true;
    this.managerService.updateManager(this.managerDTO)
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
          $("#modalForm").modal("hide");
          this.dataSend.emit();
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

  keyFilter() {
    this.page = 1;
  }

  handlePageChange(event: number): void {
    this.page = event;
  }

}