import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private api: ApiService) { }


  public getAllCaste(): Observable<any> {
    return this.api.get('getAllCaste');
  }
  public getAllSubcaste(): Observable<any> {
    return this.api.get('getAllSubcaste');
  }
  public getMaritalStatus(): Observable<any> {
    return this.api.get('getMaritalStatus');
  }
  public getMaritalChild(): Observable<any> {
    return this.api.get('getMaritalChild');
  }
  public getHoroscope(): Observable<any> {
    return this.api.get('getHoroscope');
  }

}
