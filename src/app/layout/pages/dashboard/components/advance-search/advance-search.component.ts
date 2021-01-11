import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AutoCompleteComponent } from 'src/app/common/components/auto-complete/auto-complete.component';
import { CommonService } from 'src/app/common/services/common.service';


import { Masters } from 'src/app/masters/masters';
import { Income } from 'src/app/masters/income.master';
import { Languages } from 'src/app/masters/language.master';
import { Occupation } from 'src/app/masters/occupation.master';

import { AdvanceSearch } from '../../models/search.model';
@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.scss']
})
export class AdvanceSearchComponent implements OnInit {

  filterData = new AdvanceSearch();
  numbers = {
    from: [],
    to: []
  };

  height = new Masters().height;
  annualIncome = new Income().annualIncome;
  languages = new Languages().languages;
  dhosam = new Masters().dhosam;
  star = new Masters().star;
  occupation = new Occupation().occupation;
  martialStatus = [];
  subcaste = [];
  constructor(
    private dialog: MatDialog,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.calculateNumbers('from');
    this.getFilterApi();
  }

  getFilterApi(): void {
    this.commonService.getMaritalStatus().subscribe(response => {
      this.martialStatus = response.MaritalStatus.map(el => {
        return {
          id: el.marital_id,
          name: el.marital_status
        };
      });
    });

    this.commonService.getAllSubcaste().subscribe(response => {
      this.subcaste = response.Subcaste.map(el => {
        return {
          id: el.subcasteId,
          name: el.subcasteName,
          parentName: el.casteName
        };
      });
    });
  }

  calculateNumbers(assignTo: string, staringIdx?: number): void {
    this.numbers[assignTo] = [];
    for (let index = staringIdx ? staringIdx : 18; index < 100; index++) {
      this.numbers[assignTo].push(index);
    }
  }

  openAutoComplete(control): void {
    const dialogRef = this.dialog.open(AutoCompleteComponent, {
      width: '320px',
      data: this.getPopUpTitles(control)
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterData[control] = result;
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
      case 'ageFrom':
        data.title = 'Age From';
        data.list = this.numbers.from.map(el => {
          return {
            name: JSON.stringify(el),
            id: JSON.stringify(el)
          };
        });
        break;
      case 'ageTo':
        this.calculateNumbers('to', +this.filterData.ageFrom);
        data.title = 'Age To';
        data.list = this.numbers.to.map(el => {
          return {
            name: JSON.stringify(el),
            id: JSON.stringify(el)
          };
        });
        break;

      case 'heightFrom':
      case 'heightTo':
        data.title = 'Select Height';
        data.list = this.height;
        break;
      case 'maritalStatus':
        data.title = 'Select Martial Status';
        data.list = this.martialStatus;
        break;
      case 'motherTongue':
        data.title = 'Select Mother Tongue';
        data.list = this.languages;
        break;
      case 'subcaste':
        data.title = 'Select Subcaste';
        data.list = this.subcaste;
        data.multiple = true;
        break;
      case 'star':
        data.title = 'Select Star';
        data.list = this.star;
        data.multiple = true;
        break;
      case 'dosham':
        data.title = 'Select Dhosham';
        data.list = this.dhosam;
        data.multiple = true;
        break;
      case 'occupation':
        data.title = 'Select Occupation';
        data.list = this.occupation;
        break;
      case 'annualIncome':
        data.title = 'Select Annual Income';
        data.list = this.martialStatus;
        break;

      default:
        break;
    }

    return data;

  }

}
