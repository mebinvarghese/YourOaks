import { NgModule } from '@angular/core';
import { MenuPage } from './menu.page';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [MenuPage],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MenuPage,
        children: [
          { path: '', loadChildren: '../home/home.module#HomePageModule' },
          { path: 'course-detail/:chapterid/:topicid', loadChildren: '../course-detail/course-detail.module#CourseDetailModule' }
        ]
      }
    ])
  ]
})
export class MenuPageModule { }
