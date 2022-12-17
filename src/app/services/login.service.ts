import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {  }

  getValidation(loginForm : object) {
    var val;
    console.log(loginForm);
    this.http.get<any>('http://localhost:8080/login').subscribe((res) => val = res);
    console.log(val);
    return true;
  }
}
