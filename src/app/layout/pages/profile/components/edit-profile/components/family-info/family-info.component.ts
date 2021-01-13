import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-family-info',
  templateUrl: './family-info.component.html',
  styleUrls: ['./family-info.component.scss', '../../edit-profile.component.scss']
})
export class FamilyInfoComponent implements OnInit, OnDestroy {

  familyInfoForm: FormGroup;

  subscriptions: Array<Subscription> = [];

  formOnEdit = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService) { }

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
  }
  getProfileDetails(): void {
    this.subscriptions.push(this.userService.profileDetail.subscribe(response => {
      if (!response) {
        return;
      }
      // this.setBasicForm(response);
    }));
  }
  togleFormMode(): void {
    this.formOnEdit = !this.formOnEdit;
  }
  updateButtonControl(form, control, value): void {
    this[form].controls[control].setValue(value);
  }
  get fif(): any {
    return this.familyInfoForm.controls;
  }
}
