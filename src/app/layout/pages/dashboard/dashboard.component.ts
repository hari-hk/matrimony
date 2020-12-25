import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdvanceSearchComponent } from './components/advance-search/advance-search.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {

  }
  openAdvanceSearch(): void {
    const dialogRef = this.dialog.open(AdvanceSearchComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
    });

    // dialogRef.close('Pizza!');
  }

}
