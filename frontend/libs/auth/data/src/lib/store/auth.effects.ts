import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthBaseService } from '@workspace/auth/util';
import { addSharedProfile } from '@workspace/shared/state';
import { of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import * as fromAuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthBaseService
  ) {}

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.login),
        tap(() => this.authService.login())
      ),
    { dispatch: false }
  );

  checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.checkAuth),
      switchMap(() => this.authService.checkAuth()),
      switchMap(({isAuthenticated}) => {
        if (isAuthenticated) {
          return of(fromAuthActions.loginComplete({ isLoggedIn: isAuthenticated}));
        }

        return of(fromAuthActions.logoutComplete());
      })
    )
  );

  loginComplete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.loginComplete),
      switchMap(() => this.authService.user$),
      take(1),
      switchMap(({userData}) => {
        const { sub, name, picture } = userData;
        return [
          addSharedProfile({
            payload: {
              username: name,
              userIdentifier: sub,
              imageUrl: picture,
            },
          }),
          fromAuthActions.setProfile({ profile: userData }),
        ];
      })
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.logout),
        map(() => this.authService.logout()),
        map(() => fromAuthActions.logoutComplete())
      ),
    {
      dispatch: false,
    }
  );
}
