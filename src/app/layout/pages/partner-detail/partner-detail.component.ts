import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Partner } from 'src/app/common/models/partner.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-partner-detail',
  templateUrl: './partner-detail.component.html',
  styleUrls: ['./partner-detail.component.scss']
})
export class PartnerDetailComponent implements OnInit {

  basicInfo = [
    { key: 'Name', value: 'Divya Dharshini' },
    { key: 'Mobile Number', value: 8428524623 },
    { key: 'Profile Creator', value: 'Self' },
    { key: 'Marital Status', value: 'Un Married' },
    { key: 'Language Known', value: 'Malayalam, Hindi' },
    { key: 'Height', value: '162 cm' },
    { key: 'Weight', value: '60 Kg' },
    { key: 'Age', value: '25' },
  ];
  selfInfo = [
    { key: 'Mother Tongue', value: 'Tamil' },
    { key: 'Religion', value: 'Hindu' },
    { key: 'Caste', value: 'Nadar' },
    { key: 'Sub caste', value: '-' },
    { key: 'Gouthram', value: 'Dont Know' },
    { key: 'Rasi', value: 'Gemini' },
    { key: 'Star', value: 'Mithunam' },
    { key: 'Dosham', value: 'None' },

  ];

  public subscription: Array<Subscription> = [];
  partnerId: string;

  detail: Partner;

  constructor(
    private route: ActivatedRoute,
    public userService: UserService) {
  }

  ngOnInit(): void {
    this.initSubscriptions();
  }

  initSubscriptions(): void {
    this.subscription.push(this.route.params.subscribe(data => {
      this.partnerId = data.id;
      this.getPartnerDetails();
    }));
  }
  getPartnerDetails(): void {
    this.userService.getPartnerDetail(this.partnerId).subscribe((response: Partner) => {
      console.log(response);
      this.detail = response;
    });
  }

}
