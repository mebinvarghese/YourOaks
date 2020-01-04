import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { CourseDetailPage } from './course-detail.page';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CourseDetailPage
      }
    ])
  ],
  declarations: [CourseDetailPage]
})
export class CourseDetailModule { }
