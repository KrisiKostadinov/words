import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTeamComponent } from './add-team/add-team.component';
import { MatInputModule, MatButtonModule, MatSnackBarModule, MatListModule, MatTooltipModule, MatProgressSpinnerModule, MatIconModule } from '@angular/material';
import { TeamService } from './services/team.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AllTeamsComponent } from './all-teams/all-teams.component';
import { AddContestComponent } from './contests/add-contest/add-contest.component';
import { ContestPlayComponent } from './contests/contest-play/contest-play.component';
import { ListContestsComponent } from './contests/list-contests/list-contests.component';
import { ContestService } from './contests/services/contest.service';


@NgModule({
  declarations: [
    AddTeamComponent,
    AllTeamsComponent,
    AddContestComponent,
    ContestPlayComponent,
    ListContestsComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatListModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatIconModule
  ],
  exports: [
  ],
  providers: [ TeamService, ContestService ],
  entryComponents: [ AddTeamComponent, AllTeamsComponent, AddContestComponent, ContestPlayComponent, ListContestsComponent ]
})
export class TeamModule { }
