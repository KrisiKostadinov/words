import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { WordsObj } from './models/wordsObj.model';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  words: any = [{word: "cat", isShow: false}, {word: "cats", isShow: false}];

  constructor(private fs: AngularFirestore) { }

  getAllWordsInLevel(id): Observable<Object> {
    console.log(id);
    return this.fs.collection("levels").doc(id).valueChanges();
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
}