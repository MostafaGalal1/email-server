import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from '../shared/email';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {  }
  
  searchMails(searchForm : object): Observable<object> {
    return this.http.post<object>('http://localhost:8080/login', searchForm);
  }

  createFolder(folderForm : object): Observable<object> {
    return this.http.post('http://localhost:8080/Email/AddFolder', folderForm);
  }

  createContact(contactForm : object): Observable<object> {
    return this.http.post<object>('http://localhost:8080/login', contactForm);
  }

  getEmails(folder : string): Observable<Email[]> {
    return this.http.get<Email[]>('http://localhost:8080/mail/' + folder);
  }

  getFolders(): Observable<string[]> {
    return this.http.post<string[]>('http://localhost:8080/Email/GetAllFolders', {"username":localStorage.getItem('currentUser')});
  }

  deleteFolder() {
    this.http.delete('http://localhost:8080/Email/DeleteFolder', {body: JSON.stringify(localStorage.getItem('currentUser'))});
  }

  sortEmails(folder : string, criteria : string): Observable<Email[]> {
    return this.http.get<Email[]>('http://localhost:8080/mail/' + folder + '/sort/' + criteria);
  }
}
