import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from 'src/app/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EditPartnerProfileComponent } from './components/edit-partner-profile/edit-partner-profile.component';


const routes: Routes = [
  {
    path: '', component: ProfileComponent, children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: 'view', component: ViewProfileComponent },
      { path: 'edit', component: EditProfileComponent },
      { path: 'edit-partner', component: EditPartnerProfileComponent },
      { path: 'change-password', component: ChangePasswordComponent },
    ]
  }
];

@NgModule({
  declarations: [
    ProfileComponent,
    ViewProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    EditPartnerProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    MatStepperModule
  ]
})
export class ProfileModule { }
