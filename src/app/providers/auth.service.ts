import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap, switchMap } from "rxjs/operators";
import { BehaviorSubject, from, Observable, Subject } from "rxjs";
import * as firebase from "firebase/app";
import "@codetrix-studio/capacitor-google-auth";
import { AngularFireAuth } from "@angular/fire/auth";

import { Plugins } from "@capacitor/core";
import {
  Authentication,
  User,
} from "@codetrix-studio/capacitor-google-auth/dist/esm/user";
import { IUser } from "../models/user.model";
const { Storage, GoogleAuth } = Plugins;

const TOKEN_KEY = "my-token";
const USER_KEY = "user-key";
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated = new BehaviorSubject<boolean>(null);
  token = "";
  currentUser: IUser;

  constructor(private http: HttpClient, public afAuth: AngularFireAuth) {
    this.loadFirebaseToken();
  }

  async loadFirebaseToken() {
    const data = (await Storage.get({ key: USER_KEY })).value;
    this.currentUser = JSON.parse(data);
    this.currentUser && this.isAuthenticated.next(true); //temporarily authenticate user since there's data saved in local storage.

    const isAuthenticated = this.isAuthenticated;
    this.afAuth.authState.subscribe(async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in.
        if (this.currentUser && this.currentUser.id === firebaseUser.uid) {
          isAuthenticated.next(true);
        } else {
          isAuthenticated.next(false);
        }
      } else {
        // No user is signed in.
        this.isAuthenticated.next(false);
      }
    });
  }

  login(credentials: { email; password }): Observable<any> {
    return this.http.post(`https://reqres.in/api/login`, credentials).pipe(
      map((data: any) => data.token),
      switchMap((token) => {
        return from(Storage.set({ key: TOKEN_KEY, value: token }));
      }),
      tap((_) => {
        this.isAuthenticated.next(true);
      })
    );
  }

  async googleLogin(): Promise<boolean> {
    // Storage.set({ key: TOKEN_KEY, value: 'my-jwt-token-perhaps?'});
    const googleUser = await (GoogleAuth as GoogleAuthPlugin).signIn();
    //const credential = firebase.auth.GoogleAuthProvider.credential(googleUser.authentication.idToken,googleUser.authentication.accessToken)
    const credential = firebase.auth.GoogleAuthProvider.credential(
      googleUser.authentication.idToken,
      googleUser.authentication.accessToken
    );
    this.afAuth
      .signInWithCredential(credential)
      .then(({ user }) => {
        const data: IUser = {
          id: user.uid,
          email: user.email,
          name: user.displayName,
          avatar: user.photoURL,
        };
        this.currentUser = data;
        Storage.set({ key: USER_KEY, value: JSON.stringify(data) });
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(user.uid)
          .set(data)
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
        this.isAuthenticated.next(false);
      });
    this.isAuthenticated.next(true);

    return Promise.resolve(true);
  }

  logout(): Promise<void> {
    this.afAuth.signOut();
    this.isAuthenticated.next(false);
    return Storage.remove({ key: USER_KEY });
  }
}

// Pull request still not merged
// https://github.com/CodetrixStudio/CapacitorGoogleAuth/pull/66/commits/50a2b3cb6c1552014713771e0d195bd9c033f32c
interface GoogleAuthPlugin {
  signIn(options: { value: string }): Promise<{ value: string }>;
  signIn(): Promise<User>;
  refresh(): Promise<Authentication>;
  signOut(): Promise<any>;
}
