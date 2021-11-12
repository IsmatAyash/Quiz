import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler,
         HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const contentType = 'application/json';
    request = request.clone({ headers: request.headers.set('Accept', contentType),
        withCredentials: true
      });

    if (!(request.body instanceof FormData))
      if (!request.headers.has('Content-Type'))
        request = request.clone({ headers: request.headers.set('Content-Type', contentType) });

    return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              // console.log('event--->>>', event);
            }
            return event;
        }));
  }
}
