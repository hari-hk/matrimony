import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public get(url: string, body?: any): Observable<any> {
    return this.http.get(environment.baseUrl + url, { params: body });
  }

  public post(url: string, body: any): Observable<any> {
    return this.http.post(environment.baseUrl + url, body);
  }
}
