import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-other-info',
  templateUrl: './other-info.component.html',
  styleUrls: ['./other-info.component.scss', '../../edit-profile.component.scss']
})
export class OtherInfoComponent implements OnInit {

  otherInfoForm: FormGroup;
  subscriptions: Array<Subscription> = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
  }
  initOtherForm(): void {
    this.otherInfoForm = this.fb.group({
      eatingHabit: ['', Validators.compose([Validators.required])],
      drinkingHabit: ['', Validators.compose([Validators.required])],
      smokingHabit: ['', Validators.compose([Validators.required])],
      physicalStatus: ['', Validators.compose([Validators.required])],
      hobbies: ['', Validators.compose([Validators.required])]
    });
  }

  getProfileDetails(): void {
    this.subscriptions.push(this.userService.profileDetail.subscribe(response => {
      if (!response) {
        return;
      }
    }));
  }
  get oif(): any {
    return this.otherInfoForm.controls;
  }
  updateButtonControl(form, control, value): void {
    this[form].controls[control].setValue(value);
  }
}
