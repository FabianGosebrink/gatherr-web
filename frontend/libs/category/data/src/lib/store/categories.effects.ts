import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesApiService } from '@workspace/category/api';
import { SnackbarNotificationService } from '@workspace/features/notification';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as fromCategoriesActions from './categories.actions';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private apiService: CategoriesApiService,
    private notificationService: SnackbarNotificationService
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCategoriesActions.getAll),
      switchMap(() =>
        this.apiService.getAll().pipe(
          map((result) =>
            fromCategoriesActions.getAllSuccess({ payload: result })
          ),
          catchError((error) =>
            of(fromCategoriesActions.categoryError({ payload: error }))
          )
        )
      )
    )
  );

  categoryError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromCategoriesActions.categoryError),
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
