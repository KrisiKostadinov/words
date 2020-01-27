import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export class EditLevelModel {
  letters: string;
  words: string[];
  bonusWords: string[];
  maxWords: number;
}

@Component({
  selector: 'app-edit-level',
  templateUrl: './edit-level.component.html',
  styleUrls: ['./edit-level.component.css']
})
export class EditLevelComponent {
  currentWord: string;
  currentBonusWord: string;

  constructor(
    public dialogRef: MatDialogRef<EditLevelModel>,
    @Inject(MAT_DIALOG_DATA) public data: EditLevelModel) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

    removeWord(event) {
      var textWord = event.target.textContent.trim();
      const index = this.data.words.indexOf(textWord, 0);

      this.data.words.splice(index, 1);
    }

    addWords() {
      this.data.words.push(this.currentWord);
      this.currentWord = "";
    }

    addBonusWords() {
      this.data.bonusWords.push(this.currentBonusWord);
      this.currentBonusWord = "";
    }

    removeBonusWord(event) {
      var textWord = event.target.textContent.trim();
      const index = this.data.bonusWords.indexOf(textWord, 0);
      this.data.bonusWords.splice(index, 1);
    }

}