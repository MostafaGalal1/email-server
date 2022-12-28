import { Component, Input, OnInit } from '@angular/core';
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

  ngOnInit(): void {  }
  
  contactForm = this.formBuilder.group({
    name: '',
  });

  onSubmit(event:any){
    if(event.target.name.value === "")
      return;
    MailComponent.folders.push(event.target.name.value);
    event.target.name.value = "";
    MailComponent.folderBoxVisible = false;
  }
}
