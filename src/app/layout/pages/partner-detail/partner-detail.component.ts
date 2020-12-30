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

  public subscription: Array<Subscription> = [];
  partnerId: string;
  detail: Partner;
  loading = true;

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
      this.detail = response;
      this.loading = false;
    }, err => { this.loading = false; });
  }
}
