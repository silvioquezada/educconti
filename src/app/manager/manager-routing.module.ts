import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeriodComponent } from './components/period/period.component';
import { UserComponent } from './components/user/user.component';
import { CategoryComponent } from './components/category/category.component';
import { CourseComponent } from './components/course/course.component';
import { RegistrationsComponent } from './components/registrations/registrations.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ApprovalsComponent } from './components/approvals/approvals.component';

const routes: Routes = [
  {
    path: 'usuario',
    component: UserComponent
  },
  {
    path: 'periodo',
    component: PeriodComponent
  },
  {
    path: 'categoria',
    component: CategoryComponent
  },
  {
    path: 'cursos',
    component: CourseComponent
  },
  {
    path: 'inscripciones',
    component: RegistrationsComponent
  },
  {
    path: 'aprobaciones',
    component: ApprovalsComponent
  },
  {
    path: 'reportes',
    component: ReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
