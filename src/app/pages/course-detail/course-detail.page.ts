import { Component, OnInit, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';

import { LoadingController, Content, NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-course-detail',
  templateUrl: 'course-detail.page.html',
  styleUrls: ['course-detail.page.scss']
})
export class CourseDetailPage implements OnInit {

  segment: string;
  page: number;
  chapters: any[] = [];
  questions: any[] = [];
  @ViewChild(Content) content: Content;
  safeUrl: any;
  chapterId: any;
  topicId: any;
  questionRecieved = false;

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    public sanitizer: DomSanitizer, private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.chapterId = this.route.snapshot.paramMap.get('chapterid');
    this.topicId = this.route.snapshot.paramMap.get('topicid');
    console.log(this.chapterId, this.topicId);
    this.getVideoSafeUrl();
  }
  get approchedQuestion(): boolean {
    return this.questions.filter(x => x.approched).length === this.questions.length;
  }
  getVideoSafeUrl() {
    this.http.get('assets/jsons/chapters.json').subscribe(res => {
      this.chapters = res['chapters'];
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.chapters[this.chapterId - 1].topics[this.topicId - 1].video);
      setTimeout(() => {
        this.getQuestionAboutVideos();
      }, 3000);
    });
  }
  getQuestionAboutVideos() {
    this.http.get('assets/jsons/question.json').subscribe(res => {
      const questionsList = res['questions'];
      console.log(questionsList);
      this.questions = questionsList.filter(question => question.topicId == this.topicId);
      console.log(this.questions);
      this.questionRecieved = true;
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
