import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { LevelContestService } from '../services/level-contest.service';
import { ListLevelContestComponent } from '../list-level-contest/list-level-contest.component';

@Component({
  selector: 'app-add-level-contest',
  templateUrl: './add-level-contest.component.html',
  styleUrls: ['./add-level-contest.component.css']
})
export class AddLevelContestComponent implements OnInit {

  addLevelContestForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<any>,
    private levelContestService: LevelContestService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.addLevelContestForm = new FormGroup({
      words: new FormControl('', [Validators.required]),
      letters: new FormControl('', [Validators.required]),
    });
  }

  addLevel() {
    this.isSubmitted = true;
    const opened = this.openSnackBar("Нивото се добавя", "OK");

    this.levelContestService.addLevel({
      words: this.addLevelContestForm.value.words,
      letters: this.addLevelContestForm.value.letters
    }).then(data => {
      opened.closeWithAction();
      this.openSnackBar("Нивото беше добавено", "OK");
    });

    this.showAll();
  }

  addLevelCloseWindow() {
    this.addLevel();
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    return this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  showAll() {
    this.dialog.open(ListLevelContestComponent, {
      width: '700px'
    });
  }
}
