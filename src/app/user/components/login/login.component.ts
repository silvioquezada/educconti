import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioDTO } from '../../models/usuario.dto';
import { UsuarioService } from '../../services/usuario.service';

import { finalize } from "rxjs/operators";
import { HttpErrorResponse } from '@angular/common/http';

import * as moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuarioDTO: UsuarioDTO
  usuario: FormControl;
  password: FormControl;
  loginForm: FormGroup;
  isValidForm!: boolean | null;
  loading: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    //private sharedService: SharedService,
    //private headerMenusService: HeaderMenusService,
    //private localStorageService: LocalStorageService,
    private toastr : ToastrService,
    private router: Router) {
      this.usuarioDTO = new UsuarioDTO('', '', '', '', '', '', '', '', '', '', '', '', 1, '');
      this.usuario = new FormControl(this.usuarioDTO.usuario, [
        Validators.required
      ]);
  
      this.password = new FormControl(this.usuarioDTO.password, [
        Validators.required,
        //Validators.minLength(8),
        //Validators.maxLength(16),
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
    .subscribe( async (data) => {
        this.loading = false;
        const dataResult = data;
        
        if (dataResult.estado === 1)
        {
          this.router.navigateByUrl('manager/dashboard');
        }
        else
        {
          this.toastr.error("Las credenciales son incorrectas", "INFORMACIÓN DEL SISTEMA");
        }
        
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        //console.log(error.error);
        this.toastr.error("Se ha originado un error en el servidor", "INFORMACIÓN DEL SISTEMA");
      }
    );
  }

}
