import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export class EditLevelModel {
  levelNumber: number;
}

@Component({
  selector: 'app-remove-level',
  templateUrl: './remove-level.component.html',
  styleUrls: ['./remove-level.component.css']
})
export class RemoveLevelComponent {

  constructor(dialogRef: MatDialogRef<EditLevelModel>,
    @Inject(MAT_DIALOG_DATA) public data: EditLevelModel) { }

}
