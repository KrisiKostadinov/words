import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { WordsObj } from '../models/wordsObj.model';
import { Chapter } from '../../models/chapter.model';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  words: any = [{word: "cat", isShow: false}, {word: "cats", isShow: false}];

  constructor(private fs: AngularFirestore) { }

  getAllWordsInLevel(id) {
    return this.fs.collection<WordsObj>("levels").doc(id).valueChanges();
  }

  getNextLevel(number) {
    return this.fs.collection("levels").valueChanges({ idField: 'id' });
  }

  checkWord(currentWord) {
    console.log();

    for(let word of this.words) {
      if(word.word == currentWord && word.isShow == false) {
        word.isShow = true;
        return { 
          success: true,
          isExist: false 
        };
      } else if(word.word == currentWord && word.isShow == true) {
        return {
          success: false,
          isExist: true
        }
      }
    }

    return {
      success: false,
      isExist: false
    };
  }

  getWordById(id) {
    return this.fs.collection(`words${id}`);
  }

  saveData(userId, levelId, data) {
    return this.fs.collection("users").doc(userId).collection("levels").doc(levelId).set(data);
  }

  getChapterById(chapterId, userId) {
    return this.fs.collection("users").doc(userId).collection("chapters").doc(chapterId).valueChanges();
  }

  saveLevel(levelId, chapterId, userId) {
    let sub = this.fs.collection("chapters").doc(chapterId).valueChanges().subscribe(data => {
      sub.unsubscribe();
      let isExist = false;
      for(let ob of data["completedLevels"]) {
        if(ob.levelId == levelId && ob.userId == userId) {
          isExist = true;
        }
      }

      if(!isExist) {
        data["completedLevels"].push({
          userId: userId,
          levelId: levelId
        });
      }

      this.fs.collection("chapters").doc(chapterId).set(data);
    });
  }
}