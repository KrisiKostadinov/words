import { Component, OnInit, OnDestroy, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ChapterService } from '../chapters/services/chapter.service';
import { Chapter } from '../level/models/chapter.model';
import { LevelService } from './levels/services/level.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddLevelComponent } from './levels/services/add-level/add-level.component';
import { EditLevelComponent } from './levels/services/edit-level/edit-level.component';
import { RemoveLevelComponent } from './levels/services/remove-level/remove-level.component';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit, OnDestroy {
  levels;
  isLoading: boolean = false;

  @ViewChildren("settings") private settings: QueryList<ElementRef>;
  
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

  editLevel(level) {
    let dialogRef = this.dialog.open(EditLevelComponent, {
      width: '400px',
      data: {
        editLevelNumber: level.number,
        words: level.words,
        bonusWords: level.bonusWords,
        letters: level.letters,
        levelId: level.id
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.levelService.editLevelToChapter(data);
      }
    });
  }
  
  removeLevel(level) {
    var dialog = this.dialog.open(RemoveLevelComponent, {
      width: '600px',
      data: {
        levelNumber: level.number,
        levelId: level.id
      }
    });
    dialog.afterClosed().subscribe(data => {
      if(data) {
        this.isLoading = true;
        this.levelService.removeLevel(data.levelId).then(data => {
          this.isLoading = false;
        });
      }
    });
  }

  isShowSettings(index) {
    let nativeElement = this.settings.toArray()[index].nativeElement;
    console.log(nativeElement);
    nativeElement.style.display =
      nativeElement.style.display === "none" || !nativeElement.style.display
        ? "block"
        : "none";
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
        this.isLoading = true;
        var number = this.levels.length + 1;
        
        this.levelService.addLevelToChapter({
          words: data.words,
          bonusWords: data.bonusWords,
          letters: data.letters,
          chapterId: this.chapterId,
          maxWords: data.maxWords,
          number: number,
          stars: 0
        }).then(data => {
          this.isLoading = false;
        });
      }
    });
  }
}