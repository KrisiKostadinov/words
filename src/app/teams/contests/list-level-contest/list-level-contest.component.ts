import { Component, OnInit } from '@angular/core';
import { LevelContest } from '../models/level-contest.model';
import { LevelContestService } from '../services/level-contest.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { EditLevelContestComponent } from '../edit-level-contest/edit-level-contest.component';
import { RemoveLevelContstComponent } from '../remove-level-contst/remove-level-contst.component';

@Component({
  selector: 'app-list-level-contest',
  templateUrl: './list-level-contest.component.html',
  styleUrls: ['./list-level-contest.component.css']
})
export class ListLevelContestComponent implements OnInit {

  levelsContest: LevelContest[];

  constructor(
    private levelContestService: LevelContestService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.levelContestService.getAll().subscribe(levels => {
      this.levelsContest = levels;
    });
  }
  
  removeLevel(levelId: string) {
    this.dialog.open(RemoveLevelContstComponent, {
      width: '700px',
      data: {
        levelId: levelId
      }
    });
  }

  editLevel(levelId) {
    this.dialog.open(EditLevelContestComponent, {
      width: '700px',
      data: {
        levelId: levelId
      }
    });
  }

  openSnackBar(message: string, action: string) {
    return this.snackBar.open(message, action);
  }

}
