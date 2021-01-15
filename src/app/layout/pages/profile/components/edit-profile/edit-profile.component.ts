import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {



  subscriptions: Array<Subscription> = [];

  constructor(
    private userService: UserService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe(() => { });
    this.getProfileDetails();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  back(): void {
    this.router.navigate(['/layout/profile']);
  }

  getProfileDetails(): void {
    this.subscriptions.push(this.userService.profileDetail.subscribe(response => {
      if (!response) {
        return;
      }
    }));
  }

  fileChanged(element, type): void {
    const file = element?.target?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }
  }

}
