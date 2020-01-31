import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChapterService } from './services/chapter.service';
import { Subscription } from "rxjs";
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit, OnDestroy {
  chapters;
  subscription: Subscription;

  constructor(private chapterService: ChapterService, public auth: AuthService) {
  }
  
  ngOnInit() {
    this.subscription = this.chapterService.getAll().subscribe(data => {
      this.chapters = data;
      console.log(data);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}