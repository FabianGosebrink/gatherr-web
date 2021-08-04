import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SnackbarNotificationService } from '@workspace/shared/notification';
import { tap } from 'rxjs/operators';
import * as gatheringActions from './gathering-signalr.actions';

@Injectable()
export class GatheringsSignalREffects {
  constructor(
    private actions$: Actions,
    private notificationService: SnackbarNotificationService
  ) {}

  signalrGatheringMemberRemoved$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(gatheringActions.signalrGatheringMemberRemoved),
        tap(({ payload }) =>
          this.notificationService.showSuccess('A member was removed')
        )
      ),
    { dispatch: false }
  );

  signalrGatheringMemberAdded$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(gatheringActions.signalrGatheringMemberAdded),
        tap(({ payload }) =>
          this.notificationService.showSuccess('A member was added')
        )
      ),
    { dispatch: false }
  );
}
