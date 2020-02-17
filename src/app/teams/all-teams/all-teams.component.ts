import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { TeamService } from '../services/team.service';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';
import { AddTeamComponent } from '../add-team/add-team.component';

export class TeamList {
  teams: string;
}

@Component({
  selector: 'app-all-teams',
  templateUrl: './all-teams.component.html',
  styleUrls: ['./all-teams.component.css']
})
export class AllTeamsComponent implements OnInit {

  teams;

  constructor(public dialogRef: MatDialogRef<TeamList>,
    @Inject(MAT_DIALOG_DATA) public data: TeamList,
    private teamService: TeamService,
    private dialog: MatDialog) { }
    
    ngOnInit() {
      this.teamService.getAll().subscribe(data => {
        this.teams = data;
      });
    }

    addTeam() {
      this.dialog.open(AddTeamComponent, {
        width: '600px',
        backdropClass: 'bg-primary',
        data: {
          team: 'Нов отбор'
        }
      });
    }
}
