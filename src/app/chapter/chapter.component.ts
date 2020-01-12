import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChapterService } from '../chapters/services/chapter.service';
import { Chapter } from '../level/models/chapter.model';
import { LevelService } from './levels/services/level.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit, OnDestroy {
  levels;
  
  constructor(private levelService: LevelService, public auth: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    var userData = JSON.parse(localStorage.getItem('user'));
    var chapterId = this.route.snapshot.params['id'];

    this.levelService.getAll(chapterId).subscribe(data => {
      this.levels = data;
      this.levelService.getLevelStatistics(userData.uid).subscribe(data => {
        for(let i = 0; i < data.length; i++) {
          for(let j = 0; j < this.levels.length; j++) {
            if(data[i].id == this.levels[j].id) {
              this.levels[j].stars = data[j].stars;
            }
          }
        }
      });
    });
  }

  ngOnDestroy() {
  }
}
