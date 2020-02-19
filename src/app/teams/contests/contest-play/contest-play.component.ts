import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { AddContestComponent } from '../add-contest/add-contest.component';
import { Team } from '../../models/team.model';

export class ContestPlay {
  team: Team;
  contestId: string;
}

@Component({
  selector: 'app-contest-play',
  templateUrl: './contest-play.component.html',
  styleUrls: ['./contest-play.component.css']
})
export class ContestPlayComponent implements OnInit {
  currentWord: string = "";

  letters = ['а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'о', 'п', 'р', 'с', 'т'];
  words: Array<string> = ["дай"];

  selectedItems: Array<any> = [];
  timer: number = 20;

  constructor(public dialogRef: MatDialogRef<ContestPlay>,
    @Inject(MAT_DIALOG_DATA) public data: ContestPlay,
    private dialog: MatDialog) { }

  ngOnInit() {
    let interval = setInterval(() => {
      this.timer--;
      if(this.timer <= 0) {
        this.dialogRef.close();
        this.dialog.open(AddContestComponent, {
          width: '700px',
          data: {
            team: this.data.team
          }
        });

        clearInterval(interval);
      }
    }, 1000);
  }

  selectLetter(item, letter) {
    if(item.target.classList.contains("bg-primary")) {
      item.target.classList.remove("bg-primary");
      item.target.classList.add("bg-success");
      this.currentWord += letter;
      this.selectedItems.push(item);
    } else {
      item.target.classList.remove("bg-success");
      item.target.classList.add("bg-primary");
      const newStr = this.currentWord.replace(letter, '');
      this.currentWord = newStr;
      this.selectedItems = this.selectedItems.filter(i => i !== item);
    }
  }
  
  checkWord() {
    const isContains = this.words.includes(this.currentWord);
    this.currentWord = "";
    for(let item of this.selectedItems) {
      item.target.classList.remove("bg-success");
      item.target.classList.add("bg-primary");
    }
  }
}
