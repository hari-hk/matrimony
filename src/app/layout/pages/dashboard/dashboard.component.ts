import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { AdvanceSearchComponent } from './components/advance-search/advance-search.component';

import { Count } from '../../../common/models/count.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscriptions: Array<Subscription> = [];
  count: Count = new Count();
  details: any = {};

  constructor(
    private dialog: MatDialog,
    private userService: UserService) { }

  ngOnInit(): void {
    this.initSubscriptions();
    this.getCount();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  initSubscriptions(): void {
    this.subscriptions.push(this.userService.profileDetail.subscribe(data => {
      if (!!data) {
        this.details = data;
      }
    }));
  }
  getCount(): void {
    this.userService.getCount().subscribe((response: Count) => {
      this.count = response;
    });
  }


  openAdvanceSearch(): void {
    const dialogRef = this.dialog.open(AdvanceSearchComponent, {
      maxWidth: 600
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
