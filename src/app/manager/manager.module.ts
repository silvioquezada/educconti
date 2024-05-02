import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ManagerRoutingModule } from './manager-routing.module';
import { RegistrationsComponent } from './components/registrations/registrations.component';
import { ApprovalsComponent } from './components/approvals/approvals.component';
import { ReportsComponent } from './components/reports/reports.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FilterUsuarioPipe } from './pipes/filter-usuario.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

import { SharedModule } from '../shared/shared.module';
import { UserManagerFormComponent } from './components/user-manager/user-manager-form/user-manager-form.component';
import { UserManagerListComponent } from './components/user-manager/user-manager-list/user-manager-list.component';
import { UserManagerSearchComponent } from './components/user-manager/user-manager-search/user-manager-search.component';
import { PeriodFormComponent } from './components/period/period-form/period-form.component';
import { PeriodListComponent } from './components/period/period-list/period-list.component';
import { PeriodSearchComponent } from './components/period/period-search/period-search.component';
import { CategoryFormComponent } from './components/category/category-form/category-form.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategorySearchComponent } from './components/category/category-search/category-search.component';
import { CourseFormComponent } from './components/course/course-form/course-form.component';
import { CourseListComponent } from './components/course/course-list/course-list.component';
import { CourseSearchComponent } from './components/course/course-search/course-search.component';
import { FilterPeriodPipe } from './pipes/filter-period.pipe';
import { FilterCategoryPipe } from './pipes/filter-category.pipe';
import { FilterCoursePipe } from './pipes/filter-course.pipe';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    RegistrationsComponent,
    ApprovalsComponent,
    ReportsComponent,
    DashboardComponent,
    FilterUsuarioPipe,
    UserManagerFormComponent,
    UserManagerListComponent,
    UserManagerSearchComponent,
    PeriodFormComponent,
    PeriodListComponent,
    PeriodSearchComponent,
    CategoryFormComponent,
    CategoryListComponent,
    CategorySearchComponent,
    CourseFormComponent,
    CourseListComponent,
    CourseSearchComponent,
    FilterPeriodPipe,
    FilterCategoryPipe,
    FilterCoursePipe
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    FormsModule,
    CKEditorModule
  ]
})
export class ManagerModule { }
