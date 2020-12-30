import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AdvanceSearchComponent } from './components/advance-search/advance-search.component';
import { SharedModule } from 'src/app/shared.module';

import { DashboardService } from './services/dashboard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', component: DashboardComponent }
];
@NgModule({
  declarations: [DashboardComponent, AdvanceSearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [DashboardService],
  entryComponents: [AdvanceSearchComponent]
})
export class DashboardModule { }
