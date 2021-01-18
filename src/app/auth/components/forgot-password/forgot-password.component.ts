import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
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
export class ForgotPasswordComponent implements OnInit {


  forgotPassword: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.forgotPassword = this.fb.group({
      phone: ['', Validators.compose([Validators.required])]
    });
  }

  get f(): any {
    return this.forgotPassword.controls;
  }
  submit(): void {
    if (this.forgotPassword.invalid) {
      this.forgotPassword.markAllAsTouched();
      return;
    }
    const params = {
      mobile: this.forgotPassword.value.phone,
      password: ''
    };
    this.authService.forgotPassword(params).subscribe(response => {
      console.log(response);

    });
    // this.router.navigate(['/']);
  }

  openLogin(): void {
    this.router.navigate(['/auth']);
  }

}
