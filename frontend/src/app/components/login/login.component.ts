import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiService : ApiService, private formBuilder : FormBuilder, private router:Router) { }

  ngOnInit(): void {

  }

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  onSubmit(){
    this.apiService.validateLogin(this.loginForm.value).subscribe(
      (repose) => {
        console.log(JSON.parse(repose))
        alert(repose.toString());}
    );
  }
}
