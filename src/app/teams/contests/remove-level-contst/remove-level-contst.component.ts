import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { LevelContestService } from '../services/level-contest.service';

export class RemoveContest {
  levelId: string;
}

@Component({
  selector: 'app-remove-level-contst',
  templateUrl: './remove-level-contst.component.html',
  styleUrls: ['./remove-level-contst.component.css']
})
export class RemoveLevelContstComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RemoveContest>,
    @Inject(MAT_DIALOG_DATA) public data: RemoveContest,
    private levelContestService: LevelContestService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  
  removeLevel() {
    const levelId = this.data.levelId;
    const opened = this.openSnackBar("Изтриване на нивото", "OK");
    this.levelContestService.removeLevel(levelId).then(data => {
      opened.closeWithAction();
      this.openSnackBar("Нивото е изтрито", "OK");
      this.closeWindow();
    });
  }

  openSnackBar(message, action) {
    return this.snackBar.open(message, action, {
      duration: 2000
    });
  }
  
  closeWindow() {
    this.dialogRef.close();
  }
}
