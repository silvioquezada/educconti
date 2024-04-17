import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { RequirementsComponent } from './components/requirements/requirements.component';
import { AboutComponent } from './components/about/about.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: HomeComponent
  },
  {
    path: 'categoria',
    component: CategoryComponent
  },
  {
    path: 'mis_cursos',
    component: MyCoursesComponent
  },
  {
    path: 'requisitos',
    component: RequirementsComponent
  },
  {
    path: 'acerca_de',
    component: AboutComponent
    //canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
