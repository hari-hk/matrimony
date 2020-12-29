import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    profileDetail = new BehaviorSubject(null);

    constructor(private api: ApiService) {
    }

    get hasToken(): boolean {
        return !!localStorage.getItem('token');
    }
    get getToken(): string {
        return localStorage.getItem('token');
    }

    public getProfile(): Observable<any> {
        return this.api.get('getProfileDetails', { token: this.getToken }).pipe(
            tap(response => {
                this.profileDetail.next(response.dashboard[0]);
                return response;
            }));
    }

    get currentUser(): any {
        return this.profileDetail.value;
    }

    purgeAuth(): void {
        localStorage.removeItem('token');
    }

}
