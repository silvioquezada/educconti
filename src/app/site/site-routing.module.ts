import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { RequirementsComponent } from './components/requirements/requirements.component';
import { AboutComponent } from './components/about/about.component';
import { DetailCourseComponent } from './components/detail-course/detail-course.component';
import { AuthLoginGuard } from '../shared/guards/auth-login.guard';


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
    path: 'detalle_curso/:cod_curso',
    component: DetailCourseComponent
  },
  {
    path: 'categoria/:cod_categoria',
    component: CategoryComponent
  },
  {
    path: 'mis_cursos',
    component: MyCoursesComponent,
    canActivate: [AuthLoginGuard]
  },
  {
    path: 'requisitos',
    component: RequirementsComponent
  },
  {
    path: 'acerca_de',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
