import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export class AddLevelModel {
  letters: string;
  words: string[];
  bonusWords: string[];
  maxWords: number;
}

@Component({
  selector: 'app-add-level',
  templateUrl: './add-level.component.html',
  styleUrls: ['./add-level.component.css']
})
export class AddLevelComponent {

  letters: string;
  words: string[] = [];
  word: string;
  bonusWord: string;
  bonusWords: string[] = [];
  maxWords: number;
  
  constructor(
    public dialogRef: MatDialogRef<AddLevelModel>,
    @Inject(MAT_DIALOG_DATA) public data: AddLevelModel) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addWordsToLevel() {
    this.data.letters = this.letters;
    this.data.words = this.words;
    this.data.bonusWords = this.bonusWords;
    this.data.maxWords = this.maxWords;
  }

  addBonusWords() {
    this.bonusWords.push(this.bonusWord);
    this.bonusWord = '';
  }

  addWords() {
    this.words.push(this.word);
    this.word = '';
  }

}
