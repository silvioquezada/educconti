import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { UsuarioDTO } from '../../models/usuario.dto';
import { UsuarioService } from '../../services/usuario.service';

import * as moment from 'moment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  usuarioDTO: UsuarioDTO
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
  signUpForm: FormGroup;
  isValidForm!: boolean | null;
  messagueCedula: string = "";
  messaguePassword: string = "";
  loading: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    //private sharedService: SharedService,
    //private headerMenusService: HeaderMenusService,
    //private localStorageService: LocalStorageService,
    private router: Router) {

    this.usuarioDTO = new UsuarioDTO('', '', '', '', '', '', '', '', '', '', '', '', 1, '');

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

    this.signUpForm = this.formBuilder.group({
      cod_usuario : moment().unix().toString(),
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
  }

  login(): void {
    this.isValidForm = false;
    if (this.signUpForm.status == 'INVALID') {
      return;
    }

    this.isValidForm = true;
    this.usuarioDTO = this.signUpForm.value;
    this.save();
    
  }

  
  save(): void {

    this.loading = true;

    this.usuarioService.save(this.usuarioDTO).subscribe( (data : any) =>
    {
        this.loading = false;
        this.router.navigateByUrl('home');
/*
        if (data.estado == true)
        {
          //this.formularioNormal();
          //this.toastr.success("Registro Almacenado Satisfactoriamente", "INFORMACIÓN DEL SISTEMA");
        }
        else
        {
          //this.toastr.error("Registro no se pudo Almacenar, vuelva a intertarlo por favor", "INFORMACIÓN DEL SISTEMA");
        }
        */
      }, err => {
        //this.toastr.error(this.error.getClienteStatus(err.status), "INFORMACIÓN DEL SISTEMA");
        this.loading = false;
      
    });
  }
}
