import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioDTO } from '../../models/usuario.dto';
import { UsuarioService } from '../../services/usuario.service';

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
  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    //private sharedService: SharedService,
    //private headerMenusService: HeaderMenusService,
    //private localStorageService: LocalStorageService,
    private router: Router) {
      this.usuarioDTO = new UsuarioDTO('', '', '', '', '', '', '', '', '', '', '', '', 1, '');
      this.usuario = new FormControl('', [
        Validators.required
      ]);
  
      this.password = new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
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

    this.router.navigateByUrl('manager/dashboard');
  }

}
