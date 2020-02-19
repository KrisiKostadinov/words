import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Contest } from '../models/contest.model';

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  contests: AngularFirestoreCollection<Contest>;

  constructor(private fs: AngularFirestore) {
    this.contests = this.fs.collection<Contest>("contests");
  }
  
  getAll() {
    return this.contests.valueChanges({ idField: 'id' });
  }

  addContest(contest: Contest) {
    return this.contests.add(contest);
  }

  removeContest(contestId: string) {
    return this.contests.doc().delete();
  }
}