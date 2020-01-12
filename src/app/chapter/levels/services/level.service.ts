import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(public fs: AngularFirestore) {
  }

  getAll(chapterId) {
    return this.fs.collection('levels', ref => ref.where('chapterId', '==', chapterId).orderBy('number')).valueChanges({ idField: "id" });
  }

  getById(id) {
    return this.fs.collection('levels').doc(id).valueChanges();
  }

  getLevelStatistics(userId) {
    return this.fs.collection('users').doc(userId).collection('levels').valueChanges({ idField: 'id' });
  }
}
