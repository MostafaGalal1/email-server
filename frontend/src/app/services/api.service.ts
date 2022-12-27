import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {  }

  createAccount(signupForm : object): Observable<object> {
    return this.http.put<object>('http://localhost:8080/signup', signupForm);
  }
  
  validateLogin(loginForm : object): Observable<object> {
    return this.http.post<object>('http://localhost:8080/login', loginForm);
  }

  searchMails(searchForm : object): Observable<object> {
    return this.http.post<object>('http://localhost:8080/login', searchForm);
  }

  createFolder(folderForm : object): Observable<object> {
    return this.http.post<object>('http://localhost:8080/login', folderForm);
  }

  createContact(contactForm : object): Observable<object> {
    return this.http.post<object>('http://localhost:8080/login', contactForm);
  }
}
