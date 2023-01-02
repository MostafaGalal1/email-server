import { DomElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Email, emailToSend } from 'src/app/shared/email';
import { MailComponent } from '../mail.component';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-compose-box',
  templateUrl: './compose-box.component.html',
  styleUrls: ['./compose-box.component.css']
})
export class ComposeBoxComponent implements OnInit {
  attachment : FormData = new FormData; 

  static subject : string ="";
  static message : string ="";
  static priority : string = '';
  file : File[] = [];
  email : emailToSend = {
    sender :"",
    receivers:[],
    body:"",
    subject:"",
    priority : 2
  };
  static to : string = "" ;

  constructor(private apiService : ApiService, private http : HttpClient) { }
  
  ngOnInit(): void {
    console.log(ComposeBoxComponent.subject);
  }
  
  send(){

    this.email.priority = parseInt( (<HTMLInputElement>document.getElementById("priority")).value);
    if((<HTMLInputElement>document.getElementById("priority")).value == "choose priority" ){
      this.email.priority = 2;
    }
    this.email.body = (<HTMLInputElement>document.getElementById("message")).value;
    this.email.receivers =(<HTMLInputElement>document.getElementById("to")).value.split(", ");
    this.email.subject = (<HTMLInputElement>document.getElementById("subject-message")).value;

    this.email.sender =  localStorage.getItem('currentUser')+ "";
    console.log(this.email);
    this.apiService.sendEmail(this.email).subscribe({});
    MailComponent.compose = false;
  } 

  saveToDraft(){

    this.email.priority = parseInt( (<HTMLInputElement>document.getElementById("priority")).value);
    if((<HTMLInputElement>document.getElementById("priority")).value == "choose priority" ){
      this.email.priority = 2;
    }
    this.email.body = (<HTMLInputElement>document.getElementById("message")).value;
    this.email.receivers =(<HTMLInputElement>document.getElementById("to")).value.split(", ");
    this.email.subject = (<HTMLInputElement>document.getElementById("subject")).value;
    this.email.sender =  localStorage.getItem('currentUser')+ "";
    console.log(this.email);
    MailComponent.compose = false;

    //request the save to draft
  }
  
  upload(file2 : any){
    console.log(file2.files);
    this.file = file2.files;
    for(var i = 0 ;i < this.file.length ; i++){
      this.attachment.append("file" , this.file[i]);
    }
  }
  get getto(){
    return ComposeBoxComponent.to;
  }

  get getpriority(){
    return ComposeBoxComponent.priority;
  }

  get getsubject(){
    return ComposeBoxComponent.subject;
  }

  get getmessage(){
    return ComposeBoxComponent.message;
  }
}