import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SnackbarNotificationService } from '@workspace/features/notification';
import { ProfileApiService } from '@workspace/profile/api';
import * as sharedProfileActions from '@workspace/shared/state';
import { UploadApiService, UtilsService } from '@workspace/shared/utils';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as profileActions from './profile.actions';

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private apiService: ProfileApiService,
    private utilsService: UtilsService,
    private uploadService: UploadApiService,
    private notificationService: SnackbarNotificationService
  ) {}

  getSharedProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.getProfile),
      switchMap(({ payload }) =>
        this.apiService.getSingle(payload).pipe(
          map((result) =>
            profileActions.getProfileSuccess({ payload: result })
          ),
          catchError((error) =>
            of(
              profileActions.profileError({
                payload: error,
              })
            )
          )
        )
      )
    )
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.updateProfile),
      switchMap(({ payload }) => {
        return this.apiService.update(payload).pipe(
          switchMap((profile) => [
            profileActions.updateProfileSuccess({ payload: profile }),
            sharedProfileActions.updateSharedProfileSuccess({
              payload: profile,
            }),
          ]),
          tap(() => this.notificationService.showSuccess('Profile Updated')),
          catchError((error) =>
            of(profileActions.profileError({ payload: error }))
          )
        );
      })
    )
  );

  updateCompleteProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.updateCompleteProfile),
      switchMap(({ payload, formData }) => {
        if (!this.utilsService.formDataHasData(formData)) {
          return of(
            profileActions.updateProfile({
              payload,
            })
          );
        }

        return of(profileActions.updatePicture({ payload, formData }));
      })
    )
  );

  updatePicture$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.updatePicture),
      switchMap(({ payload, formData }) => {
        return this.uploadService.uploadProfile(formData).pipe(
          map(({ path }) => {
            payload.imageUrl = path;
            return profileActions.updateProfile({ payload });
          }),
          catchError((error) =>
            of(profileActions.profileError({ payload: error }))
          )
        );
      })
    )
  );

  profileError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(profileActions.profileError),
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
