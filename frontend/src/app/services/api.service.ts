import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email, emailToSend } from '../shared/email';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {  }
  
  searchEmails(searchForm : object): Observable<object> {
    return this.http.post<object>('http://localhost:8080/login', searchForm);
  }

  createFolder(folderForm : object): Observable<object> {
    return this.http.post('http://localhost:8080/Email/AddFolder', folderForm);
  }

  createContact(contactForm : object): Observable<object> {
    return this.http.post<object>('http://localhost:8080/Email/AddContact', contactForm);
  }

  editContact(contactForm : object): Observable<object> {
    return this.http.post<object>('http://localhost:8080/Email/EditContact', contactForm);
  }

  getEmails(folder : string, criterion : string): Observable<object> {
    return this.http.post<object>('http://localhost:8080/Email/GetFolderEmails' ,  {"username":localStorage.getItem('currentUser'), "folderName":folder, "sortOption": criterion});
  }

  moveEmails(folder : string, emails : string[]): Observable<object> {
    return this.http.post<object>('http://localhost:8080/Email/GetFolderEmails' ,  {"username":localStorage.getItem('currentUser'), "folderName":folder, "mails": emails});
  }

  restoreEmails(): Observable<object> {
    return this.http.post<object>('http://localhost:8080/Email/GetFolderEmails' ,  {"username":localStorage.getItem('currentUser')});
  }

  getFolders(): Observable<string[]> {
    return this.http.post<string[]>('http://localhost:8080/Email/GetAllFolders', {"username":localStorage.getItem('currentUser')});
  }

  getContacts(): Observable<object> {
    return this.http.post<object>('http://localhost:8080/Email/GetAllContacts', {"username":localStorage.getItem('currentUser')});
  }

  deleteContact(contactName:String): Observable<Object> {
    return this.http.delete<Object>('http://localhost:8080/Email/DeleteContact', {body: {"username":localStorage.getItem('currentUser'),"contactName":contactName}});
  }

  //editContact(oldName:String, newName:String, mails:string[]): Observable<Object> {
  //  return this.http.post<Object>('http://localhost:8080/Email/RenameFolder', {"username":localStorage.getItem('currentUser'),"oldName":oldName,"newName":newName, "addresses":mails});
  //}

  deleteFolder(folderName:String): Observable<Object> {
    return this.http.delete<Object>('http://localhost:8080/Email/DeleteFolder', {body: {"username":localStorage.getItem('currentUser'),"folderName":folderName}});
  }

  editFolder(oldName:String, newName:String): Observable<Object> {
    return this.http.post<Object>('http://localhost:8080/Email/RenameFolder', {"username":localStorage.getItem('currentUser'),"oldName":oldName,"newName":newName});
  }

  sortEmails(folder : string, criteria : string): Observable<Email[]> {
    return this.http.get<Email[]>('http://localhost:8080/mail/' + folder + '/sort/' + criteria);
  }

  sendEmail(email:emailToSend): Observable<Object> {
    return this.http.post<Object>('http://localhost:8080/Email/SendEmail', email);
  }

}