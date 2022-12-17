import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginService, private formBuilder : FormBuilder) { }

  ngOnInit(): void {

  }

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  onSubmit(){
    if (this.loginService.getValidation(this.loginForm.value))
      console.log("true");
    else
      console.log("false");
  }
}
