import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { LevelContest } from '../models/level-contest.model';

@Injectable({
  providedIn: 'root'
})
export class LevelContestService {

  levelsContest: AngularFirestoreCollection<LevelContest>;

  constructor(private fs: AngularFirestore) {
    this.levelsContest = this.fs.collection("levelsContest");
  }

  getByIdLevel(levelId: string) {
    return this.levelsContest.doc(levelId).valueChanges();
  }

  addLevel(level: LevelContest) {
    return this.levelsContest.add(level);
  }

  getAll() {
    return this.levelsContest.valueChanges({ idField: "id" });
  }

  removeLevel(levelId: string) {
    return this.levelsContest.doc(levelId).delete();
  }

  edit(levelId: string, level: LevelContest) {
    return this.levelsContest.doc(levelId).update(level);
  }

}
