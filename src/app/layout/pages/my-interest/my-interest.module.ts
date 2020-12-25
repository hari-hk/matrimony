import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyInterestComponent } from './my-interest.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: MyInterestComponent }
]

@NgModule({
  declarations: [MyInterestComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MyInterestModule { }
