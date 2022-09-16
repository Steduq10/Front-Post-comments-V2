import { Injectable } from '@angular/core';
import { Auth, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth) { }

  logInWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider())
  }
}
