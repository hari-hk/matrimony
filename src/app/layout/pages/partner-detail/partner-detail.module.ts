import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerDetailComponent } from './partner-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { NgImageSliderModule } from 'ng-image-slider';


const routes: Routes = [
  { path: ':id', component: PartnerDetailComponent }
]
@NgModule({
  declarations: [PartnerDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgImageSliderModule
  ]
})
export class PartnerDetailModule { }
