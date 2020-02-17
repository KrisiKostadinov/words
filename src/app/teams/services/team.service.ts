import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teams: AngularFirestoreCollection<Team>;

  constructor(private fs: AngularFirestore) {
    this.teams = this.fs.collection<Team>("teams");
  }
  
  getAll() {
    return this.teams.valueChanges();
  }

  add(team: Team) {
    return this.teams.add(team);
  }
}
