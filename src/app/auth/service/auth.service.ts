import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

import { Login } from '../models/login.model';
import { RegisterValidate } from '../models/register.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public api: ApiService) { }

  public login(params: Login): Observable<any> {
    return this.api.get('user/login', params);
  }

  public validateEmail(params: RegisterValidate): Observable<any> {
    return this.api.post('validateEmail', params);
  }
  public forgotPassword(params: any): Observable<any> {
    return this.api.post('forgotPassword', params);
  }

}
