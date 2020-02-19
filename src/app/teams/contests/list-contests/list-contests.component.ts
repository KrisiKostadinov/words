import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Contest } from '../models/contest.model';
import { ContestService } from '../services/contest.service';
import { ContestPlayComponent } from '../contest-play/contest-play.component';
import { Team } from '../../models/team.model';

export class ContestList {
  team: Team;
}

@Component({
  selector: 'app-list-contests',
  templateUrl: './list-contests.component.html',
  styleUrls: ['./list-contests.component.css']
})
export class ListContestsComponent implements OnInit {

  contests: Contest[];

  constructor(
    private dialogRef: MatDialogRef<any>,
    private contestService: ContestService,
    @Inject(MAT_DIALOG_DATA) public data: ContestList,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.contestService.getAll().subscribe(data => {
      this.contests = data;
    });
  }

  joinToContest(contestId) {
    console.log(contestId, this.data.team);

    this.dialog.open(ContestPlayComponent, {
      width: '700px',
      data: {
        team: this.data.team,
        contestId: contestId
      }
    });
  }
  
}
