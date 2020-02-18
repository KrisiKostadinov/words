import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { TeamService } from '../services/team.service';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';
import { AddTeamComponent } from '../add-team/add-team.component';
import { AuthService } from 'src/app/auth/services/auth.service';

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
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }
    
    ngOnInit() {
      this.teamService.getAll().subscribe(data => {
        this.teams = data as Array<Team>;
        for(let team of this.teams) {
          team.addedUser = this.checkContainsUser(team, this.authService.user);
          team.isMyTeam = this.checkCreatorTeam(team, this.authService.user.userId);
        }
      });
    }

    checkCreatorTeam(team: Team, userId) {
      return team.creator.userId === userId;
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

    removeTeam(index) {
      const team = this.teams[index] as Team;
      const user = this.authService.user;

      if(team.isMyTeam) {
        const opened = this.openSnackBar("Премахване на отбора", "OK");
        this.teamService.removeTeam(team.id).then(() => {
          opened.closeWithAction();

          this.openSnackBar("Премахването на отбора е успешно", "OK");
        });
      }
    }

    addToTeam(index) {
      const team = this.teams[index] as Team;
      const user = this.authService.user;

      const isContains = this.checkContainsUser(team, user);

      if(!isContains) {
        team.participants.push(user);
        const opened = this.openSnackBar(`Добавяне към отбора ${team.title}`, "OK")
        this.teamService.addToTeam(team, team.id).then(data => {
          opened.closeWithAction();
          this.openSnackBar("Добавихте се към отбора успешно!", "OK");
        });
      }
    }

    removeToTeam(index) {
      const team = this.teams[index] as Team;
      const user = this.authService.user;

      team.participants = team.participants.filter(u => u.userId !== user.userId);
      const opened = this.openSnackBar(`Напускане на отбора ${team.title}`, "OK");
      this.teamService.removeToTeam(team, team.id).then(data => {
        opened.closeWithAction();
        this.openSnackBar("Напуснахте на отбора успешно!", "OK");
      });
    }

    checkContainsUser(team, user) {
      const isContains = team.participants.filter(u => u.userId === user.userId) as Array<Team>;
      if(isContains.length === 0) {
        return false;
      } else {
        return true;
      }
    }

    openSnackBar(message: string, action: string) {
      return this.snackBar.open(message, action, {
        duration: 2000,
      });
    }

}
