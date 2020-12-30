import { Component, OnInit } from '@angular/core';


import { Matches } from '../../models/matches.model';

import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {

  matches: Matches[] = [];

  loading = true;

  constructor(
    private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getMatches();

  }
  getMatches(): void {
    this.dashboardService.getMatches().subscribe((response: any) => {
      this.matches = response;
      this.loading = false;
    }, error => { this.loading = false; });
  }

}
