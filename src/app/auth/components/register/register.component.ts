import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterValidate } from '../../models/register.model';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
export class RegisterComponent implements OnInit {

  loginForm: FormGroup;
  otpForm: FormGroup;

  loading: boolean;

  showOtpPage: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.loginForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      mobile: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
      createdBy: ['self', Validators.compose([Validators.required])]
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
    let params = new RegisterValidate();
    params = {
      email: this.loginForm.value.email,
      mobile: this.loginForm.value.mobile
    }
    this.authService.validateEmail(params).subscribe(response => {
      console.log(response);
      this.loading = false;
      this.showOtpPage = true;
      this.initOtpForm();
    }, err => {
      this.loading = false;
      console.log(err);
    })
  }

  initOtpForm(): void {
    this.otpForm = this.fb.group({
      otp: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])]
    })
  }
  showRegister() {
    this.showOtpPage = false;
    this.otpForm.reset();
  }

  selectCreatedBy(value) {
    this.f['createdBy'].setValue(value);
  }
  openLogin(): void {
    this.router.navigate(['/auth'])
  }

  submitOtp(): void {

  }
}
