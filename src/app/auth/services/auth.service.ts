import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as admin from 'firebase'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;
  userId: string;
  isAdmin;

  constructor(private af: AngularFireAuth,
    private afs: AngularFirestore,
    private router:Router,
    private ngZone: NgZone) {
      
      this.af.authState.subscribe(user => {
        if (user) {
          this.user = this.afs.doc<User>(`profiles/${user.uid}`).valueChanges();
        } else {
        }
      });
    }
    
    getUserId() {
      return firebase.auth().currentUser.uid;
    }

    emailSignUp(email: string, password: string) {
      return this.af.auth.createUserWithEmailAndPassword(email, password).then(credential => {
          this.updateUserData(credential.user);
          this.router.navigate(['/']);
        })
        .catch(error => console.log(error));
    }

    emailSignIn(email: string, password: string) {
      return this.af.auth.signInWithEmailAndPassword(email, password).then(credential => {
        this.updateUserData(credential.user);
        this.router.navigate(['/']);
      });
    }

    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return (user !== null) ? true : false;
    }

    signOut() {
      return this.af.auth.signOut().then(() => {
        localStorage.clear();
        this.user = null;

        this.router.navigate(['account/login']);
      })
    }

    signInWithGoogle() {
      this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(credential => {
        this.updateUserData(credential.user);

        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
      });
    }
    
    signInWithFacebook() {
      this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(data => {
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
      });
    }

    private updateUserData(user) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`profiles/${user.uid}`);
      const data: User = {
        userId: user.uid,
        email: user.email
      }

      console.log(user);
      return userRef.set(data, { merge: true });
    }
}
