import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MailComponent } from '../mail.component';

@Component({
  selector: 'app-contact-box',
  templateUrl: './contact-box.component.html',
  styleUrls: ['./contact-box.component.css']
})
export class ContactBoxComponent implements OnInit {

  constructor(private apiService : ApiService, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
  }
  name : string = "";
  username : string = "";
  contactForm = this.formBuilder.group({
    name: '',
    username: ''
  });

  onSubmit(){
    this.apiService.createContact(this.contactForm.value).subscribe(
      (error) => {
        alert("Username or password are incorrect");
      },
      () => {
      }
    );
  }

  create(){
    this.name = (<HTMLInputElement>document.getElementById("name-contact")).value;
    this.username = (<HTMLInputElement>document.getElementById("username")).value;

    if(this.name == ""){
      return ;
    }
    //check for the user name...
    MailComponent.contacts.push(this.name);
    MailComponent.contactBoxVisible = false;

    

  }
}
