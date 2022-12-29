import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public visibility:string;

  constructor(private authService : AuthenticationService, private apiService : ApiService, private formBuilder : FormBuilder, private router:Router) { 
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
    this.authService.signup(this.signupForm.value).subscribe(() => this.router.navigate(["/mail"]));
  }
  
  togglePassword() {
    if (this.visibility === "password") {
      this.visibility = "text";
    } else {
      this.visibility = "password";
    }
  }
}
