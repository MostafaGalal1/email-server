import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(loginForm : object) {
    return this.http.post('http://localhost:8080/Email/LogIn', loginForm).pipe(
      map((user:any) => {
        if (user.state === "success") {
          localStorage.setItem('currentUser', user["data"]);
        }
        return user;
      }));
  }

  signup(signupForm : object) {
    return this.http.put('http://localhost:8080/Email/SignUp', signupForm).pipe(
      map((user:any) => {
        if (user.state === "success") {
          localStorage.setItem('currentUser', user["data"]);
        }
        return user;
      }));
  }

  logout() {
      localStorage.removeItem('currentUser');
  }
}