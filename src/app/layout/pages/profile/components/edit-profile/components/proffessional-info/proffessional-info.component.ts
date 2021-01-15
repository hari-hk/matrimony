import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HigherEducation } from 'src/app/masters/higher-education.master';
import { Income } from 'src/app/masters/income.master';
import { Masters } from 'src/app/masters/masters';
import { Occupation } from 'src/app/masters/occupation.master';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from '../../../../services/profile.services';

@Component({
  selector: 'app-proffessional-info',
  templateUrl: './proffessional-info.component.html',
  styleUrls: ['./proffessional-info.component.scss', '../../edit-profile.component.scss']
})
export class ProffessionalInfoComponent implements OnInit, OnDestroy {

  proffessionInfoForm: FormGroup;


  subscriptions: Array<Subscription> = [];
  formOnEdit = false;

  education = new HigherEducation().education.map((el: any) => {
    el.id = el.name;
    return el;
  });
  employedIn = new Masters().employedIn;
  occupation = new Occupation().occupation.map((el: any) => {
    el.id = el.name;
    return el;
  });
  annualIncome = new Income().annualIncome.map((el: any) => {
    return {
      name: el.income,
      id: el.name
    };
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.initProffessionForm();
    this.getProfileDetails();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  initProffessionForm(): void {
    this.proffessionInfoForm = this.fb.group({
      higherEducation: ['', Validators.compose([Validators.required])],
      employedIn: ['', Validators.compose([Validators.required])],
      occupation: ['', Validators.compose([Validators.required])],
      annualIncome: ['', Validators.compose([Validators.required])],
      workLocation: ['', Validators.compose([Validators.required])]
    });
    this.disableForm();
  }
  getProfileDetails(): void {
    this.subscriptions.push(this.userService.profileDetail.subscribe(response => {
      if (!response) {
        return;
      }
      this.setProffessionForm(response);
    }));
  }
  setProffessionForm(data): void {
    this.pif.higherEducation.setValue(data.higheshEducation);
    this.pif.employedIn.setValue(data.employedIn);
    this.pif.occupation.setValue(data.occupation);
    this.pif.annualIncome.setValue(data.annualIncome);
    this.pif.workLocation.setValue(data.workLocation);
  }

  get pif(): any {
    return this.proffessionInfoForm.controls;
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
    this.pif.higherEducation.disable();
    this.pif.employedIn.disable();
    this.pif.occupation.disable();
    this.pif.annualIncome.disable();
    this.pif.workLocation.disable();
  }
  enableFrom(): void {
    this.pif.higherEducation.enable();
    this.pif.employedIn.enable();
    this.pif.occupation.enable();
    this.pif.annualIncome.enable();
    this.pif.workLocation.enable();
  }

  updateProfile(): void {
    this.formOnEdit = false;
    this.disableForm();
    const params: any = {};
    const value = this.proffessionInfoForm.value;
    params.employedIn = value.employedIn;
    params.highestEducation = value.higherEducation;
    params.annualIncome = value.annualIncome;
    params.occupation = value.occupation;
    params.workLocation = value.workLocation;
    this.profileService.updateProffessionalDetail(params).subscribe(() => {
      this.userService.showToast('Successfully Updated');
      this.userService.getProfile();
    }, err => {
      this.formOnEdit = false;
    });
  }
}
