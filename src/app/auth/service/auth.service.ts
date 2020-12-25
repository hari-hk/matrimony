import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public api: ApiService) { }

  public login(params): Observable<any> {
    return this.api.get('user/login', params);
  }

}
