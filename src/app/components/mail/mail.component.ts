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
  protected searchColor:string;

  constructor() { 
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
    });
  }

  async darkenBar(){
    setTimeout(() => {
      if (!this.isVisible)
        this.searchColor = "";
    });
  }
}
