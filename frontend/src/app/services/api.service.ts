import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from '../shared/email';

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

  createFolder(folderForm : object): Observable<object> {
    return this.http.post<object>('http://localhost:8080/login', folderForm);
  }

  createContact(contactForm : object): Observable<object> {
    return this.http.post<object>('http://localhost:8080/login', contactForm);
  }

  requestEmails(folder : string): Observable<Email[]> {
    return this.http.get<Email[]>('http://localhost:8080/mail/' + folder);
  }
}
