import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { LoginResponse } from '../../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(600)
      ]),
    ])
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.loginForm = this.fb.group({
      mobile: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  get f() {
    return this.loginForm.controls;
  }
  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe((response: LoginResponse) => {
      if (response?.status) {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      }
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }

  navigateTo(path): void {
    this.router.navigate([path])
  }

}
