import { DomElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Email } from 'src/app/shared/email';
import { MailComponent } from '../mail.component';

@Component({
  selector: 'app-compose-box',
  templateUrl: './compose-box.component.html',
  styleUrls: ['./compose-box.component.css']
})
export class ComposeBoxComponent implements OnInit {
  to : string ="";
  subject : string ="fgtg";
  message : string ="";
  priority : string = '';
  file : File[] = [];
  email : Email = {id:"",
    recievers:[],
    sender:"",
    date:new Date(),
    body:"",
    subject:"",
    file :[]
  };

  constructor() { }
  
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
    this.email.recievers = this.to.split(", ");
    this.email.subject = this.subject;
    this.email.file = this.file;
    console.log(this.email);
    //request the send 
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
    this.email.recievers = this.to.split(", ");
    this.email.subject = this.subject;
    this.email.file = this.file;
    console.log(this.email);
    //request the save to draft  
  }

  upload(file2 : any){
    console.log(file2.files);
    this.file = file2.files;
  }

}
