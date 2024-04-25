import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeriodComponent } from './components/period/period.component';
import { CategoryComponent } from './components/category/category.component';
import { CourseComponent } from './components/course/course.component';
import { RegistrationsComponent } from './components/registrations/registrations.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ApprovalsComponent } from './components/approvals/approvals.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserManagerListComponent } from './components/user-manager/user-manager-list/user-manager-list.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'usuario',
    component: UserManagerListComponent
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
