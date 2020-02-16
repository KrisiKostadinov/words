import { Component, OnInit, Inject } from '@angular/core';
import { Question } from '../../bonus-level/models/question.model';
import { ChapterService } from 'src/app/chapters/services/chapter.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StatusLevel } from '../../bonus-level/models/status.model';
import { Chapter } from 'src/app/level/models/chapter.model';

export class DialogData {
  chapterId: string;
}

@Component({
  selector: 'app-bonus-level-play',
  templateUrl: './bonus-level-play.component.html',
  styleUrls: ['./bonus-level-play.component.css']
})
export class BonusLevelPlayComponent implements OnInit {

  timeOut: boolean;
  seconds: number = 60;

  dataMiliSeconds: number = 1000;
  
  chapter;

  bonusLevel;

  saved: boolean;
  isPlay: boolean;
  isEnd: boolean;

  question: Question;

  currentIndex = 0;

  status: StatusLevel = new StatusLevel();
  correctAnswers: number = 0;
  incorrectAnswers: number = 0;
  points: number = 0;
  pointsOfAnswer: number = 10;

  constructor(
    private chapterService: ChapterService,
    public dialogRef: MatDialogRef<DialogData>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    let sub = this.chapterService.getChapterById(this.data.chapterId).subscribe(data => {
      sub.unsubscribe();
      this.bonusLevel = data["bonusLevel"];
      this.chapter = data;
      if(this.bonusLevel) {
        this.nextQuestion();
      }
    });
  }

  play() {
    this.isPlay = true;
    this.startTimer();
  }

  startTimer() {
    let interval = setInterval(() => {
      this.seconds--;
      if(this.seconds == 0 && this.isPlay) {
        this.timeOut = true;
        this.end();
        clearInterval(interval);
      }
    }, 1000);
  }

  checkAnswer(i) {
    if(this.question.answers[i].isCorrected) {
      this.points += this.pointsOfAnswer;
      this.correctAnswers++;
    } else {
      this.incorrectAnswers++;
    }

    this.nextQuestion();
  }

  nextQuestion() {
    console.log(this.question, this.bonusLevel, this.currentIndex);

    if(this.currentIndex < this.bonusLevel.length) {
      this.question = this.bonusLevel[this.currentIndex];
    } else {
      this.end();
    }
    this.currentIndex++;
  }

  end() {
    this.isEnd = true;
    this.isPlay = false;
    this.setDataAfterSeconds(this.dataMiliSeconds);
  }

  setDataAfterSeconds(dataMiliSeconds) {
    setTimeout(() => {
      this.status.points = this.points;
      this.status.correctAnswers = this.correctAnswers;
      this.status.incorrectAnswers = this.incorrectAnswers;
    }, dataMiliSeconds);
  }

  saveLevel() {
    this.saved = true;
    this.chapter.isPlayed = true;
    this.chapterService.updateBonusLevel(this.data.chapterId, this.chapter).then(data => {
      if(data == undefined) {
        this.saved = false;
      }
    });
  }

}