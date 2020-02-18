import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Team } from '../models/team.model';
import { merge } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teams: AngularFirestoreCollection<Team>;

  constructor(private fs: AngularFirestore) {
    this.teams = this.fs.collection<Team>("teams");
  }
  
  getAll() {
    return this.teams.valueChanges({ idField: 'id' });
  }

  add(team: Team) {
    return this.teams.add(team);
  }

  addToTeam(team, id) {
    return this.teams.doc(id).update({
      title: team.title,
      creator: team.creator,
      participants: team.participants,
      created: team.created
    });
  }

  removeToTeam(team, id) {
    return this.teams.doc(id).update({
      title: team.title,
      creator: team.creator,
      participants: team.participants,
      created: team.created
    });
  }

  removeTeam(id) {
    return this.teams.doc(id).delete();
  }

}
