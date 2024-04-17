import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { RequisitosComponent } from './components/requisitos/requisitos.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { MisCursosComponent } from './components/mis-cursos/mis-cursos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'categoria',
    component: CategoriaComponent
  },
  {
    path: 'mis_cursos',
    component: MisCursosComponent
  },
  {
    path: 'requisitos',
    component: RequisitosComponent
  },
  {
    path: 'acerca_de',
    component: AcercaDeComponent
    //canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
