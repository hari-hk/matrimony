import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, repeat } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

import { Count } from '../models/count.model';
import { Matches } from '../models/matches.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private api: ApiService) { }


  public getCount(): Observable<Count> {
    return this.api.get('count').pipe(
      map(resp => new Count(resp))
    );
  }

  public getMatches(): Observable<Matches> {
    return this.api.post('matches', { limit: 10, offset: 0 }).pipe(
      map(resp => {
        return resp?.dashboard?.length ? resp.dashboard.map(res => new Matches(res)) : [];
      })
    );
  }
}
