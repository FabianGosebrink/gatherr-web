import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { SnackbarNotificationService } from '@workspace/features/notification';
import { LocalMeetupsApiService } from '@workspace/home/api';
import { MapsService } from '@workspace/maps/util';
import { AddressExtractor } from '@workspace/shared/utils';
import { of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  tap,
  timeout,
  withLatestFrom,
} from 'rxjs/operators';
import * as homeActions from './home.actions';
import { selectAllLocalMeetupsCount } from './home.selectors';

@Injectable()
export class HomeEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private apiService: LocalMeetupsApiService,
    private mapsService: MapsService,
    private addressExtractor: AddressExtractor,
    private notificationService: SnackbarNotificationService
  ) {}

  getCurrentPlace$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeActions.getCurrentPlace),
      switchMap(() =>
        this.mapsService.getCurrentCity().pipe(
          switchMap((address: any) => {
            const payload = {
              city: this.addressExtractor.extract(address, 'locality')
                ?.long_name,
              country: this.addressExtractor.extract(address, 'country')
                ?.long_name,
              lat: address.geometry.location.lat(),
              lng: address.geometry.location.lng(),
            };

            const { city, country } = payload;

            return [
              homeActions.getCurrentPlaceComplete({ payload }),
              homeActions.getLocalMeetups({
                payload: { city, country },
              }),
            ];
          }),
          catchError((error) => of(homeActions.homeError({ payload: error })))
        )
      )
    )
  );

  getLocalMeetups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeActions.getLocalMeetups),
      switchMap(({ payload }) =>
        this.apiService.getLocalMeetups(payload).pipe(
          timeout(10000),
          map((result) =>
            homeActions.getLocalMeetupsComplete({ payload: result })
          ),
          catchError((error) => of(homeActions.homeError({ payload: error })))
        )
      )
    )
  );

  getMoreLocalMeetups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeActions.getMoreLocalMeetups),
      withLatestFrom(this.store.pipe(select(selectAllLocalMeetupsCount))),
      map(([{ payload }, skip]) => {
        return {
          ...payload,
          skip,
        };
      }),
      switchMap((payload) =>
        this.apiService.getLocalMeetups(payload).pipe(
          map((result) =>
            homeActions.getMoreLocalMeetupsComplete({ payload: result })
          ),
          catchError((error) => of(homeActions.homeError({ payload: error })))
        )
      )
    )
  );

  homeError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(homeActions.homeError),
        tap(({ payload }) =>
          this.notificationService.showError(
            payload.statusText || payload.message || JSON.stringify(payload)
          )
        )
      ),
    { dispatch: false }
  );
}
