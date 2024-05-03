import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { RequirementsComponent } from './components/requirements/requirements.component';
import { CategoryComponent } from './components/category/category.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';

import { SharedModule } from '../shared/shared.module';
import { DetailCourseComponent } from './components/detail-course/detail-course.component';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    RequirementsComponent,
    CategoryComponent,
    MyCoursesComponent,
    DetailCourseComponent
  ],
  imports: [
    CommonModule,
    SiteRoutingModule,
    SharedModule
  ]
})
export class SiteModule { }
