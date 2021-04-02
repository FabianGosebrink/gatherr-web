import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectSharedCurrentUserProfile } from '@workspace/shared/state';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RedirectToEditGuard implements CanActivate {
  constructor(private router: Router, private store: Store<any>) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.handleAuth(next);
  }

  private handleAuth(url: ActivatedRouteSnapshot) {
    return this.store.pipe(
      select(selectSharedCurrentUserProfile),
      map((currentProfile) => {
        const idInRoute = url.params.id;
        const idsMatch = idInRoute === currentProfile.id;

        if (idsMatch) {
          return this.router.parseUrl(`/profile/${idInRoute}/edit`);
        }

        return true;
      })
    );
  }
}
