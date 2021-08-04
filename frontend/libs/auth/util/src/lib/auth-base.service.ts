import { Injectable } from '@angular/core';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthBaseService {
  constructor(private authService: OidcSecurityService) {}

  get isLoggedIn$(): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      map(({ isAuthenticated }) => isAuthenticated)
    );
  }

  get token$(): Observable<string> {
    return of(this.authService.getAccessToken());
  }

  get user$(): Observable<any> {
    return this.authService.userData$;
  }

  login(): void {
    this.authService.authorize();
  }

  checkAuth(): Observable<LoginResponse> {
    return this.authService.checkAuth();
  }

  logout(): void {
    this.authService.logoff();
  }
}
