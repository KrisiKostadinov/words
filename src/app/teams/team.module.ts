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
import { AddLevelContestComponent } from './contests/add-level-contest/add-level-contest.component';
import { ListLevelContestComponent } from './contests/list-level-contest/list-level-contest.component';
import { LevelContestService } from './contests/services/level-contest.service';
import { EditLevelContestComponent } from './contests/edit-level-contest/edit-level-contest.component';
import { RemoveLevelContstComponent } from './contests/remove-level-contst/remove-level-contst.component';


@NgModule({
  declarations: [
    AddTeamComponent,
    AllTeamsComponent,
    AddContestComponent,
    ContestPlayComponent,
    ListContestsComponent,
    AddLevelContestComponent,
    ListLevelContestComponent,
    EditLevelContestComponent,
    RemoveLevelContstComponent
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
  providers: [ TeamService, ContestService, LevelContestService ],
  entryComponents: [ AddTeamComponent, AllTeamsComponent, AddContestComponent, ContestPlayComponent, ListContestsComponent, AddLevelContestComponent, ListLevelContestComponent, EditLevelContestComponent, RemoveLevelContstComponent ]
})
export class TeamModule { }
