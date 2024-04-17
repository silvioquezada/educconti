import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { RequirementsComponent } from './components/requirements/requirements.component';
import { CategoryComponent } from './components/category/category.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    RequirementsComponent,
    CategoryComponent,
    MyCoursesComponent
  ],
  imports: [
    CommonModule,
    SiteRoutingModule
  ]
})
export class SiteModule { }
