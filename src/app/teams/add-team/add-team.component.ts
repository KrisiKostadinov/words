import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TeamService } from '../services/team.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

export class AddTeam {
  team: string;
}

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent {

  teamForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddTeam>,
    @Inject(MAT_DIALOG_DATA) public data: AddTeam,
    private teamService: TeamService,
    private authService: AuthService,
    private snackBar: MatSnackBar) {
      this.teamForm = new FormGroup({
        title: new FormControl('', [Validators.required])
      });
    }

    clear() {
      this.dialogRef.close();
    }

    add() {
      if(this.teamForm.valid) {
        this.teamService.add({
          title: this.teamForm.value.title,
          creator: this.authService.user,
          participants: [this.authService.user],
          created: Date.now()
        }).then(data => {
          this.openSnackBar('Добавяне на отбора!', 'OK').afterDismissed().subscribe(() => {
            this.openSnackBar('Добавихте отбор успешно!', 'OK');
          });
        });
      }
    }

    openSnackBar(message: string, action: string) {
      return this.snackBar.open(message, action, {
        duration: 2000,
      });
    }
}