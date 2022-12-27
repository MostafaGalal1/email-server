import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

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

  onSubmit(){
    this.apiService.createContact(this.contactForm.value).subscribe(
      (error) => {
        alert("Username or password are incorrect");
      },
      () => {
      }
    );
  }
}
