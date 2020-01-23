import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChapterService } from '../chapters/services/chapter.service';
import { Chapter } from '../level/models/chapter.model';
import { LevelService } from './levels/services/level.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddLevelComponent, AddLevelModel } from '../add-level/add-level.component';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit, OnDestroy {
  levels;
  
  letters: string;
  words: string[] = [];
  bonusWords: string[] = [];
  maxWords: number;

  chapterId: string;

  constructor(private levelService: LevelService,
    public auth: AuthService,
    private route: ActivatedRoute,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.initChapter();
  }

  initChapter() {
    var userData = JSON.parse(localStorage.getItem('user'));
    this.chapterId = this.route.snapshot.params['id'];

    
    this.levelService.getAll(this.chapterId).subscribe(data => {
      this.levels = data;
      console.log(data);
      if(data.length > 0) {
        this.levelService.getLevelStatistics(userData.userId).subscribe(data => {
          console.log(data);
          for(let i = 0; i < data.length; i++) {
            for(let j = 0; j < this.levels.length; j++) {
              if(data[i].id == this.levels[j].id) {
                this.levels[j].stars = data[j].stars;
              }
            }
          }


        });
      }
    });
  }

  ngOnDestroy() {
  }

  addLevel() {
    let dialogRef = this.dialog.open(AddLevelComponent, {
      width: '400px',
      data: {
        letters: this.letters,
        words: this.words
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        var number = this.levels.length + 1;
        
        this.levelService.addLevelToChapter({
          words: data.words,
          bonusWords: data.bonusWords,
          letters: data.letters,
          chapterId: this.chapterId,
          maxWords: data.maxWords,
          number: number,
          stars: 0
        });
      }
    });
  }
}