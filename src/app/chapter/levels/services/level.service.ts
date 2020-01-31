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

  editLevelToChapter(data) {
    return this.fs.collection('levels').doc(data.levelId).update(data);
  }

  removeLevel(levelId) {
    return this.fs.collection('levels').doc(levelId).delete();
  }

  getLastLevel() {
      return this.fs.collection('levels', ref => ref.orderBy('number', 'desc').limit(1));
  }

  likeLevel(levelId, userId) {
    let ref = this.fs.collection('levels').doc(levelId);

    return ref.get().subscribe(data => {
      let dataRef = data.data();
      let dislikes = dataRef.dislikes;
      let likes = dataRef.likes;
      let dislikesIndex;
      let likesIndex;

      if(dislikes.includes(userId)) {
        dislikesIndex = dislikes.indexOf(userId, 0);
        dislikes.splice(dislikesIndex, 1);
      }
      if(!likes.includes(userId)) {
        likes.push(userId);
      }

      dataRef.likes = likes;
      dataRef.dislikes = dislikes;

      ref.set({
        bonusWords: dataRef.bonusWords,
        chapterId: dataRef.chapterId,
        letters: dataRef.letters,
        likes: dataRef.likes,
        dislikes: dataRef.dislikes,
        maxWords: dataRef.maxWords,
        number: dataRef.number,
        words: dataRef.words
      });
    });
  }

  dislikeLevel(levelId, userId) {
    let ref = this.fs.collection('levels').doc(levelId);

    return ref.get().subscribe(data => {
      let dataRef = data.data();
      let dislikes = dataRef.dislikes;
      let likes = dataRef.likes;
      let dislikesIndex;
      let likesIndex;
      if(likes.includes(userId)) {
        likesIndex = likes.indexOf(userId, 0);
        likes.splice(likesIndex, 1);
      }

      if(!dislikes.includes(userId)) {
        dislikes.push(userId);
      }
      dataRef.likes = likes;
      dataRef.dislikes = dislikes;

      ref.set({
        bonusWords: dataRef.bonusWords,
        chapterId: dataRef.chapterId,
        letters: dataRef.letters,
        likes: dataRef.likes,
        dislikes: dataRef.dislikes,
        maxWords: dataRef.maxWords,
        number: dataRef.number,
        words: dataRef.words
      });
    });
  }

  checkContains(levelId, userId, typeCheck) {
    let ref = this.fs.collection('levels').doc(levelId);

    if(typeCheck == 'liked') {
      ref.get().subscribe(data => {
        let dataRef = data.data();
        let likes = dataRef.likes;
        return likes.includes(userId);
      });
    } else if(typeCheck == 'disliked') {
      ref.get().subscribe(data => {
        let dataRef = data.data();
        let dislikes = dataRef.dislikes;
        return dislikes.includes(userId);
      });
    }


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
