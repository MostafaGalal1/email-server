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

  contactForm = this.formBuilder.group({
    name: '',
    username: ''
  });

  onSubmit(event:any){
    if(event.target.name.value === "")
      return ;
    MailComponent.contacts.push(event.target.name.value);
    event.target.name.value = "";
    event.target.username.value = "";
    MailComponent.contactBoxVisible = false;
  }
}
