import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { AutoCompleteComponent } from 'src/app/common/components/auto-complete/auto-complete.component';
import { Masters } from 'src/app/masters/masters';
import { UserService } from 'src/app/services/user.service';

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
    }
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog
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
    this.formOnEdit = !this.formOnEdit;
  }
  openAutoComplete(form, control): void {
    const dialogRef = this.dialog.open(AutoCompleteComponent, {
      width: '320px',
      data: this.getPopUpTitles(control),
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this[form].controls[control].setValue(result);
      }
    });
  }
  getPopUpTitles(control): any {
    const data: any = {
      title: '',
      list: [],
      multiple: false
    };
    switch (control) {
      case 'hobbies':
        data.title = 'Select Hobbies';
        data.list = this.hobbies;
        data.multiple = true
        break;
      default:
        break;
    }
    return data;
  }
}
