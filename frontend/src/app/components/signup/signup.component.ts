import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public visibility:string;

  constructor(private apiService : ApiService, private formBuilder : FormBuilder, private router:Router) { 
    this.visibility = "password";
  }

  ngOnInit(): void {

  }

  signupForm = this.formBuilder.group({
    first_name: '',
    last_name: '',
    username: '',
    enter_password: ''
  });

  onSubmit(){
    this.apiService.createAccount(this.signupForm.value).subscribe(
      (error) => {
        alert("Username taken");
      },
      () => {
        this.router.navigate(["/mail"]);
      }
    );
  }

  togglePassword() {
    if (this.visibility === "password") {
      this.visibility = "text";
    } else {
      this.visibility = "password";
    }
  }
}
