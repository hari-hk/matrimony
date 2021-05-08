import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
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
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getMatches();
  }
  getMatches(): void {
    this.userService.getInterestedList().subscribe((response: any) => {
      this.matches = response;
      this.cdr.detectChanges();
      this.loading = false;
    }, error => { this.loading = false; });
  }


}
