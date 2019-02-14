import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";

import { User } from "./user.model";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userLogged: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  user: User = {} as User;

  constructor(
    private router: Router,
    private http: HttpClient,
    private fireAtuh: AngularFireAuth
  ) {
    this.userLogged = this.fireAtuh.authState;
    this.userLogged.subscribe(user => {
      user ? (this.userDetails = user) : (this.userDetails = null);
    });
  }

  loginWithEmail(user: User) {
    const {email, password} = user;
    const userCredentials = firebase.auth.EmailAuthProvider.credential(email, password);
    return this.fireAtuh.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.fireAtuh.auth.signOut().then(res => this.router.navigate(["login"]));
  }

  isLoggedIn(): Boolean {
    if (this.userDetails == null) return false;
    
    return true;
  }

}
