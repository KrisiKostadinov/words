import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { ChapterService } from 'src/app/chapters/services/chapter.service';

interface filePath {
  downloadURL: string;
  path: string;
}

@Component({
  selector: 'app-add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.css']
})
export class AddChapterComponent implements OnInit {
  isHovering: boolean;

  files: File[] = [];
  filesPaths: filePath[] = [];

  chapterForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });
  errors: string[] = [];
  isSubmited: boolean = false;

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
    if(this.files && this.files.length > 0) {
      this.chapterService.add({
        name: this.chapterForm.value.name,
        photos: this.filesPaths
      }).then(data => {
        this.isSubmited = true;
        this.resetForm();
      });
    } else {
      this.errors.push('Добавете поне една картинка.');
    }
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