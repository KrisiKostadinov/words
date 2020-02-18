import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTeamComponent } from './add-team/add-team.component';
import { MatInputModule, MatButtonModule, MatSnackBarModule, MatListModule, MatTooltipModule, MatProgressSpinnerModule } from '@angular/material';
import { TeamService } from './services/team.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AllTeamsComponent } from './all-teams/all-teams.component';


@NgModule({
  declarations: [
    AddTeamComponent,
    AllTeamsComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatListModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  exports: [
  ],
  providers: [ TeamService ],
  entryComponents: [ AddTeamComponent, AllTeamsComponent ]
})
export class TeamModule { }
