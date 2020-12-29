import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!!!this.userService.currentUser) {
      // not logged in so redirect to login page with the return url
      if (this.userService.hasToken) {
        this.userService.getProfile().subscribe(user => {
          this.router.navigateByUrl(state.url);
        }, error => {
          this.userService.purgeAuth();
          this.router.navigate(['/auth']);
          return false;
        });
      } else {
        // Remove any potential remnants of previous auth states
        this.userService.purgeAuth();
        this.router.navigate(['/auth']);
        return false;
      }
    } else {
      // logged in so return true
      return true;
    }
  }

}
