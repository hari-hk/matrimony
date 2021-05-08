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
import { BasicInfoComponent } from './components/edit-profile/components/basic-info/basic-info.component';
import { SelfInfoComponent } from './components/edit-profile/components/self-info/self-info.component';
import { ProffessionalInfoComponent } from './components/edit-profile/components/proffessional-info/proffessional-info.component';
import { FamilyInfoComponent } from './components/edit-profile/components/family-info/family-info.component';
import { OtherInfoComponent } from './components/edit-profile/components/other-info/other-info.component';

import { ProfileService } from './services/profile.services';

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
    EditPartnerProfileComponent,
    BasicInfoComponent,
    SelfInfoComponent,
    ProffessionalInfoComponent,
    FamilyInfoComponent,
    OtherInfoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    MatStepperModule
  ],
  providers: [ProfileService]
})
export class ProfileModule { }
