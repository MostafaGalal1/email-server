import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

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
    rangeDate: '1 day',
    startDate: '',
    attachment: ''
  });

  onSubmit(){
    this.apiService.searchMails(this.searchForm.value).subscribe(
      (error) => {
        alert("Username taken");
      },
      () => {
        this.router.navigate(["/mail/search"]);
      }
    );
  }

}
