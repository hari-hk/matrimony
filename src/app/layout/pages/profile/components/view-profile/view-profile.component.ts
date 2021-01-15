import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent {
  currenVersion = environment.version;

  user$ = this.userService.profileDetail;

  constructor(private userService: UserService) { }

}
