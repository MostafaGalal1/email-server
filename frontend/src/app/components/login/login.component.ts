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
  protected visibility:string;

  constructor(private authService: AuthenticationService, private formBuilder : FormBuilder, private router:Router) { 
    this.visibility = "password";
  }

  ngOnInit(): void {

  }

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  onSubmit(){
    this.authService.login(this.loginForm.value).subscribe(() => this.router.navigate(['/mail']));
  }

  togglePassword() {
    if (this.visibility === "password") {
      this.visibility = "text";
    } else {
      this.visibility = "password";
    }
  }
}
