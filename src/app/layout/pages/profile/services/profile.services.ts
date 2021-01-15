import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Injectable({ providedIn: 'root' })
export class ProfileService {
    constructor(public api: ApiService, public userService: UserService) { }

    updateBasicDetail(params): Observable<any> {
        return this.api.post('editBasicDetails', params);
    }
    updateProffessionalDetail(params): Observable<any> {
        return this.api.post('editProfileDetails', params);
    }
    updateFamilyDetail(params): Observable<any> {
        return this.api.post('editFamilyDetails', params);
    }
    updateHabbitDetail(params): Observable<any> {
        return this.api.post('editHabbitDetails', params);
    }
}

