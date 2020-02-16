import { Component, OnInit, Input } from '@angular/core';
import { Question } from './models/question.model';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ChapterService } from 'src/app/chapters/services/chapter.service';
import { Chapter } from 'src/app/level/models/chapter.model';

export class SelectChapter {
  name: string;
  id: string;
}

@Component({
  selector: 'app-bonus-level',
  templateUrl: './bonus-level.component.html',
  styleUrls: ['./bonus-level.component.css']
})
export class BonusLevelComponent implements OnInit {

  stepParent = 0;
  isLoading: boolean = false;

  step = 0;

  questions: Question[] = [];
  answerForm;

  chapters: Chapter[];
  chapterId: string;
  
  constructor(private fb: FormBuilder, private chapterService: ChapterService) { }

  ngOnInit() {
    this.answerForm = this.fb.group({
      content: new FormControl('', [Validators.required]),
      isCorrected: false
    })

    let sub = this.chapterService.getAll().subscribe(data => {
      this.chapters = data;
      sub.unsubscribe();
    });
  }

  selectId(chapterId) {
    this.chapterId = chapterId;
  }

  addBonusLevel() {
    this.isLoading = true;
    let bonusData = this.questions;
    let sub = this.chapterService.getChapterById(this.chapterId).subscribe(chapter => {
      sub.unsubscribe();
      chapter['bonusLevel'] = bonusData;
      chapter['isPlayed'] = false;
      
      this.chapterService.addBonusLevel(this.chapterId, chapter).then(data => {
        this.isLoading = false;
      });
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.answerForm.controls[controlName].hasError(errorName);
  }

  
  public touched = (controlName) =>{
    return this.answerForm.controls[controlName].touched;
  }

  addAnswerByIndex(i) {
    this.questions[i].answers.push({
      content: this.answerForm.value.content,
      isCorrected: this.answerForm.value.isCorrected
    });

    this.answerForm.reset();
  }

  deleteAnswerByIndex(i, j) {
    this.questions[i].answers.splice(j, 1);
  }

  addQuestionData($event) {
    this.questions.push($event);
  }
  
  deleteQuestion(i) {
    this.questions.splice(i, 1);
  }

  setStepParent(index: number) {
    this.stepParent = index;
  }

  nextStepParent() {
    this.stepParent++;
  }

  prevStepParent() {
    this.stepParent--;
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
