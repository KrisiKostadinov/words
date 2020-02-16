import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { ChapterService } from 'src/app/chapters/services/chapter.service';
import { Question } from '../bonus-level/models/question.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface filePath {
  downloadURL: string;
  path: string;
}

@Component({
  selector: 'app-add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.css'],
  animations: [
    trigger('chapterAnim', [
      state('open', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('closed',   style({
        opacity: 0,
        transform: 'translateY(-100px)'
      })),
      transition('open <=> closed', animate('600ms ease-out'))
    ]),
    trigger('bonusAnim', [
      state('open', style({
        opacity: 1,
        transform: 'translateY(-200px)'
      })),
      state('closed',   style({
        opacity: 0,
        transform: 'translateY(0)'
      })),
      transition('open <=> closed', animate('600ms ease-out'))
    ])
  ]
})
export class AddChapterComponent implements OnInit {

  show = false;
  closed = true;

  public get openClosed() {
    return this.show ? 'open' : 'closed';
  }
  
  public get openClosedBonusAnim() {
    return this.closed ? 'open' : 'closed';
  }

  toggleStates() {
    this.show = !this.show;
    this.closed = !this.closed;
  }

  isHovering: boolean;

  files: File[] = [];
  filesPaths: filePath[] = [];

  chapterForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });
  errors: string[] = [];
  isSubmited: boolean = false;

  questions: Question[];
  
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    console.log(files);

    for(let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  constructor(public auth: AuthService, private chapterService: ChapterService) {
  }

  ngOnInit() {
    
  }

  loadPath(data) {
    console.log(data);
    this.filesPaths.push(data);
  }

  onSubmit() {
    this.chapterService.add({
      name: this.chapterForm.value.name,
      photos: this.filesPaths,
      bonusLevel: {},
      completedLevels: [{}],
      isPlayed: false
    }).then(data => {
      this.isSubmited = true;
      this.resetForm();
    });
  }

  resetForm() {
    this.chapterForm.reset();
    this.filesPaths = [];
    this.files = [];

    setTimeout(() => {
      this.isSubmited = false;
    }, 3000);
  }
}