import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ManagerRoutingModule } from './manager-routing.module';
import { PeriodComponent } from './components/period/period.component';
import { CategoryComponent } from './components/category/category.component';
import { CourseComponent } from './components/course/course.component';
import { RegistrationsComponent } from './components/registrations/registrations.component';
import { ApprovalsComponent } from './components/approvals/approvals.component';
import { ReportsComponent } from './components/reports/reports.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserManagerComponent } from './components/user-manager/user-manager.component';
import { FilterUsuarioPipe } from './pipes/filter-usuario.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PeriodComponent,
    CategoryComponent,
    CourseComponent,
    RegistrationsComponent,
    ApprovalsComponent,
    ReportsComponent,
    DashboardComponent,
    UserManagerComponent,
    FilterUsuarioPipe
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    FormsModule
  ]
})
export class ManagerModule { }
