import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Masters } from 'src/app/masters/masters';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from '../../../../services/profile.services';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss', '../../edit-profile.component.scss']
})
export class BasicInfoComponent implements OnInit, OnDestroy {

  basicInfoForm: FormGroup;

  maritalStatus: Array<any> = new Masters().maritalStatus;

  subscriptions: Array<Subscription> = [];

  formOnEdit = false;

  detail: any = {};

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.initBasicForm();
    this.getProfileDetails();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  initBasicForm(): void {
    this.basicInfoForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      mobile: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      about: ['', Validators.compose([Validators.pattern('')])],
      maritalStatus: [this.maritalStatus && this.maritalStatus[0]?.id, Validators.compose([Validators.required])]
    });
    this.bif.about.disable();
  }

  get bif(): any {
    return this.basicInfoForm.controls;
  }
  getProfileDetails(): void {
    this.subscriptions.push(this.userService.profileDetail.subscribe(response => {
      if (!response) {
        return;
      }
      this.detail = response;
      this.setBasicForm(response);
    }));
  }

  setBasicForm(data): void {
    this.bif.name.setValue(data.Name);
    this.bif.mobile.setValue(data.mobile);
    this.bif.email.setValue(data.email);
    this.bif.about.setValue(data.aboutMe);
    this.bif.maritalStatus.setValue(data.maritalStaus);
  }

  togleFormMode(): void {
    if (this.formOnEdit) {
      this.updateProfile();
      this.bif.about.disable();
    } else {
      this.formOnEdit = true;
      this.bif.about.enable();
    }
  }
  updateButtonControl(form, control, value): void {
    this[form].controls[control].setValue(value);
  }

  updateProfile(): void {
    this.formOnEdit = false;
    this.bif.about.disable();

    const params: any = {};
    params.maritalStatus = this.basicInfoForm.value.maritalStatus;
    params.maritalChild = this.detail.birthTime;
    params.height = this.detail.height;
    params.weight = this.detail.weight;
    params.maritalChild = this.detail.maritalChildStaus;
    params.bodyType = this.detail.bodyType;
    params.languagesKnown = this.detail.languagesKnown;
    params.gothram = this.detail.gothram;
    params.star = this.detail.star;
    params.rasi = this.detail.rasi;
    params.dosham = this.detail.dosham;
    params.country = this.detail.country;
    params.birth_time = this.detail.birthTime;
    params.birth_place = this.detail.birthPlace;
    params.aboutMe = this.basicInfoForm.value.about;
    this.profileService.updateBasicDetail(params).subscribe(() => {
      this.userService.showToast('Successfully Updated');
      this.userService.getProfile();
    }, err => {
      this.formOnEdit = false;
    });
  }
}
