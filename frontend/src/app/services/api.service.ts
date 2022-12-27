import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {  }

  createAccount(signupForm : object): Observable<string> {
    return this.http.put<string>('http://localhost:8080/Email/SignUp', signupForm);
  }
  
  validateLogin(loginForm : object): Observable<string> {
    return this.http.post<string>('http://localhost:8080/Email/LogIn', loginForm);
  }

  searchMails(searchForm : object): Observable<object> {
    return this.http.post<object>('http://localhost:8080/login', searchForm);
  }
}
