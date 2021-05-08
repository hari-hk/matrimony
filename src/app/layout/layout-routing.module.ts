import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';

const routes: Routes = [{
  path: '', component: LayoutComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'partner', loadChildren: () => import('./pages/partner-detail/partner-detail.module').then(m => m.PartnerDetailModule) },
    { path: 'interest', loadChildren: () => import('./pages/my-interest/my-interest.module').then(m => m.MyInterestModule) },
    { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) },
    { path: 'plans', loadChildren: () => import('./pages/plans/plans.module').then(m => m.PlansModule) }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
