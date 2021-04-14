import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SnackbarNotificationService } from '@workspace/shared/notification';
import { PersonalApiService } from '@workspace/personal/api';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as personalActions from './personal.actions';

@Injectable()
export class PersonalEffects {
  constructor(
    private actions$: Actions,
    private apiService: PersonalApiService,
    private notificationService: SnackbarNotificationService
  ) {}

  getAllPersonalGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(personalActions.getAllPersonalGroups),
      switchMap((action) =>
        this.apiService.getAllPersonalGroups().pipe(
          map((result) =>
            personalActions.getAllPersonalGroupsSuccess({ payload: result })
          ),
          catchError((error) =>
            of(personalActions.personalError({ payload: error }))
          )
        )
      )
    )
  );

  getAllPersonalMeetups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(personalActions.getAllPersonalMeetups),
      switchMap((action) =>
        this.apiService.getAllPersonalMeetups().pipe(
          map((result) =>
            personalActions.getAllPersonalMeetupsSuccess({ payload: result })
          ),
          catchError((error) =>
            of(personalActions.personalError({ payload: error }))
          )
        )
      )
    )
  );

  personalError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(personalActions.personalError),
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
