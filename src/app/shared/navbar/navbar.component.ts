import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatDialog } from '@angular/material';
import { AddTeamComponent } from 'src/app/teams/add-team/add-team.component';
import { AllTeamsComponent } from 'src/app/teams/all-teams/all-teams.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  constructor(public auth: AuthService, private dialog: MatDialog) {
  }
  
  ngOnInit() {
  }
  
  logout() {
    this.auth.signOut();
  }

  allTeams() {
    this.dialog.open(AllTeamsComponent, {
      width: '600px',
      backdropClass: 'bg-primary',
      data: {
        teams: 'Всички отбори'
      }
    });
  }
}