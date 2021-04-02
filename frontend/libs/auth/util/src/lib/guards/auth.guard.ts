import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthBaseService } from '../auth-base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthBaseService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.handleAuth(state.url);
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.handleAuth(route.path);
  }

  private handleAuth(url) {
    return this.authService.isLoggedIn$.pipe(
      take(1),
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['start']);
          return false;
        }
        return true;
      })
    );
  }
}
