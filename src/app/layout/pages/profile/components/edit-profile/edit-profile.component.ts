import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AutoCompleteComponent } from 'src/app/common/components/auto-complete/auto-complete.component';

import { Masters } from 'src/app/masters/masters';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {


  basicInfoForm: FormGroup;
  selfInfoForm: FormGroup;
  proffessionInfoForm: FormGroup;
  familyInfoForm: FormGroup;
  otherInfoForm: FormGroup;


  // Master Array
  maritalStatus: Array<any> = new Masters().maritalStatus;
  dhosam: Array<any> = new Masters().dhosam;
  bodyType: Array<any> = new Masters().body;

  currentEditing: string;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initBasicForm();
    this.initSelfForm();
    this.initProffessionForm();
    this.initFamilyForm();
    this.initOtherForm();
  }

  initBasicForm(): void {
    this.basicInfoForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      mobile: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      about: ['', Validators.compose([Validators.required])],
      maritalStatus: [this.maritalStatus && this.maritalStatus[0]?.id, Validators.compose([Validators.required])],
    });
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
      languagesKnown: ['', Validators.compose([Validators.required])],
    });
  }

  initProffessionForm(): void {
    this.proffessionInfoForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])]
    });
  }

  initFamilyForm(): void {
    this.familyInfoForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])]
    });
  }

  initOtherForm(): void {
    this.otherInfoForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])]
    });
  }


  /*
  * To Access Form control easily
  * @method bif is basic Information Form
  * @method sif is Self Information Form
  * @method pif is Proffessional Information Form
  * @method fif is Family Information Form
  * @method oif is Other Information Form
  */

  get bif(): any {
    return this.basicInfoForm.controls;
  }
  get sif(): any {
    return this.selfInfoForm.controls;
  }
  get pif(): any {
    return this.proffessionInfoForm.controls;
  }
  get fif(): any {
    return this.familyInfoForm.controls;
  }
  get oif(): any {
    return this.otherInfoForm.controls;
  }

  controlForm(formGroup: string): void {
    this.currentEditing = formGroup;
  }


  back(): void {

  }
  updateButtonControl(form, control, value): void {
    this[form].controls[control].setValue(value);

  }

  submitBasicInfo(): void {

  }

  openAutoComplete(form, control): void {
    const dialogRef = this.dialog.open(AutoCompleteComponent, {
      width: '320px',
      data: this.getPopUpTitles(control)
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this[form].controls[control].setValue(result);
      }
    });
  }

  getPopUpTitles(control): any {
    const data = {
      title: '',
      list: []
    };

    // gowthram: ['', Validators.compose([Validators.required])],
    // rasi: ['', Validators.compose([Validators.required])],
    // star: ['', Validators.compose([Validators.required])],
    // height: ['', Validators.compose([Validators.required])],
    // weight: ['', Validators.compose([Validators.required])],
    switch (control) {
      case 'motherTongue':
        data.title = 'Mother Tongue';
        data.list = new Masters().oldLanguages.map(el => {
          return {
            name: el,
            id: el
          };
        });
        break;
      case 'subCaste':
        data.title = 'Sub Caste';
        data.list = new Masters().subCaste.map(el => {
          return {
            name: el.language,
            id: el.id
          };
        });
        break;
      case 'subCaste':
        data.title = 'Sub Caste';
        data.list = new Masters().subCaste.map(el => {
          return {
            name: el.language,
            id: el.id
          };
        });
        break;

      default:
        return data;
    }
    return data;


  }

}
