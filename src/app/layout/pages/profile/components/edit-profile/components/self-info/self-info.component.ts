import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AutoCompleteComponent } from 'src/app/common/components/auto-complete/auto-complete.component';
import { Languages } from 'src/app/masters/language.master';
import { Masters } from 'src/app/masters/masters';
import { UserService } from 'src/app/services/user.service';

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
  languages = new Languages().languages;
  dhosam = new Masters().dhosam;
  star = new Masters().star;
  rasi = new Masters().rasi;
  gowthram = new Masters().gowthram;
  martialStatus = [];
  subcaste = [];

  subscriptions: Array<Subscription> = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog
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
  }
  get sif(): any {
    return this.selfInfoForm.controls;
  }
  getProfileDetails(): void {
    this.subscriptions.push(this.userService.profileDetail.subscribe(response => {
      if (!response) {
        return;
      }
      this.setSelfForm(response);
    }));
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
      case 'motherTongue':
        data.title = 'Select Mother Tongue';
        data.list = this.languages.map((el: any) => {
          el.id = el.name;
          return el;
        });
        break;
      case 'subcaste':
        data.title = 'Select Subcaste';
        data.list = this.subcaste;
        break;
      case 'gowthram':
        data.title = 'Select Gowthram';
        data.list = this.gowthram.map((el: any) => {
          el.id = el.name;
          return el;
        });
        break;
      case 'star':
        data.title = 'Select Star';
        data.list = this.star.map((el: any) => {
          el.id = el.name;
          return el;
        });
        break;
      case 'rasi':
        data.title = 'Select Rasi';
        data.list = this.rasi.map((el: any) => {
          el.id = el.name;
          return el;
        });
        break;
      case 'dhosam':
        data.title = 'Select Dhosham';
        data.list = this.dhosam;
        data.multiple = true;
        break;

      case 'height':
        data.title = 'Select Height';
        data.list = this.height;
        break;
      case 'weight':
        data.title = 'Select Weight';
        data.list = this.weight;
        break;
      case 'maritalStatus':
        data.title = 'Select Martial Status';
        data.list = this.martialStatus;
        break;
      case 'languagesKnown':
        data.title = 'Select Mother Tongue';
        data.list = this.languages.map((el: any) => {
          el.id = el.name;
          return el;
        });
        data.multiple = true;
        break;
      default:
        break;
    }
    return data;
  }
  updateButtonControl(form, control, value): void {
    this[form].controls[control].setValue(value);
  }
  togleFormMode(): void {
    this.formOnEdit = !this.formOnEdit;
  }
}
