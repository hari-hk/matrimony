import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Languages } from 'src/app/masters/language.master';
import { Masters } from 'src/app/masters/masters';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from '../../../../services/profile.services';

@Component({
  selector: 'app-self-info',
  templateUrl: './self-info.component.html',
  styleUrls: ['./self-info.component.scss', '../../edit-profile.component.scss']
})
export class SelfInfoComponent implements OnInit, OnDestroy {

  selfInfoForm: FormGroup;
  formOnEdit = false;
  bodyType: Array<any> = new Masters().body;
  height = new Masters().height.map(el => {
    return {
      name: el.name,
      id: el.cm.toString()
    }
  });
  weight = new Masters().weight.map((el: any) => {
    el.id = el.name;
    return el;
  });
  languages = new Languages().languages.map((el: any) => {
    el.id = el.name;
    return el;
  });
  dhosam = new Masters().dhosam;
  star = new Masters().star;
  rasi = new Masters().rasi.map((el: any) => {
    el.id = el.name;
    return el;
  });
  gowthram = new Masters().gowthram.map((el: any) => {
    el.id = el.name;
    return el;
  });
  martialStatus = [];
  subcaste = [];

  subscriptions: Array<Subscription> = [];

  detail: any = {};

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.initSelfForm();
    this.getProfileDetails();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  initSelfForm(): void {
    this.selfInfoForm = this.fb.group({
      motherTongue: ['', Validators.compose([Validators.required])],
      subCaste: ['', Validators.compose([Validators.required])],
      gowthram: ['', Validators.compose([Validators.required])],
      rasi: ['', Validators.compose([Validators.required])],
      star: ['', Validators.compose([Validators.required])],
      dhosam: ['', Validators.compose([Validators.required])],
      bodyType: ['', Validators.compose([Validators.required])],
      height: ['', Validators.compose([Validators.required])],
      weight: ['', Validators.compose([Validators.required])],
      languagesKnown: ['', Validators.compose([Validators.required])]
    });
    this.disableForm();
  }
  get sif(): any {
    return this.selfInfoForm.controls;
  }
  getProfileDetails(): void {
    this.subscriptions.push(this.userService.profileDetail.subscribe(response => {
      if (!response) {
        return;
      }
      this.detail = response;
      this.setSelfForm(response);
      this.getSubCaste(response.caste);
    }));
  }
  getSubCaste(id): void {
    this.userService.getSubCaste(res => {
      console.log(res);
    });
  }
  setSelfForm(data): void {
    this.sif.motherTongue.setValue(data.motherTongue);
    this.sif.subCaste.setValue(data.subCaste);
    this.sif.gowthram.setValue(data.gothram);
    this.sif.rasi.setValue(data.rasi);
    this.sif.star.setValue(data.star);
    this.sif.dhosam.setValue(data.dosham);
    this.sif.bodyType.setValue(data.bodyType);
    this.sif.height.setValue(data.height);
    this.sif.weight.setValue(data.weight);
    this.sif.languagesKnown.setValue(data.languagesKnown);
  }

  updateButtonControl(form, control, value): void {
    this[form].controls[control].setValue(value);
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
    this.sif.motherTongue.disable();
    this.sif.subCaste.disable();
    this.sif.gowthram.disable();
    this.sif.rasi.disable();
    this.sif.star.disable();
    this.sif.dhosam.disable();
    this.sif.bodyType.disable();
    this.sif.height.disable();
    this.sif.weight.disable();
    this.sif.languagesKnown.disable();
  }
  enableFrom(): void {
    this.sif.motherTongue.enable();
    this.sif.subCaste.enable();
    this.sif.gowthram.enable();
    this.sif.rasi.enable();
    this.sif.star.enable();
    this.sif.dhosam.enable();
    this.sif.bodyType.enable();
    this.sif.height.enable();
    this.sif.weight.enable();
    this.sif.languagesKnown.enable();
  }
  updateProfile(): void {
    const params: any = {};
    params.maritalStatus = this.detail.maritalStaus;
    params.maritalChild = this.detail.birthTime;
    params.country = this.detail.country;
    params.birth_time = this.detail.birthTime;
    params.birth_place = this.detail.birthPlace;
    params.aboutMe = this.detail.aboutMe;

    const value = this.selfInfoForm.value;

    params.height = value.height;
    params.weight = value.weight;
    params.maritalChild = this.detail.maritalChildStaus;
    params.bodyType = value.bodyType;
    params.languagesKnown = value.languagesKnown;
    params.gothram = value.gowthram;
    params.star = value.star;
    params.rasi = value.rasi;
    params.dosham = value.dhosam;
    this.profileService.updateBasicDetail(params).subscribe(() => {
      this.userService.showToast('Successfully Updated');
      this.formOnEdit = false;
      this.userService.getProfile();
    }, err => {
      this.formOnEdit = false;
    });
  }
}
