import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MailComponent } from '../mail.component';
import { Contact } from 'src/app/shared/contact';

@Component({
  selector: 'app-contact-box',
  templateUrl: './contact-box.component.html',
  styleUrls: ['./contact-box.component.css']
})
export class ContactBoxComponent implements OnInit {

  constructor(private apiService : ApiService, private formBuilder : FormBuilder, private mail : MailComponent) { 
  }

  contactForm = this.formBuilder.group({
    username: localStorage.getItem("currentUser"),
    contactName: '',
    addresses: '',
    oldName : ''
  });
  static namee : string = "";
  static mailss : string = "";
  ngOnInit(): void {
  }

  onSubmit(event:any){
    if(MailComponent.editOrCeate_contact== false){  
      if(this.contactForm.value.contactName! === "")
        return;

      this.apiService.createContact(this.contactForm.value).subscribe((response:any) => {
        if (response.state === "success"){  
          let tmp = {} as Contact
          tmp.name = this.contactForm.value.contactName!;
          let tmpAddresses = <string>this.contactForm.value.addresses!; 
          tmp.mails = tmpAddresses.split(", ");
          MailComponent.contacts.push(tmp);
          MailComponent.contactBoxVisible = false;
        } else {
          alert(response.message);
        }
      });
    }else{
      if(this.contactForm.value.contactName! === MailComponent.contacts[MailComponent.indexContact].name && this.contactForm.value.addresses! === MailComponent.contacts[MailComponent.indexContact].name ) // compare the usercontactName also
        return;
      
      let tmp = {} as Contact;
      tmp.name = this.contactForm.value.contactName!;
      let tmpAddresses = <string>this.contactForm.value.addresses!; 
      this.contactForm.value.oldName = MailComponent.contacts[MailComponent.indexContact].name;
      //tmp.mails = tmpAddresses.split(", ");
      //MailComponent.contacts[MailComponent.indexContact].name = tmp.name;
      //MailComponent.contacts[MailComponent.indexContact].mails = tmp.mails;
      MailComponent.contactBoxVisible = false;
      this.apiService.editContact(this.contactForm.value).subscribe();
    }
  }

  closeContactBox(){
    this.mail.hideContact();
  }
  get getname(){
    return ContactBoxComponent.namee;
  }
  get getmails(){
    return ContactBoxComponent.mailss;
  }
}
