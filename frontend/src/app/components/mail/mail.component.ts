import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Email } from 'src/app/shared/email';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';

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
  protected checkAll:boolean;
  protected page:number = 0;
  static compose:boolean;
  protected searchReset:boolean;
  protected searchColor:string;
  protected nowDate:Date;
  protected emails:Email[] = [{id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt", "hjghhfuyfyuffyuuyfyufyuyuuy"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date("Fri Dec 08 2019 07:44:57") , file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "Seiortreoi", "jtjytyjt"], subject:"rggrtgjptjpgfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"trtrhhtrfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytthhtrhyryjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sd435534534f", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"543893045fdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "43554h", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["fdgjkfdjffdf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfgdkjlfldfgfdkjdfkjlgdfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["nmgfoojigtoe"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "gttrtrtthet", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]},
  {id:"", sender:"SFghfg", recievers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[]}
];
  protected emailsQueue: {[id : string] : Email};
  protected selectionQueue: {[id : string] : Email};  
  static folders: string[] = ['ghthr', 'tgthtrhhr' ,'thhtrthhrtrht', 'trhhtthr', 'ejowpgo', 'kpwekotero'];
  static contacts: string[] = ['aaewwazf', 'lstkhdfg' ,'piouiuykt', 'cxvcvxcv', 'tyryrro'];

  constructor(private apiService : ApiService, private location: Location) {
    this.emailsQueue = {};
    this.selectionQueue = {};
    this.nowDate = new Date();
    this.checkAll = false;
    this.buttonsVisible = false;
    this.searchReset = true;
    MailComponent.compose = false;
    this.filterBoxVisible = false;
    MailComponent.folderBoxVisible = false;
    MailComponent.contactBoxVisible = false;
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
    if (MailComponent.compose)
      return;
    setTimeout(() => {
      MailComponent.compose = true;
    });
  }

  async hideCompose(){
    if(!MailComponent.compose ){
      return ;
    }
    setTimeout(() => {
      MailComponent.compose = false;
    });
  }

  async emailSelection(event:any, emailID:string) {
    if (event.target !== undefined){
      if (event.target.checked) {
        document.getElementById(emailID)!.style.background = "var(--email-selection)";
        this.selectionQueue[emailID] = this.emailsQueue[emailID];
        this.buttonsVisible = true;
      } else {
        document.getElementById(emailID)!.style.background = "white";
        delete this.selectionQueue[emailID];
        if (!this.checkAll)
          this.buttonsVisible = false;
      }
    } else {
      try {
        if (this.checkAll) {
          document.getElementById(emailID)!.style.background = "var(--email-selection)";
          this.selectionQueue[emailID] = this.emailsQueue[emailID];
          this.buttonsVisible = true;
        } else {
          document.getElementById(emailID)!.style.background = "white";
          delete this.selectionQueue[emailID];
          this.buttonsVisible = false;
        }
      } catch (error) { }
    }
  }

  async deleteEmail(){
    for(const emailID in this.selectionQueue){
      delete this.emailsQueue[emailID];
      delete this.selectionQueue[emailID];
    }
    this.checkAll = false;
    this.buttonsVisible = false;
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

  
  async resetSelection(){
    if (this.checkAll){
      this.checkAll = false;
      for (const emailID in this.emailsQueue){ 
        this.emailSelection(this.checkAll, emailID);
      }
    }
  }

  async addFolder(){
    if (MailComponent.folderBoxVisible)
      return;
    setTimeout(() => {
      MailComponent.folderBoxVisible = true;
    });
    
  }

  async addContact(){
    if (MailComponent.contactBoxVisible)
      return;
    setTimeout(() => {
      MailComponent.contactBoxVisible = true;
    });
    
  }
  async hideFolder(){
    if(!MailComponent.folderBoxVisible ){
      return ;
    }
    setTimeout(() => {
      MailComponent.folderBoxVisible = false;
    });
  }

  async hideContact(){
    if(!MailComponent.contactBoxVisible ){
      return ;
    }
    setTimeout(() => {
      MailComponent.contactBoxVisible = false;
    });
  }

  get getcomposeVisible() {
    console.log( MailComponent.compose) ; 
    return MailComponent.compose;
  }

  get getFolderVisible() {
    console.log( MailComponent.folderBoxVisible) ; 
    return MailComponent.folderBoxVisible;
  }
  
  get getContactVisible() {
    console.log( MailComponent.contactBoxVisible) ; 
    return MailComponent.contactBoxVisible;
  }
  get getfolders(){
    return MailComponent.folders;
  }

  get getcontacts(){
    return MailComponent.contacts;
  }

  async moveEmail(){
    for(const emailID in this.selectionQueue){
      delete this.emailsQueue[emailID];
      delete this.selectionQueue[emailID];
    }
    this.checkAll = false;
    this.buttonsVisible = false;
  }

  async getEmails(folder : string){
    this.apiService.requestEmails(folder).subscribe(
      (emails) => {
        this.emails = emails;
      }
    );
    this.checkAll = false;
    this.buttonsVisible = false;
    this.selectionQueue = {};
    this.emailsQueue = {};
    for (let i = 0 ; i < this.emails.length; i++){
      this.emails[i].id = i.toString();
      this.emailsQueue[i.toString()] = this.emails[i];
    }
  }
}
