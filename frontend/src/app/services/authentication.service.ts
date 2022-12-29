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
    return this.http.post('http://localhost:8080/login', loginForm).pipe(
      map((user:any) => {
        console.log(localStorage.getItem('currentUser'));
        if (user.state === "success") {
          localStorage.setItem('currentUser', user["data"]);
        }
      }));
  }

  signup(loginForm : object) {
    return this.http.post('http://localhost:8080/signup', loginForm).pipe(
      map((user:any) => {
        console.log(localStorage.getItem('currentUser'));
        if (user.state === "success") {
          localStorage.setItem('currentUser', user["data"]);
        }
      }));
  }

  logout() {
      localStorage.removeItem('currentUser');
  }
}