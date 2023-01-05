import { HttpClient, HttpInterceptor } from '@angular/common/http';
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

  constructor(private apiService : ApiService, private http : HttpClient, private formBuilder : FormBuilder, private mail:MailComponent) { }

  ngOnInit(): void { 
    if(MailComponent.editOrCeate_folder === true){
      document.getElementById("folderName")!.innerText = MailComponent.folders[MailComponent.indexFolder];
    }
   }

  folderForm = this.formBuilder.group({
    username: localStorage.getItem("currentUser"),
    folderName: ''
  });
  static namee : string = "";
  onSubmit(event:any){
    if(MailComponent.editOrCeate_folder== false){  
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
    }else{
      if(this.folderForm.value.folderName! === MailComponent.folders[MailComponent.indexFolder])
        return;
      var oldName = MailComponent.folders[MailComponent.indexFolder];
      MailComponent.folders[MailComponent.indexFolder]=this.folderForm.value.folderName!;
      MailComponent.folderBoxVisible = false;
      this.apiService.editFolder(oldName,MailComponent.folders[MailComponent.indexFolder]).subscribe();
    }

  }

  closeFolderBox(){
    this.mail.hideFolder();
  }
  get getname(){
    return FolderBoxComponent.namee
  }
}           