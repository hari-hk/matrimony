import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(userService: UserService) {
    userService.purgeAuth();
  }
}
