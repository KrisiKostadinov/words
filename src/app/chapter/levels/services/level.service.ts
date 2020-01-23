import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(public fs: AngularFirestore) {
  }

  addLevelToChapter(data) {
    return this.fs.collection('levels').add(data);
  }

  getLastLevel() {
      return this.fs.collection('levels', ref => ref.orderBy('number', 'desc').limit(1));
  }

  getAll(chapterId) {
    return this.fs.collection('levels', ref => ref.where('chapterId', '==', chapterId).orderBy('number')).valueChanges({ idField: "id" });
  }

  getById(id) {
    return this.fs.collection('levels').doc(id).valueChanges();
  }
  
  getAllById(chapterId) {
    return this.fs.collection(`levels`, ref => ref.where('chapterId', '==', chapterId).orderBy('number')).valueChanges({ idField: "id" });
  }

  getLevelStatistics(userId) {
    return this.fs.collection('users').doc(userId).collection('levels').valueChanges({ idField: 'id' });
  }
}
