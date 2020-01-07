import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Chapter } from '../../level/models/chapter.model';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(public fs: AngularFirestore) {
    
  }

  add(data) {
    return this.fs.collection("chapters").add(data);
  }
  
  getAll() {
    return this.fs.collection("chapters").valueChanges({ idField: "id" });
  }
}
