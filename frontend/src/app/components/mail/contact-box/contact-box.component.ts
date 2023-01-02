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

  constructor(private apiService : ApiService, private formBuilder : FormBuilder, private mail : MailComponent) { }

  contactForm = this.formBuilder.group({
    username: localStorage.getItem("currentUser"),
    contactName: '',
<<<<<<< HEAD
    addresses: ''
=======
    addresses: [] , 
    oldName : ''
>>>>>>> e59cd85bb665c7ee0ef474a3622c8c94511078d3
  });

  ngOnInit(): void {
  }

  onSubmit(event:any){
    if(MailComponent.editOrCeate_contact== false){  
      if(this.contactForm.value.contactName! === "")
        return;
      this.contactForm.controls['addresses'].updateValueAndValidity(this.contactForm.get(['addressses'])?.value.contactName)
      console.log(this.contactForm.get(['addressses'])?.value);
      this.apiService.createContact(this.contactForm.value).subscribe((response:any) => {
        if (response.state === "success"){
          MailComponent.contacts.push(this.contactForm.value.contactName!);
          MailComponent.contactBoxVisible = false;
        } else {
          alert(response.message);
        }
      });
    }else{
      console.log("hello");
      if(this.contactForm.value.contactName! === MailComponent.contacts[MailComponent.indexContact] ) // compare the usercontactName also
        return;
        this.contactForm.value.oldName = MailComponent.contacts[MailComponent.indexContact];
        this.apiService.editContact(this.contactForm.value).subscribe((response:any) => {
          if (response.state === "success"){
            MailComponent.contacts[MailComponent.indexContact] = this.contactForm.value.contactName!;
            MailComponent.contactBoxVisible = false;
          } else {
            alert(response.message);
          }
        });
      
      MailComponent.contactBoxVisible = false;
      console.log(this.contactForm.value); 
    }
  }

  closeContactBox(){
    this.mail.hideContact();
  }
}
