import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { Email, emailToSend } from '../shared/email';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {  }
  
  searchEmails(folder : string, criterion : string, searchForm : object): Observable<object> {
    return this.http.post<object>('http://localhost:8080/Email/SearchInFolder', {"username":localStorage.getItem('currentUser'), "folderName":folder, "sortOption": criterion, "searchForm":searchForm});
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

  moveEmail(folder : string, email : string): Observable<object> {
    return this.http.post<object>('http://localhost:8080/Email/MoveEmail' ,  {"username":localStorage.getItem('currentUser'), "folderName":folder, "id": email});
  }

  moveToTrash(emailID : string): Observable<object> {
    return this.http.post<object>('http://localhost:8080/Email/MoveToTrash' ,  {"username":localStorage.getItem('currentUser'), "id": emailID});
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

  deleteFolder(folderName:String) : Observable<Object> {
    return this.http.delete<Object>('http://localhost:8080/Email/DeleteFolder', {body: {"username":localStorage.getItem('currentUser'),"folderName":folderName}});
  }

  deleteEmail(emailID : String) : Observable<Object> {
    return this.http.delete<Object>('http://localhost:8080/Email/DeleteEmail', {body: {"username":localStorage.getItem('currentUser'), "id":emailID}});
  }

  restoreEmail(emailID : string): Observable<Object> {
    return this.http.post<Object>('http://localhost:8080/Email/RestoreEmail', {"username":localStorage.getItem('currentUser'), "id":emailID});
  }

  editFolder(oldName:String, newName:String): Observable<Object> {
    return this.http.post<Object>('http://localhost:8080/Email/RenameFolder', {"username":localStorage.getItem('currentUser'),"oldName":oldName,"newName":newName});
  }

  sortEmails(folder : string, criteria : string): Observable<Email[]> {
    return this.http.get<Email[]>('http://localhost:8080/Email/' + folder + '/sort/' + criteria);
  }

  async sendEmail(formData : FormData) {
    alert(JSON.stringify(formData))
  formData.append("zbsddgdy", "file");
    let formDataObject = Object.fromEntries(formData.entries());
  // Format the plain form data as JSON
  let formD = JSON.stringify(formDataObject);
  let fetchOptions = {
    //HTTP method set to POST.
    method: "POST",
    //Set the headers that specify you're sending a JSON body request and accepting JSON response
    headers: {
      "Content-Type": "multipart/form-data"
    },
    // POST request body as JSON string.
    body: formD,
  };
    let res = await fetch('http://localhost:8080/Email/SendEmail',fetchOptions);
    console.log(res)
  }

  saveToDraft(email:emailToSend): Observable<Object> {
    return this.http.post<Object>('http://localhost:8080/Email/SaveToDraft', email);
  }

}