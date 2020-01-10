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
      for(let level = 0; level < data.length; level++) {
        for(let user = 0; user < data[level]['users'].length; user++) {
          if(this.levels[level]['users'][user].userId == this.auth.userData.uid) {
            this.levels[level]['users'][user].stars = data[level]['users'][user].stars;
          } else {
            this.levels[level]['users'][user].stars = [false, false, false];
          }
        }
      }

    });
  }

  ngOnDestroy() {
  }
}
