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
import { Group } from './models/group.model';
import { BonusLevelComponent } from './bonus-level/bonus-level.component';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit, OnDestroy {
  levels;
  displayedLevels;

  isLoading: boolean = false;
  
  groups: Group[] = [
    {
      name: "Basic",
      filters: [
        {
          filter: "Само харесани",
          number: 1
        },
        {
          filter: "Само преминати",
          number: 2
        },
        {
          filter: "Всички",
          number: 3
        },
      ]
    },
    {
      name: "Звезди",
      filters: [
        {
          filter: "1 Звезда",
          number: 4
        },
        {
          filter: "2 Звезди",
          number: 5
        },
        {
          filter: "3 Звезди",
          number: 6
        },
      ]
    }
  ];
  
  letters: string;
  words: string[] = [];
  bonusWords: string[] = [];
  maxWords: number;

  chapterId: string;

  chapter;

  isCompletedLevels: boolean = false;

  constructor(private levelService: LevelService,
    public auth: AuthService,
    private chapterService: ChapterService,
    private route: ActivatedRoute,
    private dialog: MatDialog) {
  }

  filterFunction(number) {
    if(number == 1) {
      this.displayedLevels = this.displayedLevels.filter(l => l.liked === true);
    } else if(number == 2) {
      this.displayedLevels = this.levels.filter(l => l.stars[0] === true);
    } else if(number == 3) {
      this.displayedLevels = this.levels;
    } else if(number == 4) {
      this.displayedLevels = this.levels.filter(l => l.stars[0] === true);
    } else if(number == 5) {
      this.displayedLevels = this.levels.filter(l => l.stars[1] === true);
    } else if(number == 6) {
      this.displayedLevels = this.levels.filter(l => l.stars[2] === true);
    } else {
      this.displayedLevels = this.levels;
    }
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

  back() {
    window.history.back();
  }

  gameForSeconds(level) {

  }

  likeButton(level) {
    let userId = this.auth.getUserId();
    this.levelService.likeLevel(level.id, userId);
  }

  dislikesButton(level) {
    let userId = this.auth.getUserId();
    this.levelService.dislikeLevel(level.id, userId);
  }

  bonusWindow() {
    this.dialog.open(BonusLevelComponent);
  }

  ngOnInit() {
    this.initChapter();

    this.checkBonusLevel()
  }

  checkBonusLevel() {
    let userId = JSON.parse(localStorage.getItem("user")).userId;
    let sub = this.levelService.getAll(this.chapterId).subscribe(levels => {
      sub.unsubscribe();
      let levelsCount = levels.length;
      
      sub = this.chapterService.getChapterById(this.chapterId).subscribe(chapterData => {
        sub.unsubscribe();
        let chapter = chapterData as Chapter;

        if(chapter.completedLevels) {
          let totalLevelCount = chapter.completedLevels.filter(u => u.userId === userId).length;
          if(levelsCount === totalLevelCount) {
            this.isCompletedLevels = true;
          }

        }
        console.log(chapterData);
      });
    });
  }

  initChapter() {
    var userData = JSON.parse(localStorage.getItem('user'));
    this.chapterId = this.route.snapshot.params['id'];

    this.levelService.getAll(this.chapterId).subscribe(data => {
      this.displayedLevels = data;
      let subBonus = this.chapterService.checkBonusById(this.chapterId).subscribe(data => {
        this.chapter = data;
        subBonus.unsubscribe();
      });
      
      for(let level of this.displayedLevels) {
        level.stars = [false, false, false];
      }

      if(data.length > 0) {
        this.levelService.getLevelStatistics(userData.userId).subscribe(data => {
          for(let i = 0; i < data.length; i++) {
            for(let j = 0; j < this.displayedLevels.length; j++) {
              if(data[i].id == this.displayedLevels[j].id) {
                this.displayedLevels[j].stars = data[i].stars;
              }
            }
          }
        });

        for(let i = 0; i < this.displayedLevels.length; i++) {
          this.displayedLevels[i].liked = this.isLiked(this.displayedLevels[i]);
        }
      }
      
      this.levels = this.displayedLevels;
    });
  }

  isLiked(level) {
    if(!level.likes) {
      return false;
    }

    for(let i = 0; i < level.likes.length; i++) {
      if(level.likes[i] == this.auth.getUserId()) {
        return true;
      }
    }
    return false;
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
        var number = this.displayedLevels.length + 1;
        
        this.levelService.addLevelToChapter({
          words: data.words,
          bonusWords: data.bonusWords,
          letters: data.letters,
          chapterId: this.chapterId,
          maxWords: data.maxWords,
          number: number,
          likes: [],
          dislikes: []
        }).then(data => {
          this.isLoading = false;
        });
      }
    });
  }
}