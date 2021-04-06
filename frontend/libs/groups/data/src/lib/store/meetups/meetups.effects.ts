import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { SnackbarNotificationService } from '@workspace/shared/notification';
import { ContactApiService, MeetupsApiService } from '@workspace/groups/api';
import { MapsService } from '@workspace/maps/util';
import { MeetupState } from '@workspace/shared/data';
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
import * as meetupActions from './meetups.actions';
import * as meetupSelectors from './meetups.selectors';

@Injectable()
export class MeetupEffects {
  constructor(
    private actions$: Actions,
    private meetupApiService: MeetupsApiService,
    private mapsService: MapsService,
    private router: Router,
    private store: Store<any>,
    private notificationService: SnackbarNotificationService,
    private uploadService: UploadApiService,
    private contactApiService: ContactApiService,
    private utilService: UtilsService
  ) {}

  addMeetupToGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(meetupActions.addMeetupToCurrentGroup),
      withLatestFrom(this.store.pipe(select(selectRouteParam('id')))),
      switchMap(([{ meetup, formData }, id]) => {
        if (!this.utilService.formDataHasData(formData)) {
          return of(meetupActions.addMeetup({ groupLinkName: id, meetup }));
        }

        return this.uploadService.uploadMeetup(formData).pipe(
          map(({ path }) => {
            meetup.imageUrl = path;
            return meetupActions.addMeetup({ groupLinkName: id, meetup });
          })
        );
      })
    )
  );

  addMeetup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(meetupActions.addMeetup),
      switchMap(({ groupLinkName, meetup }) =>
        this.meetupApiService.addMeetupToGroup(groupLinkName, meetup).pipe(
          map(
            (result) =>
              meetupActions.addMeetupToCurrentGroupSuccess({
                groupLinkName,
                meetup: result,
              }),
            catchError((error) =>
              of(meetupActions.meetupError({ payload: error }))
            )
          )
        )
      )
    )
  );

  updateMeetup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(meetupActions.updateMeetup),
      withLatestFrom(this.store.pipe(select(selectRouteParam('id')))),
      switchMap(([{ meetup }, groupLinkName]) =>
        this.meetupApiService.update(groupLinkName, meetup).pipe(
          map(
            (newMeetup) =>
              meetupActions.updateMeetupSuccess({
                meetup: newMeetup,
              }),
            catchError((error) =>
              of(meetupActions.meetupError({ payload: error }))
            )
          )
        )
      )
    )
  );

  redirectToMeetup$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          meetupActions.addMeetupToCurrentGroupSuccess,
          meetupActions.updateMeetupSuccess,
          meetupActions.cancelMeetupSuccess
        ),
        withLatestFrom(this.store.pipe(select(selectRouteParam('id')))),
        tap(([{ meetup }, groupLinkName]) =>
          this.router.navigate([
            '/groups',
            groupLinkName,
            'meetups',
            meetup.value.linkName,
          ])
        )
      ),
    { dispatch: false }
  );

  getAllMeetups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(meetupActions.getAllMeetupsFromGroup),
      withLatestFrom(this.store.pipe(select(selectRouteParam('id')))),
      switchMap(([action, groupLinkName]) =>
        this.meetupApiService.getMeetupsFromGroup(groupLinkName).pipe(
          map((result) =>
            meetupActions.getAllMeetupsFromGroupSuccess({ payload: result })
          ),
          catchError((error) =>
            of(meetupActions.meetupError({ payload: error }))
          )
        )
      )
    )
  );

  getSingle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(meetupActions.getSingleMeetup),
      withLatestFrom(
        this.store.pipe(select(selectRouteParam('id'))),
        this.store.pipe(select(selectRouteParam('meetupid')))
      ),
      switchMap(([action, id, meetupId]) =>
        this.meetupApiService.getSingle(id, meetupId).pipe(
          flatMap((result) => [
            meetupActions.getSingleMeetupSuccess({ payload: result }),
            meetupActions.getAttendeesFromCurrentMeetup({ payload: result }),
            meetupActions.getMeetupsAddress(),
          ]),
          catchError((error) =>
            of(meetupActions.meetupError({ payload: error }))
          )
        )
      )
    )
  );

  cancelMeetup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(meetupActions.cancelMeetup),
      withLatestFrom(
        this.store.pipe(select(meetupSelectors.selectCurrentMeetup))
      ),
      switchMap(([_, currentMeetup]) => {
        currentMeetup.state =
          currentMeetup.state === MeetupState.Cancelled
            ? MeetupState.Ok
            : MeetupState.Cancelled;

        return this.meetupApiService
          .update(currentMeetup.groupLinkName, currentMeetup)
          .pipe(
            tap(() =>
              this.notificationService.showSuccess('Gathering is updated')
            ),
            map(
              (meetup) =>
                meetupActions.cancelMeetupSuccess({
                  meetup,
                }),
              catchError((error) =>
                of(meetupActions.meetupError({ payload: error }))
              )
            )
          );
      })
    )
  );

  getMeetupsAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(meetupActions.getMeetupsAddress),
      withLatestFrom(
        this.store.pipe(select(meetupSelectors.selectCurrentMeetup))
      ),
      switchMap(([action, { latitude, longitude }]) =>
        this.mapsService
          .getAddressByLatitudeLongitude(latitude, longitude)
          .pipe(
            map((address: string) =>
              meetupActions.getMeetupsAddressSuccess({ address })
            ),
            catchError((error) =>
              of(meetupActions.meetupError({ payload: error }))
            )
          )
      )
    )
  );

  getAttendeesFromCurrentMeetup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(meetupActions.getAttendeesFromCurrentMeetup),
      switchMap(({ payload }) =>
        this.meetupApiService
          .getAllAttendeesFromMeetup(
            payload.value.groupLinkName,
            payload.value.id
          )
          .pipe(
            map((result) =>
              meetupActions.getAttendeesFromCurrentMeetupSuccess({
                payload: result,
              })
            ),
            catchError((error) =>
              of(meetupActions.meetupError({ payload: error }))
            )
          )
      )
    )
  );

  addCurrentUserToAttendMeetup$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(meetupActions.addCurrentUserToAttendMeetup),
        withLatestFrom(
          this.store.pipe(select(meetupSelectors.selectCurrentMeetup))
        ),
        switchMap(([action, meetup]) =>
          this.meetupApiService
            .addUserAsAttendee(meetup.groupLinkName, meetup.id)
            .pipe(
              tap(() =>
                this.notificationService.showSuccess('You attend the gathering')
              ),
              catchError((error) =>
                of(meetupActions.meetupError({ payload: error }))
              )
            )
        )
      ),
    { dispatch: false }
  );

  removeCurrentUserFromMeetupAttendees$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(meetupActions.removeCurrentUserFromMeetupAttendees),
        withLatestFrom(
          this.store.pipe(select(meetupSelectors.selectCurrentMember)),
          this.store.pipe(select(meetupSelectors.selectCurrentMeetup))
        ),
        switchMap(([action, meetupMember, meetup]) =>
          this.meetupApiService
            .removeUserFromAttendees(
              meetup.groupLinkName,
              meetup.id,
              meetupMember.memberId
            )
            .pipe(
              tap(() => {
                this.notificationService.showSuccess('You left the gathering');
                this.router.navigate(['/groups', meetup.groupLinkName]);
              }),
              catchError((error) =>
                of(meetupActions.meetupError({ payload: error }))
              )
            )
        )
      ),
    { dispatch: false }
  );

  updateMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(meetupActions.updateMeetupMember),
      withLatestFrom(
        this.store.pipe(select(meetupSelectors.selectCurrentMeetup))
      ),
      switchMap(([{ memberId, role }, { groupLinkName, id }]) =>
        this.meetupApiService
          .updateMember(groupLinkName, id, memberId, role)
          .pipe(
            tap(() => this.notificationService.showSuccess('Member updated')),
            map((result) =>
              meetupActions.updateMeetupMemberSuccess({ payload: result })
            ),
            catchError((error) =>
              of(meetupActions.meetupError({ payload: error }))
            )
          )
      )
    )
  );

  getMeetupRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(meetupActions.getMeetupRoles),
      switchMap(() =>
        this.meetupApiService.getAllMeetupRoles().pipe(
          map((result) =>
            meetupActions.getMeetupRolesSuccess({ payload: result })
          ),
          catchError((error) =>
            of(meetupActions.meetupError({ payload: error }))
          )
        )
      )
    )
  );

  sendGatheringMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(meetupActions.sendGatheringMessage),
      withLatestFrom(
        this.store.pipe(select(meetupSelectors.selectCurrentMeetup))
      ),
      switchMap(([{ payload }, { id }]) => {
        payload.gatheringId = id;
        return this.contactApiService.contactGathering(payload).pipe(
          tap(() => this.notificationService.showSuccess('Message sent')),
          map(() => meetupActions.sendGatheringMessageSuccess()),
          catchError((error) =>
            of(meetupActions.meetupError({ payload: error }))
          )
        );
      })
    )
  );

  meetupError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(meetupActions.meetupError),
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
