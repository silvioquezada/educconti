import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { LoginComponent } from './components/login/login.component';
import { RegistrateComponent } from './components/registrate/registrate.component';
import { PerfilComponent } from './components/perfil/perfil.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrateComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
