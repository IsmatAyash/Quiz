import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { SnackBarService } from 'shared/services/snack-bar.service';

@Injectable()
export class ErrorIntercept implements HttpInterceptor {
  constructor(public snackbarService: SnackBarService) {}

  intercept(
      request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
          .pipe(
              retry(1),
              catchError((error: HttpErrorResponse) => {
                  let errorMessage = '';
                  if (error.error instanceof ErrorEvent)
                      errorMessage = `Error: ${error.error.message}`;
                  else
                      errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;

                  this.snackbarService.openSnackBar(errorMessage, 'error');
                  return throwError(errorMessage);
              })
          );
  }
}
