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
    console.log("asdasda");
    if(MailComponent.editOrCeate_contact== false){  
      if(this.contactForm.value.name! === "")
        return;
      this.apiService.createContact(this.contactForm.value).subscribe((response:any) => {
        if (response.state === "success"){
          MailComponent.contacts.push(this.contactForm.value.name!);
          MailComponent.contactBoxVisible = false;
        } else {
          alert(response.message);
        }
      });
    }else{
      console.log("hello");
      if(this.contactForm.value.name! === MailComponent.contacts[MailComponent.indexContact] ) // compare the username also
        return;

      MailComponent.contacts[MailComponent.indexContact] = this.contactForm.value.name!;
      MailComponent.contactBoxVisible = false;
      console.log(this.contactForm.value);
      //request the edit folder by the new name and the old name 
    }
  }


  
}
