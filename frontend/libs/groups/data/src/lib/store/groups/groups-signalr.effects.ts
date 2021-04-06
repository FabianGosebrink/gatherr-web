import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SnackbarNotificationService } from '@workspace/shared/notification';
import { tap } from 'rxjs/operators';
import * as groupActions from './groups-signalr.actions';

@Injectable()
export class GroupSignalREffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private notificationService: SnackbarNotificationService
  ) {}

  signalrGroupAdded$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(groupActions.signalrGroupAdded),
        tap(({ payload }) => {
          this.notificationService.showSuccess('Group added');
        })
      ),
    { dispatch: false }
  );
}
