import { HttpClient } from '@angular/common/http';
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

  constructor(private apiService : ApiService, private http : HttpClient, private formBuilder : FormBuilder) { }

  ngOnInit(): void {  }

  folderForm = this.formBuilder.group({
    username: localStorage.getItem("currentUser"),
    folderName: ''
  });

  onSubmit(event:any){
    console.log("asdasda");
    if(this.folderForm.value.folderName! === "")
      return;
    this.apiService.createFolder(this.folderForm.value).subscribe((response:any) => {
      if (response.state === "success"){
        MailComponent.folders.push(this.folderForm.value.folderName!);
        MailComponent.folderBoxVisible = false;
      } else {
        alert(response.message);
      }
    });
  }
}           