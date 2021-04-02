import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { AuthBaseService } from '../auth-base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthBaseService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // // return next.handle(req);

    // return this.auth.token$.pipe(
    //   map((user) =>
    //     req.clone({ setParams: { 'access-token': user.accessToken } })
    //   ),
    //   mergeMap((req) => next.handle(req))
    // );

    return this.auth.token$.pipe(
      take(1),
      mergeMap((token) => {
        if (token) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        return next.handle(req);
      })
    );
  }
}
