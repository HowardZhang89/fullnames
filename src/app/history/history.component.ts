import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { DashboardService } from '../dashboard/dashboard.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  searchHistory: any[];
  
  constructor(private dashboardService: DashboardService) { 
    
  }

  ngOnInit() {
    this.getSearchHistory();
  }

  getSearchHistory(){
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searchHistory = history;
    })
  }

}
