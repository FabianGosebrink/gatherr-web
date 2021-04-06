import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SnackbarNotificationService } from '@workspace/shared/notification';
import { SharedProfileApiService } from '@workspace/shared/api';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as sharedProfileActions from './shared-profile.actions';

@Injectable()
export class SharedProfileEffects {
  constructor(
    private actions$: Actions,
    private apiService: SharedProfileApiService,
    private notificationService: SnackbarNotificationService
  ) {}

  getSharedProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sharedProfileActions.getSharedProfile),
      switchMap(() =>
        this.apiService.getSingle().pipe(
          map((result) =>
            sharedProfileActions.getSharedProfileSuccess({ payload: result })
          ),
          catchError((error) =>
            of(sharedProfileActions.sharedProfileError({ payload: error }))
          )
        )
      )
    )
  );

  addSharedProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sharedProfileActions.addSharedProfile),
      switchMap(({ payload }) =>
        this.apiService.addProfile(payload).pipe(
          map((result) =>
            sharedProfileActions.addSharedProfileSuccess({ payload: result })
          ),
          catchError((error) =>
            of(sharedProfileActions.sharedProfileError({ payload: error }))
          )
        )
      )
    )
  );

  sharedProfileError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sharedProfileActions.sharedProfileError),
        tap(({ payload }) =>
          this.notificationService.showError(
            payload.statusText || payload.message || JSON.stringify(payload)
          )
        )
      ),
    {
      dispatch: false,
    }
  );
}
