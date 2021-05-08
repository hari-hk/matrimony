import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.changePasswordForm = this.fb.group({
      password: ['', Validators.compose([Validators.required])],
    });
  }

  get f(): any {
    return this.changePasswordForm.controls;
  }

  submit(): void {
    if (!this.changePasswordForm.valid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }
    const params: any = {};
    this.userService.changePassword(this.changePasswordForm.value).subscribe(response => {
      this.userService.showToast(response.message);
      this.back();
    });
  }
  back(): void {
    this.router.navigate(['/layout/profile']);
  }

}
