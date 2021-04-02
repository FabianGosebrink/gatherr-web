import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SnackbarNotificationService } from '@workspace/features/notification';
import { tap } from 'rxjs/operators';
import * as meetupActions from './meetup-signalr.actions';

@Injectable()
export class MeetupsSignalREffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private notificationService: SnackbarNotificationService
  ) {}

  signalrMeetupMemberRemoved$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(meetupActions.signalrMeetupMemberRemoved),
        tap(({ payload }) =>
          this.notificationService.showSuccess('A member was removed')
        )
      ),
    { dispatch: false }
  );

  signalrMeetupMemberAdded$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(meetupActions.signalrMeetupMemberAdded),
        tap(({ payload }) =>
          this.notificationService.showSuccess('A member was added')
        )
      ),
    { dispatch: false }
  );
}
