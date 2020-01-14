import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as admin from 'firebase'

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
          this.afs.doc<User>(`profiles/${user.uid}`).valueChanges().subscribe(credential => {
            this.userData = credential;
            localStorage.setItem('user', JSON.stringify(credential));

            console.log(credential);
          });

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

    get isInAdmin(): boolean {
      if(this.isLoggedIn && this.userData) {
        console.log(this.userData);
        return this.userData.roles.admin == true;
      }

      return false;
    }

    signOut() {
      return this.af.auth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['account/login']);
      })
    }

    signInWithGoogle() {
      this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(credential => {
        this.updateUserData(credential.user);
        this.userData = credential.user;

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
        name: user.displayName
      }

      console.log(user);
      return userRef.set(data, { merge: true });
    }
}
