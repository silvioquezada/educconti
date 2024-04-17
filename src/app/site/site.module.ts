import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';

import { InicioComponent } from './components/inicio/inicio.component';
import { RequisitosComponent } from './components/requisitos/requisitos.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { MisCursosComponent } from './components/mis-cursos/mis-cursos.component';


@NgModule({
  declarations: [
    InicioComponent,
    RequisitosComponent,
    AcercaDeComponent,
    CategoriaComponent,
    MisCursosComponent
  ],
  imports: [
    CommonModule,
    SiteRoutingModule
  ]
})
export class SiteModule { }
