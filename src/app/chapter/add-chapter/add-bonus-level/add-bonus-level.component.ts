import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Question } from '../../bonus-level/models/question.model';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Answer } from '../../bonus-level/models/answer.model';

@Component({
  selector: 'app-add-bonus-level',
  templateUrl: './add-bonus-level.component.html',
  styleUrls: ['./add-bonus-level.component.css']
})
export class AddBonusLevelComponent implements OnInit {

  myForm: FormGroup;

  @Output() addQuestionEmitter = new EventEmitter<any>();
  
  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      answers: this.fb.array([])
    })
  }
  
  get answers() {
    return this.myForm.get('answers') as FormArray
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.myForm.controls[controlName].hasError(errorName);
  }

  
  public touched = (controlName) =>{
    return this.myForm.controls[controlName].touched;
  }

  addQuestion() {
    const question = this.myForm.value;
    
    this.addQuestionEmitter.emit(question);

    this.myForm.reset();

    this.answers.clear();
  }

  // addAnswerByIndex(i) {
  //   this.questions[i].answers.push({
  //     content: this.answerForm.value.content,
  //     isCorrected: this.answerForm.value.isCorrected
  //   });

  //   this.answerForm.reset();
  // }
  
  addAnswer() {
  
    const answer = this.fb.group({ 
      content: [],
      isCorrected: []
    })
  
    this.answers.push(answer);
  }
  
  deleteAnswer(i) {
    this.answers.removeAt(i)
  }
}