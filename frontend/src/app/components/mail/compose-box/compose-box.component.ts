import { DomElementSchemaRegistry } from '@angular/compiler';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EmailValidator, FormArray, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Email } from 'src/app/shared/email';
import { MailComponent } from '../mail.component';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-compose-box',
  templateUrl: './compose-box.component.html',
  styleUrls: ['./compose-box.component.css']
})
export class ComposeBoxComponent implements OnInit, OnChanges {
  @Input() currentID : number = -1;
  protected emailToSend : FormData;

  protected emailForm = this.formBuilder.group({
    sender: localStorage.getItem("currentUser"),
    receivers: this.formBuilder.array([]),
    body: "",
    subject: "",
    priority : 0,
    id : -1,
    date: new Date()
  });

  static id :number = -1;
  static to : string = "" ;
  static subject : string ="";
  static message : string ="";
  static priority : number = 0;

  constructor(private apiService : ApiService, private http : HttpClient, private formBuilder : FormBuilder) {
    this.emailToSend = new FormData();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
    if (!changes['currentID'].firstChange){
      (<FormArray>this.emailForm.get('receivers')).clear();
      let receiversArray = ComposeBoxComponent.to.split(", ");
      this.emailForm.get("id")?.setValue(ComposeBoxComponent.id);
      this.emailForm.get("subject")?.setValue(ComposeBoxComponent.subject);
      for (let i = 0; i < receiversArray.length; i++){
        (<FormArray>this.emailForm.get('receivers')).push(this.formBuilder.control(receiversArray[i]));
      }
      this.emailForm.get("body")?.setValue(ComposeBoxComponent.message);
      this.emailForm.get("priority")?.setValue(ComposeBoxComponent.priority);
    }
  }

  send(){
    (<FormArray>this.emailForm.get('receivers')).clear();
    let receiversArray = (<HTMLInputElement>document.getElementById("to")).value.split(", ");
    for (let i = 0; i < receiversArray.length; i++){
      (<FormArray>this.emailForm.get('receivers')).push(this.formBuilder.control(receiversArray[i]));
    }

    this.emailToSend.append("mail", JSON.stringify(this.emailForm.value));
    console.log(this.emailForm.value);
    this.apiService.sendEmail(this.emailToSend).subscribe();

    this.emailToSend = new FormData();
    MailComponent.compose = false;
  }

  saveToDraft(){
    (<FormArray>this.emailForm.get('receivers')).clear();
    let receiversArray = (<HTMLInputElement>document.getElementById("to")).value.split(", ");
    for (let i = 0; i < receiversArray.length; i++){
      (<FormArray>this.emailForm.get('receivers')).push(this.formBuilder.control(receiversArray[i]));
    }
    this.emailToSend.append("mail", JSON.stringify(this.emailForm.value));
    this.apiService.saveToDraft(this.emailToSend).subscribe();
    this.emailToSend = new FormData();
    MailComponent.compose = false;
  }

  upload(files : any){
    this.emailToSend = new FormData()
    console.log(files.files);
    for(var i = 0 ;i < files.files.length ; i++){
      this.emailToSend.append("files", files.files[i]);
    }
  }

  get id() {
    return ComposeBoxComponent.id;
  }

  get to() {
    return ComposeBoxComponent.to;
  }

  get subject() {
    return ComposeBoxComponent.subject;
  }

  get message() {
    return ComposeBoxComponent.message;
  }

  get priority() {
    return ComposeBoxComponent.priority;
  }
}
