import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Email } from 'src/app/shared/email';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DarkModeService } from 'angular-dark-mode';
import { map, Observable } from 'rxjs';
import { Contact } from 'src/app/shared/contact';

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
  protected currentFolder:string;
  protected checkAll:boolean;
  protected page:number = 0;
  static compose:boolean;
  protected currentUser:string|null;
  protected searchReset:boolean;
  protected searchColor:string;
  protected nowDate:Date;
  protected currentContact:Contact = {name:"FGfdggfgdffg", mails:["FGfdfdgfgfdgdfgfgd", "tjthhtrhtrhtrthtrrtrhrth", "ykujrthetrtjhgrfed"]};
  protected emails:Email[] = [{id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt", "hjghhfuyfyuffyuuyfyufyuyuuy"], subject:"rggfggfdf", body:
  `Hello, MostafaM.Galal.
  I'm glad to invite you to take part in Codeforces Round #841 (Div. 2) and Divide by Zero 2022. It starts on Tuesday, December, 27, 2022 14:35 (UTC). The contest duration is 2 hours. The allowed programming languages are C/C++, Pascal, Perl, Java, C#, Python (2 and 3), Ruby, PHP, Haskell, Scala, OCaml, D, Go, JavaScript and Kotlin.
  
  The problems are prepared by the Programming Club IIT Indore team. Do not miss the round!
  
  Special prizes for Indian participants: 10 best participants get a t-shirt + 10 t-shirts are randomly distributed among those with ranks between 11 and 100, inclusive.
  
  Register Now →
  The round will be held on the rules of Codeforces, so read the rules (here and here) beforehand.
  
  It will be for newcomers or participants from the second division (non-rated users or those having less than 2100 rating points). Want to compete? Do not forget to register for the contest and check your handle on the registrants page. The registration will be closed 5 minutes before the contest.
  
  If you have any questions, please feel free to ask me on the pages of Codeforces. If you no longer wish to receive these emails, click https://codeforces.com/unsubscribe/contests/efa30bad32b237fb5d0a0a309237837163a097b8/ to unsubscribe.
  
  Wish you high rating,
  MikeMirzayanov and Codeforces team`, date:new Date("Fri Dec 08 2019 07:44:57") , file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "Seiortreoi", "jtjytyjt"], subject:"rggrtgjptjpgfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"trtrhhtrfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytthhtrhyryjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sd435534534f", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"543893045fdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "43554h", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["fdgjkfdjffdf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfgdkjlfldfgfdkjdfkjlgdfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["nmgfoojigtoe"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "gttrtrtthet", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[], priority:1},
  {id:0, sender:"SFghfg", receivers:["sdfgf", "sdfsggdf", "SDGgfrth", "jtjytyjt"], subject:"rggfggfdf", body:"gdgfddfggdfgfd", date:new Date(), file:[] , priority:1}
];
  protected emailsQueue: {[id : string] : Email};
  protected attachs : string[] = ["https://searchengineland.com/wp-content/seloads/2015/12/google-amp-fast-speed-travel-ss-1920-800x450.jpg",
"https://techcrunch.com/wp-content/uploads/2021/07/GettyImages-1207206237.jpg?w=1390&crop=1",
"https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/330px-Google_Images_2015_logo.svg.png"]
  protected selectionQueue: {[id : string] : Email};  
  static folders: string[] = [];
  static contacts: string[] = ['aaewwazf', 'lstkhdfg' ,'piouiuykt', 'cxvcvxcv', 'tyryrro'];

  constructor(private authService : AuthenticationService, private apiService : ApiService, private location: Location, private router : Router, private darkModeService: DarkModeService) {
    this.currentUser = localStorage.getItem('currentUser');
    this.emailsQueue = {};
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
    this.currentFolder = "inbox";
    this.currentEmail = this.emails[0];
    this.edit_visible = true;
  }

  ngOnInit(): void {
    this.apiService.getFolders().subscribe((response:any) => MailComponent.folders = response.data);
    for (let i = 0 ; i < this.emails.length; i++){
      this.emails[i].id = i;
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
    this.emailVisible = false;
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

  async addFolder(i : boolean , index : any){
    MailComponent.editOrCeate_folder = i;
    if(i == true){
      console.log(index);
      MailComponent.indexFolder = index;
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
      console.log(index);
      MailComponent.indexContact = index;
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
    this.emailVisible = false;
    this.buttonsVisible = false;
  }

  async getEmails(folder : string){
    this.currentFolder = folder;
    this.apiService.getEmails(this.currentFolder).subscribe();
    this.checkAll = false;
    this.buttonsVisible = false;
    this.selectionQueue = {};
    this.emailsQueue = {};
    for (let i = 0 ; i < this.emails.length; i++){
      this.emails[i].id = i;
      this.emailsQueue[i.toString()] = this.emails[i];
    }
    this.emailVisible = false;
  }

  async refreshEmails(){
    this.apiService.getEmails(this.currentFolder).subscribe(
      (emails)=>{
          var response = JSON.parse(emails.toString());
          this.emails = response["data"];
    });
    this.checkAll = false;
    this.buttonsVisible = false;
    this.selectionQueue = {};
    this.emailsQueue = {};
    for (let i = 0 ; i < this.emails.length; i++){
      this.emails[i].id = i;
      this.emailsQueue[i.toString()] = this.emails[i];
    }
    this.emailVisible = false;
  }

  async previewEmail(emailID : string){
    this.emailVisible = true;
    this.buttonsVisible = true;
    this.selectionQueue = {};
    this.selectionQueue[emailID] = this.emailsQueue[emailID];
    this.currentEmail = this.emailsQueue[emailID];
  }

  async previewContact(){
    this.contactVisible = true;
    this.buttonsVisible = true;
  }

  async backToFolder(){
    this.emailVisible = false;
    this.contactVisible = false;
    this.buttonsVisible = false;
    this.selectionQueue = {};
  }

  async navigateEmails(left : boolean){
    let emailID:number = this.currentEmail.id;
    if (left && emailID < this.emails.length-1) {
      this.selectionQueue = {};
      emailID++;
      this.selectionQueue[emailID.toString()] = this.emailsQueue[emailID.toString()];
      this.currentEmail = this.emailsQueue[emailID.toString()];
    } else if (!left && emailID > 0) {
      this.selectionQueue = {};
      emailID--;
      this.selectionQueue[emailID.toString()] = this.emailsQueue[emailID.toString()];
      this.currentEmail = this.emailsQueue[emailID.toString()];
    }
  }

  async sortEmails(criteria : string){
    this.apiService.sortEmails(this.currentFolder, criteria).subscribe(
      (emails) => {
        this.emails = emails;
      }
    );
    this.checkAll = false;
    this.buttonsVisible = false;
    this.selectionQueue = {};
    this.emailsQueue = {};
    for (let i = 0 ; i < this.emails.length; i++){
      this.emails[i].id = i;
      this.emailsQueue[i.toString()] = this.emails[i];
    }
    this.emailVisible = false;
  }
  
  removeFolder(index : any){
    var folderName = MailComponent.folders[index]; 
    MailComponent.folders.splice(index , 1);
    console.log(MailComponent.folders);
    this.apiService.deleteFolder(folderName).subscribe();
  }

  removeContact(index : any){
    MailComponent.contacts.splice(index , 1);
    console.log(MailComponent.contacts);
    // request the remove folders
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  darkModeToggle(): void {
    alert('sfsgg');
    this.darkModeService.toggle();
  }
}
