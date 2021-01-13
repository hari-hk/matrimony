import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Masters } from 'src/app/masters/masters';
import { UserService } from 'src/app/services/user.service';

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

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
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
  }

  get bif(): any {
    return this.basicInfoForm.controls;
  }
  getProfileDetails(): void {
    this.subscriptions.push(this.userService.profileDetail.subscribe(response => {
      if (!response) {
        return;
      }
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
    this.formOnEdit = !this.formOnEdit;
  }
  updateButtonControl(form, control, value): void {
    this[form].controls[control].setValue(value);
  }

}
