import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(public fs: AngularFirestore) { }

  getAll() {
    return this.fs.collection("levels", ref => ref.orderBy("number")).valueChanges({ idField: 'id' });
  }
}