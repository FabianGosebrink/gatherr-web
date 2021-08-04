import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { LocalGatheringsApiService } from '@workspace/home/api';
import { MapsService } from '@workspace/maps/util';
import { SnackbarNotificationService } from '@workspace/shared/notification';
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
import { selectAllLocalGatheringsCount } from './home.selectors';

@Injectable()
export class HomeEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private apiService: LocalGatheringsApiService,
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
              homeActions.getLocalGatherings({
                payload: { city, country },
              }),
            ];
          }),
          catchError((error) => of(homeActions.homeError({ payload: error })))
        )
      )
    )
  );

  getLocalGatherings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeActions.getLocalGatherings),
      switchMap(({ payload }) =>
        this.apiService.getLocalGatherings(payload).pipe(
          timeout(10000),
          map((result) =>
            homeActions.getLocalGatheringsComplete({ payload: result })
          ),
          catchError((error) => of(homeActions.homeError({ payload: error })))
        )
      )
    )
  );

  getMoreLocalGatherings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeActions.getMoreLocalGatherings),
      withLatestFrom(this.store.pipe(select(selectAllLocalGatheringsCount))),
      map(([{ payload }, skip]) => {
        return {
          ...payload,
          skip,
        };
      }),
      switchMap((payload) =>
        this.apiService.getLocalGatherings(payload).pipe(
          map((result) =>
            homeActions.getMoreLocalGatheringsComplete({ payload: result })
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
