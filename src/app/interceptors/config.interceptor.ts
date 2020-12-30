import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Injectable()
export class ConfigInterceptor implements HttpInterceptor {

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.userService.hasToken) {
      // request = request.clone({
      //   setHeaders: {
      //     token: `Bearer ${this.userService.getToken}`
      //   }
      // });
      request = request.clone({
        params: request.params.set('token', this.userService.getToken)
      })
    }

    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          this.handleError(error);
          return throwError(error?.error);
        })
      );
  }
  handleError(err: HttpErrorResponse): void {
    switch (err.status) {
      case 401:
        this.snackBar.open(err.error.message ? err.error.message : 'Please Login', 'OK', {
          duration: 3000
        });
        this.router.navigate(['/auth']);
        break;

      default:
        break;
    }

  }
}
