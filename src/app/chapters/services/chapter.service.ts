import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Chapter } from '../../level/models/chapter.model';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(public fs: AngularFirestore) {
    
  }

  checkBonusById(chapterId) {
    return this.fs.collection('chapters').doc(chapterId).valueChanges();
  }

  add(data) {
    return this.fs.collection("chapters").add(data);
  }
  
  getAll() {
    return this.fs.collection<Chapter>("chapters").valueChanges({ idField: "id" });
  }

  addBonusLevel(chapterId, chapter) {
    return this.fs.collection(`chapters`).doc(chapterId).set(chapter);
  }
  
  getChapterById(chapterId) {
    return this.fs.collection<Chapter>(`chapters`).doc(chapterId).valueChanges();
  }
}