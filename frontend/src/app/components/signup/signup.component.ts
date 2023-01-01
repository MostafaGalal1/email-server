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
  private firstName:any;
  private lastName:any;
  private username:any;
  private password:any;
  private confirmPassword:any;
  private nameError:any;
  private usernameError:any;
  private passwordError:any;
  public visibility:string;

  constructor(private authService : AuthenticationService, private apiService : ApiService, private formBuilder : FormBuilder, private router:Router) { 
    this.visibility = "password";
  }

  ngOnInit(): void {
    this.firstName = document.getElementById("first-name");
    this.lastName = document.getElementById("last-name");
    this.username = document.getElementById("username");
    this.password = document.getElementById("password");
    this.confirmPassword = document.getElementById("confirm-password");
    this.nameError = document.getElementById("name-error");
    this.usernameError = document.getElementById("username-error");
    this.passwordError = document.getElementById("password-error");
  }

  signupForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  });

  onSubmit(){
    if (!this.validateData())
      return;
    this.authService.signup(this.signupForm.value).subscribe((response:any) => {
      if (response.state === "failed"){
        this.usernameError!.innerText = "Username already taken";
        return;
      }
      this.router.navigate(["/login"]);
    });
  }

  validateData():boolean{
    let valid = true;
    if (this.firstName.value === "" && this.lastName.value === ""){
      this.nameError.innerText = "Enter first and last names";
      valid = false;
    } else if (this.firstName?.value === "") {
      this.nameError.innerText = "Enter first name";
      valid = false;
    } else if (this.lastName?.value === "") {
      this.nameError.innerText = "Enter last name";
      valid = false;
    } else {
      this.nameError.innerText = "";
    }
    if (this.username.value === ""){
      this.usernameError.innerText = "Enter username";
      valid = false;
    } else {
      this.usernameError.innerText = "";
    }
    if (this.password.value === "" && this.confirmPassword.value === ""){
      this.passwordError.innerText = "Enter password";
      valid = false;
    } else if (this.password.value === "") {
      this.passwordError.innerText = "Enter password";
      valid = false;
    } else if (this.confirmPassword.value === "") {
      this.passwordError.innerText = "Enter confirm password";
      valid = false;
    } else if (this.password.value !== this.confirmPassword.value) {
      this.passwordError.innerText = "Password doesn't match";
      valid = false;
    } else {
      this.passwordError.innerText = "";
    }
    return valid;
  }

  loginRedirct() {
    this.router.navigate(["/login"]);
  }
  
  togglePassword() {
    if (this.visibility === "password") {
      this.visibility = "text";
    } else {
      this.visibility = "password";
    }
  }
}
