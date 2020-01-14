import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(private af: AngularFireAuth,
    private afs: AngularFirestore,
    private router:Router,
    private ngZone: NgZone) {
      this.af.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      });
    }

    emailSignUp(email: string, password: string) {
      return this.af.auth.createUserWithEmailAndPassword(email, password).then(credential => {
          this.updateUserData(credential.user);
          this.router.navigate(['/']);
        })
        .catch(error => console.log(error));
    }

    emailSignIn(email: string, password: string) {
      return this.af.auth.signInWithEmailAndPassword(email, password).then(() => {
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
        email: user.email,
        roles: {
          admin: false,
          user: true
        },
        name: user.displayName
      }

      console.log(user);
      return userRef.set(data, { merge: true });
    }
}
