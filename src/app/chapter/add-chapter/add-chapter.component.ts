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
    name: new FormControl('', Validators.required),
    img: new FormControl(null, [Validators.required])
  });
  
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for(let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  constructor(public auth: AuthService, private fs: AngularFireStorage, private chapterService: ChapterService) {
  }

  ngOnInit() {
    
  }

  loadPath(data) {
    this.filesPaths.push(data);
  }

  onSubmit() {
    this.chapterService.add({
      name: this.chapterForm.value.name,
      photos: this.filesPaths
    });
    this.resetForm();
  }

  resetForm() {
    this.chapterForm.reset();
    this.files = null;
    this.filesPaths = null;
  }
}