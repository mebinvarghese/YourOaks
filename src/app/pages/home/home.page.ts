import { Component, OnInit, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';

import { LoadingController, Content } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  segment: string;
  page: number;
  chapters: any[] = [];
  @ViewChild(Content) content: Content;

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.onTabSelected('hottest');
    this.http.get('assets/jsons/chapters.json').subscribe(res => {
      console.log(res);
      this.chapters = res['chapters'];
      this.chapters.forEach((chapter, i) => {
        if (i === 0) {
          chapter.open = true;
        } else {
          chapter.open = false;
        }
      })
    });
  }

  toggleSection(idx) {
    this.chapters[idx].open = !this.chapters[idx].open;
  }

  onTabSelected(segmentValue: string) {
    this.segment = segmentValue;
    this.page = 1;
    this.content.scrollToTop();
  }

  // onSearch() {
  //   this.router.navigate(['search']);
  // }



}
