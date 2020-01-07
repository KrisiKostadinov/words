import { Component, OnInit } from '@angular/core';
import { ChapterService } from '../chapters/services/chapter.service';
import { Chapter } from '../level/models/chapter.model';
import { LevelService } from './levels/services/level.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {
  levels: any;
  
  constructor(private levelService: LevelService) {
  }

  ngOnInit() {
    this.levels = this.levelService.getAll();
  }
}