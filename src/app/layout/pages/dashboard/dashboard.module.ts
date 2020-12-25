import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AdvanceSearchComponent } from './components/advance-search/advance-search.component';
import { MatDialogModule } from '@angular/material/dialog';


const routes: Routes = [
  { path: '', component: DashboardComponent }
]
@NgModule({
  declarations: [DashboardComponent, AdvanceSearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDialogModule
  ],
  entryComponents: [AdvanceSearchComponent]
})
export class DashboardModule { }
