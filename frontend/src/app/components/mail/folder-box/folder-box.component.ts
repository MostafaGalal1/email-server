import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MailComponent } from '../mail.component';

@Component({
  selector: 'app-folder-box',
  templateUrl: './folder-box.component.html',
  styleUrls: ['./folder-box.component.css']
})
export class FolderBoxComponent implements OnInit {

  constructor(private apiService : ApiService, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
  }
  name : string = "";
  contactForm = this.formBuilder.group({
    name: '',
    username: ''
  });

  onSubmit(){

  }

  create(){
    this.name = (<HTMLInputElement>document.getElementById("name")).value;
    if(this.name == ""){
      return ;
    }
    MailComponent.folders.push(this.name);
    MailComponent.folderBoxVisible = false;
  }

}
