import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { LevelContestService } from '../services/level-contest.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { LevelContest } from '../models/level-contest.model';
import { ListLevelContestComponent } from '../list-level-contest/list-level-contest.component';

export class EditContest {
  levelId: string;
}

@Component({
  selector: 'app-edit-level-contest',
  templateUrl: './edit-level-contest.component.html',
  styleUrls: ['./edit-level-contest.component.css']
})
export class EditLevelContestComponent implements OnInit {

  editLevelContestForm: FormGroup;
  level;
  
  constructor(public dialogRef: MatDialogRef<EditContest>,
    @Inject(MAT_DIALOG_DATA) public data: EditContest,
    private levelContestService: LevelContestService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    const levelId = this.data.levelId;
    this.levelContestService.getByIdLevel(levelId).subscribe(data => {
      this.level = data as LevelContest
      this.editLevelContestForm = new FormGroup({
        words: new FormControl(this.level.words, [Validators.required]),
        letters: new FormControl(this.level.letters, [Validators.required]),
      });
    });
  }
  
  editLevel() {
    const opened = this.openSnackBar("Редактиране на нивото", "OK");

    this.levelContestService.edit(this.data.levelId, {
      words: this.editLevelContestForm.value.words,
      letters: this.editLevelContestForm.value.letters
    }).then(() => {
      this.openSnackBar("Нивото беше редактирано успешно", "OK");
      this.showAll();
    });
  }

  openSnackBar(message: string, action: string) {
    return this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  showAll() {
    this.dialogRef.close();
  }

}
