import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ReportsComponent } from './components/reports/reports.component';
import { ApprovalsComponent } from './components/approvals/approvals.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserManagerListComponent } from './components/user-manager/user-manager-list/user-manager-list.component';
import { PeriodListComponent } from './components/period/period-list/period-list.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CourseListComponent } from './components/course/course-list/course-list.component';
import { ListRegistrationComponent } from './components/registrations/list-registration/list-registration.component';
import { RequirementsComponent } from './components/requirements/requirements.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'requisitos',
    component: RequirementsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuario',
    component: UserManagerListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'periodo',
    component: PeriodListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categoria',
    component: CategoryListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cursos',
    component: CourseListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'inscripciones',
    component: ListRegistrationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'aprobaciones',
    component: ApprovalsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reportes',
    component: ReportsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
