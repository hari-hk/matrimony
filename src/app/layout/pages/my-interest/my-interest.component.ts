import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Matches } from '../dashboard/models/matches.model';
import { DashboardService } from '../dashboard/services/dashboard.service';

@Component({
  selector: 'app-my-interest',
  templateUrl: './my-interest.component.html',
  styleUrls: ['./my-interest.component.scss']
})
export class MyInterestComponent implements OnInit {

  matches: Matches[] = [];
  loading = true;

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getMatches();
  }
  getMatches(): void {
    this.dashboardService.getMatches().subscribe((response: any) => {
      // this.matches = response;

      for (let index = 0; index < 20; index++) {
        this.matches.unshift(response);
      }
      console.log(this.matches);
      this.cdr.detectChanges();
      this.loading = false;
    }, error => { this.loading = false; });
  }


}
