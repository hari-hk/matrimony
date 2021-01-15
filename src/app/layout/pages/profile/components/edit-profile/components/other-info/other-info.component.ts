import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { Masters } from 'src/app/masters/masters';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from '../../../../services/profile.services';

@Component({
  selector: 'app-other-info',
  templateUrl: './other-info.component.html',
  styleUrls: ['./other-info.component.scss', '../../edit-profile.component.scss']
})
export class OtherInfoComponent implements OnInit {

  otherInfoForm: FormGroup;
  subscriptions: Array<Subscription> = [];
  formOnEdit = false;

  eatingHabits = new Masters().eattingHabbit;
  drinkingHabbit = new Masters().drinkingHabbit;
  smokingHabbit = new Masters().smokingHabbit;
  physicalStatus = new Masters().physicalStatus;
  hobbies = new Masters().hobbies.map((el: any) => {
    return {
      name: el.hobby,
      id: el.hobby
    };
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.initOtherForm();
    this.getProfileDetails();
  }
  initOtherForm(): void {
    this.otherInfoForm = this.fb.group({
      eatingHabit: ['', Validators.compose([Validators.required])],
      drinkingHabit: ['', Validators.compose([Validators.required])],
      smokingHabit: ['', Validators.compose([Validators.required])],
      physicalStatus: ['', Validators.compose([Validators.required])],
      hobbies: ['', Validators.compose([Validators.required])]
    });
    this.disableForm();
  }

  getProfileDetails(): void {
    this.subscriptions.push(this.userService.profileDetail.subscribe(response => {
      if (!response) {
        return;
      }
      this.setFormValues(response);
    }));
  }
  get oif(): any {
    return this.otherInfoForm.controls;
  }
  setFormValues(data): void {
    this.oif.eatingHabit.setValue(data.eating);
    this.oif.drinkingHabit.setValue(data.drinking);
    this.oif.smokingHabit.setValue(data.smoking);
    this.oif.physicalStatus.setValue(data.physicalStatus);
    this.oif.hobbies.setValue(data.hobby);
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
    this.oif.eatingHabit.disable();
    this.oif.drinkingHabit.disable();
    this.oif.smokingHabit.disable();
    this.oif.physicalStatus.disable();
    this.oif.hobbies.disable();
  }
  enableFrom(): void {
    this.oif.eatingHabit.enable();
    this.oif.drinkingHabit.enable();
    this.oif.smokingHabit.enable();
    this.oif.physicalStatus.enable();
    this.oif.hobbies.enable();
  }

  updateProfile(): void {
    this.formOnEdit = false;
    this.disableForm();
    const params: any = {};
    const value = this.otherInfoForm.value;
    params.food = value.eatingHabit;
    params.smoking = value.smokingHabit;
    params.drinking = value.drinkingHabit;
    params.physicalStatus = value.physicalStatus;
    params.hobby = value.hobbies;
    this.profileService.updateHabbitDetail(params).subscribe(() => {
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
