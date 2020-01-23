import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize, tap, } from 'rxjs/operators';
import { async } from '@angular/core/testing';
import { ChapterService } from 'src/app/chapters/services/chapter.service';

@Component({
  selector: 'app-upload-task-chapter',
  templateUrl: './upload-task-chapter.component.html',
  styleUrls: ['./upload-task-chapter.component.css']
})
export class UploadTaskChapterComponent implements OnInit {

  @Input()
  file: File;

  @Output() emitter = new EventEmitter<any>();

  task: AngularFireUploadTask;
  
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL;

  constructor(private st: AngularFireStorage) { }

  ngOnInit() {
    this.startUpload();
  }
  
  startUpload() {
    const path = `ChapterImages/${Date.now()}_${this.file.name}`;
    const ref = this.st.ref(path);
    this.task = this.st.upload(path, this.file);
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(async() => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        this.percentage = null;
        this.snapshot = null;
        this.emitter.emit({ downloadURL: this.downloadURL, path });
      })
      );
  }
}
