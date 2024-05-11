import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioDTO } from '../../models/usuario.dto';
import { UsuarioService } from '../../services/usuario.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { HeaderMenus } from 'src/app/shared/models/header-menus.dto';
import { AccessService } from 'src/app/shared/services/access.service';
import { RecoverPasswordComponent } from '../recover-password/recover-password.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(RecoverPasswordComponent) recoverPasswordComponent: any;
  usuarioDTO: UsuarioDTO
  usuario: FormControl;
  password: FormControl;
  loginForm: FormGroup;
  isValidForm!: boolean | null;
  loading: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private accessservice: AccessService) {
      this.usuarioDTO = new UsuarioDTO(0, '', '', '', '', '', '', '', '', '', '', '', 1, '', '');
      this.usuario = new FormControl(this.usuarioDTO.usuario, [
        Validators.required
      ]);
  
      this.password = new FormControl(this.usuarioDTO.password, [
        Validators.required
      ]);

      this.loginForm = this.formBuilder.group({
        usuario: this.usuario,
        password: this.password,
      });
    }

  ngOnInit(): void {
  }

  login(): void {
    this.isValidForm = false;
    if (this.loginForm.status=='INVALID') {
      return;
    }

    this.isValidForm = true;
    this.usuarioDTO = this.loginForm.value;
    this.verify();
  }

  verify(): void {

    this.loading = true;

    this.usuarioService.login(this.usuarioDTO)
    .subscribe( (data) => {
        this.loading = false;
        const dataResult = data;
        
        if (dataResult.estado === 1)
        {
          this.localStorageService.saveData("usuario", dataResult.usuario);
          this.localStorageService.saveData("tipo_usuario", dataResult.tipo_usuario);
          this.localStorageService.saveData("token", dataResult.token);
          this.localStorageService.saveData("estado_sesion", "true");
          
          if(dataResult.tipo_usuario==="NORMAL") {
            const headerInfo: HeaderMenus = {
              status_manager: false,
              status_normal: true
            };
            this.accessservice.headerManagement.next(headerInfo);
            this.router.navigateByUrl('inicio');
            Swal.fire({
              icon: 'success',
              title: 'Bienvenido a Educconti',
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            const headerInfo: HeaderMenus = {
              status_manager: true,
              status_normal: true
            };
            this.accessservice.headerManagement.next(headerInfo);
            this.router.navigateByUrl('manager/dashboard');
          }
        }
        else
        {
          Swal.fire({
            icon: 'error',
            title: 'Las credenciales son incorrectas',
            showConfirmButton: false,
            timer: 1500
          });
        }
        
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        //console.log(error.error);
        Swal.fire({
          icon: 'error',
          title: 'Se ha originado un error en el servidor',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  recoverPassword(): void {
    this.recoverPasswordComponent.formNormal();
  }

}
