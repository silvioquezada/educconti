import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { UserComponent } from './components/user/user.component';
import { PeriodComponent } from './components/period/period.component';
import { CategoryComponent } from './components/category/category.component';
import { CourseComponent } from './components/course/course.component';
import { RegistrationsComponent } from './components/registrations/registrations.component';
import { ApprovalsComponent } from './components/approvals/approvals.component';
import { ReportsComponent } from './components/reports/reports.component';


@NgModule({
  declarations: [
    UserComponent,
    PeriodComponent,
    CategoryComponent,
    CourseComponent,
    RegistrationsComponent,
    ApprovalsComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }
