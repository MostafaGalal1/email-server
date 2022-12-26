import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { delay, Subject } from 'rxjs';
import { Email } from 'src/app/shared/email';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  @ViewChild('filterSearch', { read: ElementRef }) filterSearch!: ElementRef;
  @ViewChild('refreshButton', { read: ElementRef }) filterButton!: ElementRef;
  @ViewChild('resetButton', { read: ElementRef }) resetButton!: ElementRef;
  @ViewChild('searchBar', { read: ElementRef }) searchBar!: ElementRef;
  
  protected isVisible:boolean;
  protected checkAll:boolean;
  protected page:number = 0;
  protected compose:boolean;
  protected searchReset:boolean;
  protected searchColor:string;
  protected nowDate:Date;
  protected emails:Email[] = [{id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt", "hjghhfuyfyuffyuuyfyufyuyuuy"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date("Fri Dec 08 2019 07:44:57")},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "Seiortreoi", "jtjytyjt"], subject:"rggrtgjptjpgfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"trtrhhtrfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytthhtrhyryjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sd435534534f", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"543893045fdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "43554h", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["fdgjkfdjffdf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfgdkjlfldfgfdkjdfkjlgdfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["nmgfoojigtoe"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "gttrtrtthet", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date()}
];
  protected emailsQueue: {[id : string] : Email};
  protected selectionQueue: {[id : string] : Email};
  

  constructor() {
    this.emailsQueue = {};
    this.selectionQueue = {};
    this.nowDate = new Date();
    this.checkAll = false;
    this.searchReset = true;
    this.compose = false;
    this.isVisible = false;
    this.searchColor = "";
  }

  ngOnInit(): void {
    for (let i = 0 ; i < this.emails.length; i++){
      this.emails[i].id = i.toString();
      this.emailsQueue[i.toString()] = this.emails[i];
    }
  }

  returnZero() {
    return 0;
  }

  async showFilter(){
    if (this.isVisible)
      return;
    setTimeout(() => {
      this.isVisible = true;
    });
  }

  async hideFilter(){
    if (!this.isVisible)
      return;
    setTimeout(() => {
      this.isVisible = false;
      this.searchColor = "";
    });
  }

  async whitenBar(){
    setTimeout(() => {
      this.searchColor = "white";
    }, 250);
  }

  async darkenBar(){
    setTimeout(() => {
      if (!this.isVisible)
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
    if (this.compose)
      return;
    setTimeout(() => {
      this.compose = true;
    });
  }

  async emailSelection(event:any, emailID:string) {
    if (event.target !== undefined){
    if (event.target.checked) {
      document.getElementById(emailID)!.style.background = "var(--email-selection)";
      this.selectionQueue[emailID] = this.emailsQueue[emailID];
    } else {
      document.getElementById(emailID)!.style.background = "white";
      delete this.selectionQueue[emailID];
    }
  } else {
    try {
      if (this.checkAll) {
        document.getElementById(emailID)!.style.background = "var(--email-selection)";
        this.selectionQueue[emailID] = this.emailsQueue[emailID];
      } else {
        document.getElementById(emailID)!.style.background = "white";
        delete this.selectionQueue[emailID];
      }
    } catch (error) {
      
    }
  }
  }

  async deleteEmail(){
    for(const emailID in this.selectionQueue){
      delete this.emailsQueue[emailID];
      delete this.selectionQueue[emailID];
    }
    
    this.checkAll = false;
  }

  async selectAll(){
      if (this.checkAll){
        this.checkAll = false;
      } else {
        this.checkAll = true;
      }
      for (const emailID in this.emailsQueue){ 
        this.emailSelection(this.checkAll, emailID);
      }
  }
}
