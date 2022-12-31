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
  to : string ="";
  subject : string ="";
  message : string ="";
  priority : string = '';
  file : File[] = [];
  email : emailToSend = {
    sender :"",
    receivers:[],
    body:"",
    subject:"",
    priority : 2
  };

  constructor(private apiService : ApiService, private http : HttpClient) { }
  
  ngOnInit(): void {
    console.log(this.subject);
  }
  
  send(){
    this.to = (<HTMLInputElement>document.getElementById("to")).value;
    this.subject = (<HTMLInputElement>document.getElementById("subject-message")).value;
    this.message = (<HTMLInputElement>document.getElementById("message")).value;
    this.priority = (<HTMLInputElement>document.getElementById("priority")).value
    if(this.priority == "choose priority" ){
      this.priority = "2";
    }
    this.email.body = this.message;
    this.email.receivers = this.to.split(", ");
    this.email.subject = this.subject;
    this.email.priority = parseInt( this.priority);
    this.email.sender =  localStorage.getItem('currentUser')+ "";
    console.log(this.email);
    this.apiService.sendEmail(this.email).subscribe({});
    MailComponent.compose = false;
  } 

  saveToDraft(){
    this.to = (<HTMLInputElement>document.getElementById("to")).value;
    this.subject = (<HTMLInputElement>document.getElementById("subject-message")).value;
    this.message = (<HTMLInputElement>document.getElementById("message")).value;
    this.priority = (<HTMLInputElement>document.getElementById("priority")).value
    if(this.priority == "choose priority" ){
      this.priority = "2";
    }
    this.email.body = this.message;
    this.email.receivers = this.to.split(", ");
    this.email.subject = this.subject;
    this.email.priority = parseInt( this.priority);
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

}
