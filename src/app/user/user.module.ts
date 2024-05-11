import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

import { SharedModule } from '../shared/shared.module';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    SignUpComponent,
    RecoverPasswordComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UserModule { }
