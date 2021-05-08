import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Masters } from 'src/app/masters/masters';
import { Occupation } from 'src/app/masters/occupation.master';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from '../../../../services/profile.services';

@Component({
  selector: 'app-family-info',
  templateUrl: './family-info.component.html',
  styleUrls: ['./family-info.component.scss', '../../edit-profile.component.scss']
})
export class FamilyInfoComponent implements OnInit, OnDestroy {

  familyInfoForm: FormGroup;

  subscriptions: Array<Subscription> = [];
  detail: any = {};

  familyType: Array<any> = new Masters().familyType;
  familyStatus: Array<any> = new Masters().familyStatus;
  occupation = new Occupation().occupation.map((el: any) => {
    el.id = el.name;
    return el;
  });
  motherOccupation: Array<any> = new Masters().motherOccupation;

  formOnEdit = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.initFamilyForm();
    this.getProfileDetails();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  initFamilyForm(): void {
    this.familyInfoForm = this.fb.group({
      familyType: ['', Validators.compose([Validators.required])],
      familyStatus: ['', Validators.compose([Validators.required])],
      fatherOccupation: ['', Validators.compose([Validators.required])],
      motherOccupation: ['', Validators.compose([Validators.required])],
      brothers: ['', Validators.compose([Validators.required])],
      sisters: ['', Validators.compose([Validators.required])],
      nativePlace: ['', Validators.compose([Validators.required])]
    });
    this.disableForm();
  }
  getProfileDetails(): void {
    this.subscriptions.push(this.userService.profileDetail.subscribe(response => {
      if (!response) {
        return;
      }
      console.log(response);
      this.detail = response;
      this.setFormValue(response);
    }));
  }
  setFormValue(data): void {
    this.fif.familyType.setValue(data.familyType);
    this.fif.familyStatus.setValue(data.familyStatus);
    this.fif.fatherOccupation.setValue(data.fatherOccupation);
    this.fif.motherOccupation.setValue(data.motherOccupation);
    this.fif.brothers.setValue(data.noofBrothers);
    this.fif.sisters.setValue(data.noofSisters);
    this.fif.nativePlace.setValue(data.nativePlace);
  }
  updateButtonControl(form, control, value): void {
    this[form].controls[control].setValue(value);
  }
  get fif(): any {
    return this.familyInfoForm.controls;
  }
  togleFormMode(): void {
    if (this.formOnEdit) {
      this.updateProfile();
      this.disableForm();
    } else {
      this.formOnEdit = true;
      this.enableFrom();
    }
  }
  disableForm(): void {
    this.fif.familyType.disable();
    this.fif.familyStatus.disable();
    this.fif.fatherOccupation.disable();
    this.fif.motherOccupation.disable();
    this.fif.brothers.disable();
    this.fif.sisters.disable();
    this.fif.nativePlace.disable();
  }
  enableFrom(): void {
    this.fif.familyType.enable();
    this.fif.familyStatus.enable();
    this.fif.fatherOccupation.enable();
    this.fif.motherOccupation.enable();
    this.fif.brothers.enable();
    this.fif.sisters.enable();
    this.fif.nativePlace.enable();
  }

  updateProfile(): void {
    this.formOnEdit = false;
    this.disableForm();

    const params: any = {};
    const value = this.familyInfoForm.value;
    params.parentsContactNo = this.detail.parentsContactno;
    params.familyValue = this.detail.familyValue;
    params.familyType = value.familyType;
    params.familyStatus = value.familyStatus;
    params.nativePlace = value.nativePlace;
    params.fatherOccupation = value.fatherOccupation;
    params.motherOccupation = value.motherOccupation;
    params.noofBrothers = value.brothers;
    params.noofSisters = value.sisters;
    params.aboutFamily = '';
    this.profileService.updateFamilyDetail(params).subscribe(() => {
      this.userService.showToast('Successfully Updated');
      this.refreshProfile();
    }, err => {
      this.formOnEdit = false;
    });
  }
  refreshProfile(): void {
    this.userService.getProfile().subscribe(() => {
    });
  }
}
