import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AutoCompleteComponent } from 'src/app/common/components/auto-complete/auto-complete.component';
import { HigherEducation } from 'src/app/masters/higher-education.master';
import { Income } from 'src/app/masters/income.master';
import { Masters } from 'src/app/masters/masters';
import { Occupation } from 'src/app/masters/occupation.master';
import { UserService } from 'src/app/services/user.service';

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
  locations = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog
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
      case 'occupation':
        data.title = 'Select Occupation';
        data.list = this.occupation;
        break;
      case 'annualIncome':
        data.title = 'Select Annual Income';
        data.list = this.annualIncome;
        break;
      case 'higherEducation':
        data.title = 'Select Higher Education';
        data.list = this.education;
        break;
      case 'employedIn':
        data.title = 'Select Employed In';
        data.list = this.employedIn;
        break;
      default:
        break;
    }
    return data;
  }

  get pif(): any {
    return this.proffessionInfoForm.controls;
  }
}
