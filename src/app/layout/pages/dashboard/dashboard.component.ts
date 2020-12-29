import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { AdvanceSearchComponent } from './components/advance-search/advance-search.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscriptions: Array<Subscription> = [];
  details: any = {};

  constructor(
    private dialog: MatDialog,
    private userService: UserService) { }

  ngOnInit(): void {
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  initSubscriptions(): void {
    this.subscriptions.push(this.userService.profileDetail.subscribe(data => {
      console.log(data);
      if (!!data) {
        this.details = data;
      }
    }));
  }

  openAdvanceSearch(): void {
    const dialogRef = this.dialog.open(AdvanceSearchComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
    });

    // dialogRef.close('Pizza!');
  }

}
