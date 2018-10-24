import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import {HistoryComponent} from '../history/history.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  searches: any[];   // original coce
  @Input() firstName : string;  
  @Input() lastName : string;  
  match : boolean;

  constructor(private dashboardService: DashboardService) {
    this.searches = [];   // original code
  }

  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
    });
  }

  dummyClick () {
      this.firstName = 'You';
      this.lastName = 'Clicked me!'
      //this.showClick = !this.showClick;
  }

  searchName(fName: string, lName: string){
    // get observable from dashboard Service
    this.dashboardService.searchName(this.firstName, this.lastName)
      .subscribe(match => {
        // update HTML to show if name was found
        if (match == true){
          this.match = true;
          document.getElementById('result').innerHTML = `${this.firstName} ${this.lastName} exists.`;
        }
        else{
          document.getElementById('result').innerHTML = `${this.firstName} ${this.lastName} could not be found.`;

        } 
        // update search history
        this.dashboardService.addNameToSearchHistory(fName, lName);

      });
  }

  addName(){
    if (!this.match){
      this.dashboardService.addNameToDatabase(this.firstName, this.lastName);
    }
    else{
      document.getElementById('result').innerHTML = `${this.firstName} ${this.lastName} could not be added.`
    }
  }

  ngOnInit() {
  }

}
