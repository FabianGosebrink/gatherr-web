import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { ContactApiService, GatheringsApiService } from '@workspace/groups/api';
import { MapsService } from '@workspace/maps/util';
import { GatheringState } from '@workspace/shared/data';
import { SnackbarNotificationService } from '@workspace/shared/notification';
import { selectRouteParam } from '@workspace/shared/state';
import { UploadApiService, UtilsService } from '@workspace/shared/utils';
import { of } from 'rxjs';
import {
  catchError,
  flatMap,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import * as gatheringActions from './gatherings.actions';
import * as gatheringSelectors from './gatherings.selectors';

@Injectable()
export class GatheringEffects {
  constructor(
    private actions$: Actions,
    private gatheringApiService: GatheringsApiService,
    private mapsService: MapsService,
    private router: Router,
    private store: Store<any>,
    private notificationService: SnackbarNotificationService,
    private uploadService: UploadApiService,
    private contactApiService: ContactApiService,
    private utilService: UtilsService
  ) {}

  addGatheringToGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gatheringActions.addGatheringToCurrentGroup),
      withLatestFrom(this.store.pipe(select(selectRouteParam('id')))),
      switchMap(([{ gathering, formData }, id]) => {
        if (!this.utilService.formDataHasData(formData)) {
          return of(
            gatheringActions.addGathering({ groupLinkName: id, gathering })
          );
        }

        return this.uploadService.uploadGathering(formData).pipe(
          map(({ path }) => {
            gathering.imageUrl = path;
            return gatheringActions.addGathering({
              groupLinkName: id,
              gathering,
            });
          })
        );
      })
    )
  );

  addGathering$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gatheringActions.addGathering),
      switchMap(({ groupLinkName, gathering }) =>
        this.gatheringApiService
          .addGatheringToGroup(groupLinkName, gathering)
          .pipe(
            map(
              (result) =>
                gatheringActions.addGatheringToCurrentGroupSuccess({
                  groupLinkName,
                  gathering: result,
                }),
              catchError((error) =>
                of(gatheringActions.gatheringError({ payload: error }))
              )
            )
          )
      )
    )
  );

  updateGathering$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gatheringActions.updateGathering),
      withLatestFrom(this.store.pipe(select(selectRouteParam('id')))),
      switchMap(([{ gathering }, groupLinkName]) =>
        this.gatheringApiService.update(groupLinkName, gathering).pipe(
          map(
            (newGathering) =>
              gatheringActions.updateGatheringSuccess({
                gathering: newGathering,
              }),
            catchError((error) =>
              of(gatheringActions.gatheringError({ payload: error }))
            )
          )
        )
      )
    )
  );

  redirectToGathering$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          gatheringActions.addGatheringToCurrentGroupSuccess,
          gatheringActions.updateGatheringSuccess,
          gatheringActions.cancelGatheringSuccess
        ),
        withLatestFrom(this.store.pipe(select(selectRouteParam('id')))),
        tap(([{ gathering }, groupLinkName]) =>
          this.router.navigate([
            '/groups',
            groupLinkName,
            'gatherings',
            gathering.value.linkName,
          ])
        )
      ),
    { dispatch: false }
  );

  getAllGatherings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gatheringActions.getAllGatheringsFromGroup),
      withLatestFrom(this.store.pipe(select(selectRouteParam('id')))),
      switchMap(([action, groupLinkName]) =>
        this.gatheringApiService.getGatheringsFromGroup(groupLinkName).pipe(
          map((result) =>
            gatheringActions.getAllGatheringsFromGroupSuccess({
              payload: result,
            })
          ),
          catchError((error) =>
            of(gatheringActions.gatheringError({ payload: error }))
          )
        )
      )
    )
  );

  getSingle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gatheringActions.getSingleGathering),
      withLatestFrom(
        this.store.pipe(select(selectRouteParam('id'))),
        this.store.pipe(select(selectRouteParam('gatheringid')))
      ),
      switchMap(([action, id, gatheringId]) =>
        this.gatheringApiService.getSingle(id, gatheringId).pipe(
          flatMap((result) => [
            gatheringActions.getSingleGatheringSuccess({ payload: result }),
            gatheringActions.getAttendeesFromCurrentGathering({
              payload: result,
            }),
            gatheringActions.getGatheringsAddress(),
          ]),
          catchError((error) =>
            of(gatheringActions.gatheringError({ payload: error }))
          )
        )
      )
    )
  );

  cancelGathering$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gatheringActions.cancelGathering),
      withLatestFrom(
        this.store.pipe(select(gatheringSelectors.selectCurrentGathering))
      ),
      switchMap(([_, currentGathering]) => {
        currentGathering.state =
          currentGathering.state === GatheringState.Cancelled
            ? GatheringState.Ok
            : GatheringState.Cancelled;

        return this.gatheringApiService
          .update(currentGathering.groupLinkName, currentGathering)
          .pipe(
            tap(() =>
              this.notificationService.showSuccess('Gathering is updated')
            ),
            map(
              (gathering) =>
                gatheringActions.cancelGatheringSuccess({
                  gathering,
                }),
              catchError((error) =>
                of(gatheringActions.gatheringError({ payload: error }))
              )
            )
          );
      })
    )
  );

  getGatheringsAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gatheringActions.getGatheringsAddress),
      withLatestFrom(
        this.store.pipe(select(gatheringSelectors.selectCurrentGathering))
      ),
      switchMap(([action, { latitude, longitude }]) =>
        this.mapsService
          .getAddressByLatitudeLongitude(latitude, longitude)
          .pipe(
            map((address: string) =>
              gatheringActions.getGatheringsAddressSuccess({ address })
            ),
            catchError((error) =>
              of(gatheringActions.gatheringError({ payload: error }))
            )
          )
      )
    )
  );

  getAttendeesFromCurrentGathering$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gatheringActions.getAttendeesFromCurrentGathering),
      switchMap(({ payload }) =>
        this.gatheringApiService
          .getAllAttendeesFromGathering(
            payload.value.groupLinkName,
            payload.value.id
          )
          .pipe(
            map((result) =>
              gatheringActions.getAttendeesFromCurrentGatheringSuccess({
                payload: result,
              })
            ),
            catchError((error) =>
              of(gatheringActions.gatheringError({ payload: error }))
            )
          )
      )
    )
  );

  addCurrentUserToAttendGathering$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(gatheringActions.addCurrentUserToAttendGathering),
        withLatestFrom(
          this.store.pipe(select(gatheringSelectors.selectCurrentGathering))
        ),
        switchMap(([action, gathering]) =>
          this.gatheringApiService
            .addUserAsAttendee(gathering.groupLinkName, gathering.id)
            .pipe(
              tap(() =>
                this.notificationService.showSuccess('You attend the gathering')
              ),
              catchError((error) =>
                of(gatheringActions.gatheringError({ payload: error }))
              )
            )
        )
      ),
    { dispatch: false }
  );

  removeCurrentUserFromGatheringAttendees$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(gatheringActions.removeCurrentUserFromGatheringAttendees),
        withLatestFrom(
          this.store.pipe(select(gatheringSelectors.selectCurrentMember)),
          this.store.pipe(select(gatheringSelectors.selectCurrentGathering))
        ),
        switchMap(([action, gatheringMember, gathering]) =>
          this.gatheringApiService
            .removeUserFromAttendees(
              gathering.groupLinkName,
              gathering.id,
              gatheringMember.memberId
            )
            .pipe(
              tap(() => {
                this.notificationService.showSuccess('You left the gathering');
                this.router.navigate(['/groups', gathering.groupLinkName]);
              }),
              catchError((error) =>
                of(gatheringActions.gatheringError({ payload: error }))
              )
            )
        )
      ),
    { dispatch: false }
  );

  updateMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gatheringActions.updateGatheringMember),
      withLatestFrom(
        this.store.pipe(select(gatheringSelectors.selectCurrentGathering))
      ),
      switchMap(([{ memberId, role }, { groupLinkName, id }]) =>
        this.gatheringApiService
          .updateMember(groupLinkName, id, memberId, role)
          .pipe(
            tap(() => this.notificationService.showSuccess('Member updated')),
            map((result) =>
              gatheringActions.updateGatheringMemberSuccess({ payload: result })
            ),
            catchError((error) =>
              of(gatheringActions.gatheringError({ payload: error }))
            )
          )
      )
    )
  );

  getGatheringRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gatheringActions.getGatheringRoles),
      switchMap(() =>
        this.gatheringApiService.getAllGatheringRoles().pipe(
          map((result) =>
            gatheringActions.getGatheringRolesSuccess({ payload: result })
          ),
          catchError((error) =>
            of(gatheringActions.gatheringError({ payload: error }))
          )
        )
      )
    )
  );

  sendGatheringMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gatheringActions.sendGatheringMessage),
      withLatestFrom(
        this.store.pipe(select(gatheringSelectors.selectCurrentGathering))
      ),
      switchMap(([{ payload }, { id }]) => {
        payload.gatheringId = id;
        return this.contactApiService.contactGathering(payload).pipe(
          tap(() => this.notificationService.showSuccess('Message sent')),
          map(() => gatheringActions.sendGatheringMessageSuccess()),
          catchError((error) =>
            of(gatheringActions.gatheringError({ payload: error }))
          )
        );
      })
    )
  );

  gatheringError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(gatheringActions.gatheringError),
        tap(({ payload }) =>
          this.notificationService.showError(
            payload.status || payload.message || JSON.stringify(payload)
          )
        )
      ),
    {
      dispatch: false,
    }
  );
}
