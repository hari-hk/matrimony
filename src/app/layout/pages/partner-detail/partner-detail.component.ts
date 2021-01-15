import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Partner } from 'src/app/common/models/partner.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-partner-detail',
  templateUrl: './partner-detail.component.html',
  styleUrls: ['./partner-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerDetailComponent implements OnInit {

  public subscription: Array<Subscription> = [];
  partnerId: string;
  detail: Partner;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef) {
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
      this.cdr.detectChanges();
    }, err => {
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  addToSortList(): void {
    this.userService.applySortList({ shortListUserId: this.partnerId }).subscribe(res => {
      this.showToast('Successfully Added to SortList');
    }, err => {
      this.showToast(err?.message ? err.message : 'Error');
    });
  }
  addToInterested(): void {
    this.userService.applyInterested({ interestedUserId: this.partnerId }).subscribe(res => {
      this.showToast('Successfully Added to Intersted')
    }, err => {
      this.showToast(err?.message ? err.message : 'Error');
    });
  }

  showToast(message): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000
    });
  }
}
