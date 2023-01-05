import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private username:any;
  private password:any;
  private error:any;
  protected visibility:string;

  constructor(private authService: AuthenticationService, private formBuilder : FormBuilder, private router:Router) { 
    this.visibility = "password";
  }

  ngOnInit(): void {
    this.username = document.getElementById("username");
    this.password = document.getElementById("password");
    this.error = document.getElementById("error");
  }

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  onSubmit(){
    if (!this.validateData())
      return;
    this.authService.login(this.loginForm.value).subscribe((response) => {
      if (response.state === "failed"){
        this.error!.innerText = "Username or password is incorrect";
        return;
      }
      this.router.navigate(['/mail']);
    });
  }

  
  validateData():boolean{
    let valid = true;
    if (this.username.value === "" && this.password.value === ""){
      this.error.innerText = "Enter username and password";
      valid = false;
    } else if (this.username.value === "") {
      this.error.innerText = "Enter username";
      valid = false;
    } else if (this.password.value === "") {
      this.error.innerText = "Enter password";
      valid = false;
    } else {
      this.error.innerText = "";
    }
    return valid;
  }

  signupRedirct() {
    this.router.navigate(["/signup"]);
  }

  togglePassword() {
    if (this.visibility === "password") {
      this.visibility = "text";
    } else {
      this.visibility = "password";
    }
  }
}
