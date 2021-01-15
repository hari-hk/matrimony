import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-partner-profile',
  templateUrl: './edit-partner-profile.component.html',
  styleUrls: ['./edit-partner-profile.component.scss']
})
export class EditPartnerProfileComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  back(): void {
    this.router.navigate(['/layout/profile']);
  }
}
