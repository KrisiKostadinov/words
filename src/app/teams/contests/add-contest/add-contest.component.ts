import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { Team } from '../../models/team.model';
import { ContestPlayComponent } from '../contest-play/contest-play.component';
import { ListContestsComponent } from '../list-contests/list-contests.component';
import { Contest } from '../models/contest.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ContestService } from '../services/contest.service';
import { User } from 'firebase';

export class AddContest {
  team: Team;
}

@Component({
  selector: 'app-add-contest',
  templateUrl: './add-contest.component.html',
  styleUrls: ['./add-contest.component.css']
})
export class AddContestComponent implements OnInit {
  isStart: boolean = false;
  constructor(public dialogRef: MatDialogRef<AddContest>,
    @Inject(MAT_DIALOG_DATA) public data: AddContest,
    private dialog: MatDialog,
    private auth: AuthService,
    private contestService: ContestService,
    private snackBar: MatSnackBar) {
    
  }

  ngOnInit() {

  }

  showContests() {
    this.dialog.open(ListContestsComponent, {
      width: '700px',
      data: {
        team: this.data.team
      }
    });
  }

  startContest() {
    this.isStart = true;
    const opened = this.openSnackBar("Състезанието се създава", "OK");
    const user = this.auth.user as User;

    this.contestService.addContest({
      creator: user,
      players: [user],
      wordsConut: 2,
      teamId: this.data.team.id
    }).then(data => {
      opened.closeWithAction();
      this.openSnackBar("Състезанието беше създадено успешно!", "OK");
    })

    // if(this.isStart) {
    //   this.dialog.open(ContestPlayComponent, {
    //     width: '700px',
    //     data: {
    //       team: this.data.team
    //     }
    //   });
    // }

    // this.dialogRef.close();
  }

  endContest() {
    const user = this.auth.user as User;
    this.isStart = false;
  }

  openSnackBar(message, action) {
    return this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: 'bg-primary'
    });
  }

}
