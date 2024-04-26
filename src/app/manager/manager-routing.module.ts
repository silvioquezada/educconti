import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationsComponent } from './components/registrations/registrations.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ApprovalsComponent } from './components/approvals/approvals.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserManagerListComponent } from './components/user-manager/user-manager-list/user-manager-list.component';
import { PeriodListComponent } from './components/period/period-list/period-list.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CourseListComponent } from './components/course/course-list/course-list.component';

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
    component: PeriodListComponent
  },
  {
    path: 'categoria',
    component: CategoryListComponent
  },
  {
    path: 'cursos',
    component: CourseListComponent
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
