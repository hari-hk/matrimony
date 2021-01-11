import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ApiService } from './api.service';


import { Count } from '../common/models/count.model';
import { Partner } from '../common/models/partner.model';


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
        return this.api.get('getProfileDetails').pipe(
            tap(response => {
                this.profileDetail.next(response.dashboard[0]);
                return response;
            }));
    }

    get currentUser(): any {
        return this.profileDetail.value;
    }

    public purgeAuth(): void {
        localStorage.removeItem('token');
    }

    public getCount(): Observable<Count> {
        return this.api.get('count').pipe(
            map(resp => new Count(resp))
        );
    }

    public getPartnerDetail(id): Observable<any> {
        return this.api.post('getDetailPage', { id }).pipe(
            map(payload => new Partner(payload.dashboard[0]))
        );
    }

    public applyInterested(params): Observable<any> {
        return this.api.get('interestedList', params);
    }
    public getInterestedList(): Observable<any> {
        return this.api.get('getInterestedList');
    }
    public applySortList(params): Observable<any> {
        return this.api.get('shortList', params);
    }
    public getSortList(params): Observable<any> {
        return this.api.post('getShortList', params);
    }

}
