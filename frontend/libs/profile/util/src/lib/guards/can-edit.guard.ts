import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectSharedCurrentUserProfile } from '@workspace/shared/state';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CanEditGuard implements CanActivate {
  constructor(private store: Store<any>) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.handleAuth(next);
  }

  private handleAuth(url: ActivatedRouteSnapshot) {
    return this.store.pipe(
      select(selectSharedCurrentUserProfile),
      map((currentProfile) => {
        const idInRoute = url.params.id;
        const idsMatch = idInRoute === currentProfile.id;

        return idsMatch;
      })
    );
  }
}
