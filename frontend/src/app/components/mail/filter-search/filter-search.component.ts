import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { MailComponent } from '../mail.component';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.css']
})
export class FilterSearchComponent implements OnInit {

  constructor(private apiService : ApiService, private formBuilder : FormBuilder, private router:Router) { 
  }

  ngOnInit(): void {
  }

  searchForm = this.formBuilder.group({
    sender: '',
    receivers: '',
    subject: '',
    body: '',
    priority: '',
    rangeDate: '',
    startDate: '',
    attachment: ''
  });

  onSubmit(){
    this.apiService.searchEmails(this.searchForm.value).subscribe(
      (response:any) => MailComponent.emails = response.data
    );
  }
}
