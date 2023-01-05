import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Email } from 'src/app/shared/email';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { map, Observable, timeout } from 'rxjs';
import { Contact } from 'src/app/shared/contact';
import { ComposeBoxComponent } from './compose-box/compose-box.component';
import { FolderBoxComponent } from './folder-box/folder-box.component';
import { ContactBoxComponent } from './contact-box/contact-box.component';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})

export class MailComponent implements OnInit{
  @ViewChild('filterSearch', { read: ElementRef }) filterSearch!: ElementRef;
  @ViewChild('refreshButton', { read: ElementRef }) filterButton!: ElementRef;
  @ViewChild('resetButton', { read: ElementRef }) resetButton!: ElementRef;
  @ViewChild('searchBar', { read: ElementRef }) searchBar!: ElementRef;

  protected filterBoxVisible:boolean;
  protected buttonsVisible:boolean;

  static folderBoxVisible:boolean;
  static contactBoxVisible:boolean;
  static editOrCeate_folder : boolean;
  static editOrCeate_contact : boolean;
  static indexFolder : number;
  static indexContact : number;
  protected edit_visible:boolean;
  protected emailVisible:boolean;
  protected contactVisible:boolean;
  protected currentEmail!:Email;
  static currentFolder:string;
  protected checkAll:boolean;
  protected page:number = 0;
  protected draftID:number = -1;
  static compose:boolean;
  protected currentUser:string|null;
  protected searchReset:boolean;
  protected searchColor:string;
  protected nowDate:Date;
  protected currentContact:Contact;
  protected tempEmail:Email;
  static emails:Email[] = [{id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt", "hjghhfuyfyuffyuuyfyufyuyuuy"], subject:"rggfggfdf", body:
      `Hello, MostafaM.Galal.
  I'm glad to invite you to take part in Codeforces Round #841 (Div. 2) and Divide by Zero 2022. It starts on Tuesday, December, 27, 2022 14:35 (UTC). The contest duration is 2 hours. The allowed programming languages are C/C++, Pascal, Perl, Java, C#, Python (2 and 3), Ruby, PHP, Haskell, Scala, OCaml, D, Go, JavaScript and Kotlin.
  The problems are prepared by the Programming Club IIT Indore team. Do not miss the round!
  Special prizes for Indian participants: 10 best participants get a t-shirt + 10 t-shirts are randomly distributed among those with ranks between 11 and 100, inclusive.
  Register Now →
  The round will be held on the rules of Codeforces, so read the rules (here and here) beforehand.
  It will be for newcomers or participants from the second division (non-rated users or those having less than 2100 rating points). Want to compete? Do not forget to register for the contest and check your handle on the registrants page. The registration will be closed 5 minutes before the contest.
  If you have any questions, please feel free to ask me on the pages of Codeforces. If you no longer wish to receive these emails, click https://codeforces.com/unsubscribe/contests/efa30bad32b237fb5d0a0a309237837163a097b8/ to unsubscribe.
  Wish you high rating,
  MikeMirzayanov and Codeforces team`, date:new Date("Fri Dec 08 2019 07:44:57"), priority:-1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date() , priority:-1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date() , priority:-1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date() , priority:-1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date() , priority:-1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "Seiortreoi", "jtjytyjt"], subject:"rggrtgjptjpgfggfdf", body:"gdgfddfggdfgfd", date:new Date() , priority:-1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"trtrhhtrfdf", body:"gdgfddfggdfgfd", date:new Date() , priority:-1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date() , priority:-1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytthhtrhyryjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date() , priority:-1},
  
  {id:0, sender:"SFghfg", receivers:["sdfgf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date() , priority:-1},
    {id:0, sender:"SFghfg", receivers:["sd435534534f", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"543893045fdf", body:"gdgfddfggdfgfd", date:new Date(), priority:-1}];
  static emailsQueue: {[id : number] : Email};
  protected attachs : string[] = [];
  protected selectionQueue: {[id : number] : Email};
  static folders: string[] = [];
  static contacts: Contact[] = [{name:"", mails:[""]}];

  constructor(private authService : AuthenticationService, private apiService : ApiService, private location: Location, private router : Router) {
    this.currentUser = localStorage.getItem('currentUser');
    MailComponent.emailsQueue = {};
    this.selectionQueue = {};
    this.nowDate = new Date();
    this.checkAll = false;
    this.emailVisible = false;
    this.buttonsVisible = false;
    this.searchReset = true;
    this.contactVisible = false;
    MailComponent.compose = false;
    this.filterBoxVisible = false;
    MailComponent.folderBoxVisible = false;
    MailComponent.contactBoxVisible = false;
    this.searchColor = "";
    MailComponent.currentFolder = "Inbox";
    this.currentEmail = MailComponent.emails[0];
    this.currentContact = {name : "" , mails :[]};
    this.edit_visible = true;
    this.tempEmail = MailComponent.emails[0];
  }

  ngOnInit(): void {
    this.apiService.getFolders().subscribe((response:any) => MailComponent.folders = response.data);
    this.apiService.getContacts().subscribe((response:any) => MailComponent.contacts = response.data);
    this.apiService.getEmails(MailComponent.currentFolder, "Date").subscribe((response:any) => {
      MailComponent.emails = response.data;
      for (let i = 0; i < MailComponent.emails.length; i++){
        MailComponent.emails[i].date = new Date(MailComponent.emails[i].date);
        MailComponent.emailsQueue[MailComponent.emails[i].id] = MailComponent.emails[i];
      }
    });
  }

  returnZero() {
    return 0;
  }

  async showFilter(){
    if (this.filterBoxVisible)
      return;
    setTimeout(() => {
      this.filterBoxVisible = true;
    });
  }

  async hideFilter(){
    if (!this.filterBoxVisible)
      return;
    setTimeout(() => {
      this.filterBoxVisible = false;
      this.searchColor = "";
    });
  }

  async whitenBar(){
    setTimeout(() => {
      this.searchColor = "white";
    }, 250);
  }

  async viewFilter(){
    var temp = <HTMLInputElement>document.getElementById("filterMenu");
    setTimeout(() => {
      if(temp.style.display === 'block')
        temp.style.display = 'none';
      else{
        temp.style.display = 'block'
      }
    }, 5);
  }

  async viewFolders(){
    var temp = <HTMLInputElement>document.getElementById("folderMenu");
    setTimeout(() => {
      if(temp.style.display === 'block')
        temp.style.display = 'none';
      else{
        temp.style.display = 'block'
      }
    }, 5);
  }

  async cancelFilter(){
    var temp = <HTMLInputElement>document.getElementById("filterMenu");
    temp.style.display = 'none';
  }


  async cancelFolders(){
    var temp = <HTMLInputElement>document.getElementById("folderMenu");
    temp.style.display = 'none';
  }

  async darkenBar(){
    setTimeout(() => {
      if (!this.filterBoxVisible)
        this.searchColor = "";
      if (this.searchBar.nativeElement.value === ""){
        this.searchReset = true;
      } else {
        if (this.searchReset && this.searchBar.nativeElement.value !== "Search in mail")
          this.searchReset = false;
      }
    });
  }

  async composeIt(){
    setTimeout(() => {
      ComposeBoxComponent.id = -1;
      ComposeBoxComponent.to = "";
      ComposeBoxComponent.subject = "";
      ComposeBoxComponent.message = "";
      ComposeBoxComponent.priority = 0;
      this.draftID = -1;
      MailComponent.compose = true;
    }, 20);
  }

  async hideCompose(){
    setTimeout(() => {
      MailComponent.compose = false;
    });
  }

  async emailSelection(event:any, emailID:number) {
    if (event.target !== undefined){
      if (event.target.checked) {
        document.getElementById(emailID.toString())!.style.background = "var(--email-selection)";
        this.selectionQueue[emailID] = MailComponent.emailsQueue[emailID];
        this.buttonsVisible = true;
      } else {
        document.getElementById(emailID.toString())!.style.background = "white";
        delete this.selectionQueue[emailID];
        if (!this.checkAll)
          this.buttonsVisible = false;
      }
    } else {
      try {
        if (this.checkAll) {
          document.getElementById(emailID.toString())!.style.background = "var(--email-selection)";
          this.selectionQueue[emailID] = MailComponent.emailsQueue[emailID];
          this.buttonsVisible = true;
        } else {
          document.getElementById(emailID.toString())!.style.background = "white";
          delete this.selectionQueue[emailID];
          this.buttonsVisible = false;
        }
      } catch (error) { }
    }
  }

  async deleteEmail(){
    if (MailComponent.currentFolder !== "Trash"){
      for(const emailID in this.selectionQueue){
        this.apiService.moveToTrash(emailID).subscribe(() => {
          this.apiService.getEmails(MailComponent.currentFolder, "Date").subscribe((response:any) => {
            MailComponent.emails = response.data;
            for (let i = 0; i < MailComponent.emails.length; i++){
              MailComponent.emails[i].date = new Date(MailComponent.emails[i].date);
              MailComponent.emailsQueue[MailComponent.emails[i].id] = MailComponent.emails[i];
            }
          });
        });
        delete MailComponent.emailsQueue[emailID];
        delete this.selectionQueue[emailID];
      }
    } else {
      for(const emailID in this.selectionQueue){
        this.apiService.deleteEmail(emailID).subscribe(() => {
          this.apiService.getEmails(MailComponent.currentFolder, "Date").subscribe((response:any) => {
            MailComponent.emails = response.data;
            for (let i = 0; i < MailComponent.emails.length; i++){
              MailComponent.emails[i].date = new Date(MailComponent.emails[i].date);
              MailComponent.emailsQueue[MailComponent.emails[i].id] = MailComponent.emails[i];
            }
          });
        });
        delete MailComponent.emailsQueue[emailID];
        delete this.selectionQueue[emailID];
        console.log(2);
      }
    }
    this.apiService.getEmails(MailComponent.currentFolder, "Date").subscribe((response:any) => {
      MailComponent.emails = response.data;
      for (let i = 0; i < MailComponent.emails.length; i++){
        MailComponent.emails[i].date = new Date(MailComponent.emails[i].date);
        MailComponent.emailsQueue[MailComponent.emails[i].id] = MailComponent.emails[i];
      }
    });
    this.checkAll = false;
    this.contactVisible = false;
    this.emailVisible = false;
    this.buttonsVisible = false;
  }

  async selectAll(){
      if (this.checkAll){
        this.checkAll = false;
      } else {
        this.checkAll = true;
      }
      for (const emailID in MailComponent.emailsQueue){ 
        this.emailSelection(this.checkAll, parseInt(emailID));
      }
  }


  async resetSelection(){
    if (this.checkAll){
      this.checkAll = false;
      for (const emailID in MailComponent.emailsQueue){ 
        this.emailSelection(this.checkAll, parseInt(emailID));
      }
    }
  }

  async searchEmails(){

  }

  async addFolder(i : boolean , index : any){
    MailComponent.editOrCeate_folder = i;
    if(i == true){
      MailComponent.indexFolder = index;
      FolderBoxComponent.namee = MailComponent.folders[index]
    }
    if (MailComponent.folderBoxVisible)
      return;
    setTimeout(() => {
      MailComponent.folderBoxVisible = true;
    });
  }

  async addContact(i : boolean , index : any){
    MailComponent.editOrCeate_contact = i;
    if(i == true){
      MailComponent.indexContact = index;
      ContactBoxComponent.namee = MailComponent.contacts[index].name
      ContactBoxComponent.mailss = "";
      for(var ii = 0 ; ii < MailComponent.contacts[Number(index)].mails?.length;ii++){
        if(ii != MailComponent.contacts[Number(index)].mails[ii]?.length-1)
          ContactBoxComponent.mailss += MailComponent.contacts[Number(index)].mails[ii] + ", ";
        else{
          ContactBoxComponent.mailss += MailComponent.contacts[Number(index)].mails[ii] ;
        }
      }
    }
    if (MailComponent.contactBoxVisible)
      return;
    setTimeout(() => {
      MailComponent.contactBoxVisible = true;
    });
  }

  async hideFolder(){
    setTimeout(() => {
      MailComponent.folderBoxVisible = false;
    });
  }

  async hideContact(){
    setTimeout(() => {
      MailComponent.contactBoxVisible = false;
    });
  }

  get currentFolder(){
    return MailComponent.currentFolder
  }

  async showEditBox(boxID : string){
    var temp = <HTMLInputElement>document.getElementById(boxID);
    setTimeout(() => {
      if(temp.style.display === 'block')
        temp.style.display = 'none';
      else{
        temp.style.display = 'block'
      }
    }, 5);
  }

  async hideEditBox(boxID : string){
    var temp = <HTMLInputElement>document.getElementById(boxID);
    if(temp.style.display === 'block')
      temp.style.display = 'none';
  }

  get getcomposeVisible() {
    return MailComponent.compose;
  }

  get getFolderVisible() {
    return MailComponent.folderBoxVisible;
  }
  
  get getContactVisible() {

    return MailComponent.contactBoxVisible;
  }

  get getfolders(){
    return MailComponent.folders;
  }

  get getcontacts(){
    return MailComponent.contacts;
  }

  get getemails(){
    return MailComponent.emails;
  }

  async moveEmails(folder : string){
    for(const emailID in this.selectionQueue){
      this.apiService.moveEmail(folder, emailID).subscribe(() => {
        this.apiService.getEmails(MailComponent.currentFolder, "Date").subscribe((response:any) => {
          MailComponent.emails = response.data;
          for (let i = 0; i < MailComponent.emails.length; i++){
            MailComponent.emails[i].date = new Date(MailComponent.emails[i].date);
            MailComponent.emailsQueue[MailComponent.emails[i].id] = MailComponent.emails[i];
          }
        });
      });
      delete MailComponent.emailsQueue[emailID];
      delete this.selectionQueue[emailID];
    }
    this.checkAll = false;
    this.emailVisible = false;
    this.buttonsVisible = false;
  }

  async restoreEmails(){
    for(const emailID in this.selectionQueue){
      this.apiService.restoreEmail(emailID).subscribe(() => {
        this.apiService.getEmails(MailComponent.currentFolder, "Date").subscribe((response:any) => {
          MailComponent.emails = response.data;
          for (let i = 0; i < MailComponent.emails.length; i++){
            MailComponent.emails[i].date = new Date(MailComponent.emails[i].date);
            MailComponent.emailsQueue[MailComponent.emails[i].id] = MailComponent.emails[i];
          }
        });
      });
      delete MailComponent.emailsQueue[emailID];
      delete this.selectionQueue[emailID];
    }
    this.checkAll = false;
    this.emailVisible = false;
    this.buttonsVisible = false;
  }

  async getEmails(folder : string){
    MailComponent.currentFolder = folder;
    this.checkAll = false;
    this.buttonsVisible = false;
    this.selectionQueue = {};
    MailComponent.emailsQueue = {};
    this.apiService.getEmails(MailComponent.currentFolder, "Date").subscribe((response:any) => {
      MailComponent.emails = response.data;
      for (let i = 0 ; i < MailComponent.emails.length; i++){
        MailComponent.emails[i].date = new Date(MailComponent.emails[i].date);
        MailComponent.emailsQueue[MailComponent.emails[i].id] = MailComponent.emails[i];
      }
    });
    this.contactVisible = false;
    this.emailVisible = false;
    this.buttonsVisible = false;
  }

  async refreshEmails(){
    this.checkAll = false;
    this.buttonsVisible = false;
    this.selectionQueue = {};
    MailComponent.emailsQueue = {};
    this.apiService.getEmails(MailComponent.currentFolder, "Date").subscribe((response:any) => {
      MailComponent.emails = response.data;
      for (let i = 0 ; i < MailComponent.emails.length; i++){
        MailComponent.emails[i].date = new Date(MailComponent.emails[i].date);
        MailComponent.emailsQueue[MailComponent.emails[i].id] = MailComponent.emails[i];
      }
    });
    this.emailVisible = false;
  }

  async previewEmail(emailID : number){
    if(MailComponent.currentFolder === "Draft"){
      for(var i = 0 ; i < MailComponent.emails.length; i++){
        if(MailComponent.emails[i].id == emailID){
          this.tempEmail = MailComponent.emails[i]
        }
      }
      setTimeout(() => { 
        ComposeBoxComponent.id = emailID;
        ComposeBoxComponent.to = "";
        for(let i = 0 ; i < this.tempEmail["receivers"].length - 1;i++){
          ComposeBoxComponent.to += this.tempEmail["receivers"][i] + ", ";
        }
        if (this.tempEmail["receivers"].length > 0)
          ComposeBoxComponent.to += this.tempEmail["receivers"][this.tempEmail["receivers"].length - 1];
        ComposeBoxComponent.subject = this.tempEmail["subject"];
        ComposeBoxComponent.message = this.tempEmail["body"];
        if (this.tempEmail["priority"] !== undefined)
          ComposeBoxComponent.priority = this.tempEmail["priority"];
        
        this.draftID = emailID;
        MailComponent.compose = true;
      }, 20);
      return;
    }
    this.emailVisible = true;
    this.buttonsVisible = true;
    this.selectionQueue = {};
    this.selectionQueue[emailID] = MailComponent.emailsQueue[emailID];
    this.currentEmail = MailComponent.emailsQueue[emailID];
  }

  async previewContact(index : number){
    this.currentContact = MailComponent.contacts[index];
    this.contactVisible = true;
    this.emailVisible = false;
    this.buttonsVisible = false;
    this.selectionQueue = {};
  }

  async backToFolder(){
    this.contactVisible = false;
    this.emailVisible = false;
    this.buttonsVisible = false;
    this.selectionQueue = {};
  }

  async navigateEmails(left : boolean){
    let emailIterator = 0;
    for (let i = 0; i < MailComponent.emails.length; i++){
      if (MailComponent.emails[i].id == this.currentEmail.id)
        emailIterator = i;
    }
    if (left && emailIterator < MailComponent.emails.length-1) {
      this.selectionQueue = {};
      emailIterator++;
      this.selectionQueue[emailIterator] = MailComponent.emailsQueue[emailIterator];
      this.currentEmail = MailComponent.emailsQueue[emailIterator];
    } else if (!left && emailIterator > 0) {
      this.selectionQueue = {};
      emailIterator--;
      this.selectionQueue[emailIterator] = MailComponent.emailsQueue[emailIterator];
      this.currentEmail = MailComponent.emailsQueue[emailIterator];
    }
  }

  async sortEmails(criterion : string){
    this.checkAll = false;
    this.buttonsVisible = false;
    this.selectionQueue = {};
    MailComponent.emailsQueue = {};
    this.apiService.getEmails(MailComponent.currentFolder, criterion).subscribe((response:any) => {
      MailComponent.emails = response.data;
      for (let i = 0 ; i < MailComponent.emails.length; i++){
        MailComponent.emails[i].date = new Date(MailComponent.emails[i].date);
        MailComponent.emailsQueue[MailComponent.emails[i].id] = MailComponent.emails[i];
      }
    });
    this.emailVisible = false;
  }

  removeFolder(index : any){
    var folderName = MailComponent.folders[index];
    MailComponent.folders.splice(index , 1);
    this.apiService.deleteFolder(folderName).subscribe();
  }

  removeContact(index : any){
    var contactName = MailComponent.contacts[index].name;
    MailComponent.contacts.splice(index , 1);
    this.apiService.deleteContact(contactName).subscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  darkModeToggle(): void {
    alert('sfsgg');
  }

  async checkRadio(radio : string){
    setTimeout(() => {
      console.log(radio);
      let temp = <HTMLInputElement>document.getElementById(radio);
      temp.checked = true;
    }, 10);
  }

  /*
  addAttachments(email : Email){
    var destinationNode = document.getElementById("attachments");
    for(var i = 0 ;i < email.attachments.length ; i++){
      this.attachs[i] =  "data:".concat(email.attachments[i].type).concat(";base64,").concat(email.attachments[i].link);
    }
  }
  */
}