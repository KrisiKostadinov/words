import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChapterService } from '../chapters/services/chapter.service';
import { Chapter } from '../level/models/chapter.model';
import { LevelService } from './levels/services/level.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit, OnDestroy {
  levels;
  
  constructor(private levelService: LevelService, public auth: AuthService) {
  }

  ngOnInit() {
    this.levelService.getAll().subscribe(data => {
      this.levels = data;
    });
  }

  ngOnDestroy() {
  }
}
