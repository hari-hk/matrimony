import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AutoCompleteComponent } from 'src/app/common/components/auto-complete/auto-complete.component';
import { Masters } from 'src/app/masters/masters';
import { Occupation } from 'src/app/masters/occupation.master';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-family-info',
  templateUrl: './family-info.component.html',
  styleUrls: ['./family-info.component.scss', '../../edit-profile.component.scss']
})
export class FamilyInfoComponent implements OnInit, OnDestroy {

  familyInfoForm: FormGroup;

  subscriptions: Array<Subscription> = [];


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
    private dialog: MatDialog) { }

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
      console.log(response);

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
  togleFormMode(): void {
    this.formOnEdit = !this.formOnEdit;
  }
  updateButtonControl(form, control, value): void {
    this[form].controls[control].setValue(value);
  }
  get fif(): any {
    return this.familyInfoForm.controls;
  }
  openAutoComplete(form, control): void {
    const dialogRef = this.dialog.open(AutoCompleteComponent, {
      width: '320px',
      data: this.getPopUpTitles(control),
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
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
      case 'fatherOccupation':
        data.title = 'Select Occupation';
        data.list = this.occupation;
        break;
      default:
        break;
    }
    return data;
  }

}
