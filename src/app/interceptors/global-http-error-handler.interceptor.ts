import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, retry, throwError, timer } from 'rxjs';

@Injectable()
export class GlobalHttpErrorHandlerInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry({
        count: 1,
        // delay: (_, retryCount) => timer(retryCount * 500),
        delay: 1000,
      }),
      catchError(error => {
        return throwError(() => {
          console.log('Error caught and rethrown by HTTP interceptor.');
          return error;
        });
      })
    );
  }
}
