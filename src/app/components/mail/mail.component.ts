import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
  protected compose:boolean;
  protected searchReset:boolean;
  protected searchColor:string;

  constructor() { 
    this.searchReset = true;
    this.compose = false;
    this.isVisible = false;
    this.searchColor = "";
  }

  ngOnInit(): void {
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
      if (this.searchReset){
        console.log("sdfgdfg");
        this.searchBar.nativeElement.value = "";
      }
    }, 250);
  }

  async darkenBar(){
    setTimeout(() => {
      if (!this.isVisible)
        this.searchColor = "";
      
      if (this.searchBar.nativeElement.value === ""){
        this.searchReset = true;
        this.searchBar.nativeElement.value = "Search in mail";
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
}
