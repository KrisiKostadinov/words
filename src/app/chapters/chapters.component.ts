import { Component, OnInit } from '@angular/core';
import { ChapterService } from './services/chapter.service';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {
  chapters: any;

  constructor(private chapterService: ChapterService) {
  }
  
  ngOnInit() {
    this.chapters = this.chapterService.getAll();
  }

}
