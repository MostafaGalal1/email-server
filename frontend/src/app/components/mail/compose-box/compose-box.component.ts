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
  static subject : string ="";
  static message : string ="";
  static priority : string = '';
  private formData: FormData = new FormData;
  file : File[] = [];

  email : emailToSend = {
    sender :"",
    receivers:[],
    body:"",
    subject:"",
    priority : 2,
    id : -1,
    attachments : new FormData
  };

  static to : string = "" ;
  static id :number = -1;

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
    this.email.subject = (<HTMLInputElement>document.getElementById("subject-message"))!.value;
    this.email.id = ComposeBoxComponent.id;
    this.email.attachments = this.formData;
    this.email.sender =  localStorage.getItem('currentUser') + "";
    console.log(this.email);

    this.apiService.sendEmail(this.email).subscribe();
    ComposeBoxComponent.id = -1;
    MailComponent.compose = false;
  } 

  saveToDraft(){

    this.email.priority = parseInt( (<HTMLInputElement>document.getElementById("priority")).value);
    if((<HTMLInputElement>document.getElementById("priority")).value == "choose priority" ){
      this.email.priority = 2;
    }
    this.email.body = (<HTMLInputElement>document.getElementById("message")).value;
    this.email.receivers =(<HTMLInputElement>document.getElementById("to")).value.split(", ");
    this.email.subject = (<HTMLInputElement>document.getElementById("subject-message"))!.value;
    this.email.sender =  localStorage.getItem('currentUser')+ "";
    this.email.id = ComposeBoxComponent.id;


    this.email.attachments = this.formData;

    console.log(this.email.attachments)
    MailComponent.compose = false;
    this.apiService.saveToDraft(this.email).subscribe();
    ComposeBoxComponent.id = -1;
  }
  
  upload(file2 : any){
    let currentInput = file2.files;
    if (currentInput.length === 0) {
      return
    }
    
    console.log(currentInput);
    for (let i = 0 ; i < currentInput.length; i++){
      let file = currentInput[i];
      let fileName = file.name;
      let regex = new RegExp('[^.]+$');
      let extension = fileName.match(regex);

      if (currentInput[0] == null) {
        return
      }
      this.formData.append("files", file);
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