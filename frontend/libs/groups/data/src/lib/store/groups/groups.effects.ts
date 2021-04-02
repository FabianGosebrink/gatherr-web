import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { SnackbarNotificationService } from '@workspace/features/notification';
import { ContactApiService, GroupsApiService } from '@workspace/groups/api';
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
import * as meetupActions from '../meetups/meetups.actions';
import * as groupActions from './groups.actions';
import {
  selectCurrentGroup,
  selectCurrentMemberItem,
  selectPaginationMetadata,
} from './groups.selectors';

@Injectable()
export class GroupEffects {
  constructor(
    private actions$: Actions,
    private apiService: GroupsApiService,
    private uploadService: UploadApiService,
    private router: Router,
    private store: Store<any>,
    private notificationService: SnackbarNotificationService,
    private utilService: UtilsService,
    private contactApiService: ContactApiService
  ) {}

  addGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupActions.addGroup),
      switchMap(({ payload }) =>
        this.apiService
          .add(payload)
          .pipe(map((data) => groupActions.addGroupSuccess({ payload: data })))
      )
    )
  );

  redirectAfterAdd$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(groupActions.addGroupSuccess),
        tap(({ payload }) =>
          this.router.navigate(['/groups', payload.value.linkName])
        )
      ),
    { dispatch: false }
  );

  addCompleteGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupActions.addCompleteGroup),
      switchMap(({ payload, formData }) => {
        if (!this.utilService.formDataHasData(formData)) {
          return of(groupActions.addGroup({ payload }));
        }

        return this.uploadService.uploadGroup(formData).pipe(
          map(({ path }) => {
            payload.imageUrl = path;
            return groupActions.addGroup({ payload });
          })
        );
      })
    )
  );

  updateCompleteGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupActions.updateCompleteGroup),
      switchMap(({ payload, formData }) => {
        if (!this.utilService.formDataHasData(formData)) {
          return of(groupActions.updateGroup({ payload }));
        }

        return this.uploadService.uploadGroup(formData).pipe(
          map(({ path }) => {
            payload.imageUrl = path;
            return groupActions.updateGroup({ payload });
          })
        );
      })
    )
  );

  updateGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupActions.updateGroup),
      switchMap(({ payload }) =>
        this.apiService.update(payload.id, payload).pipe(
          map((data) => groupActions.updateGroupSuccess({ payload: data })),
          tap(() => this.notificationService.showSuccess('Group updated'))
        )
      )
    )
  );

  redirectAfterUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(groupActions.updateGroupSuccess),
        tap(({ payload }) =>
          this.router.navigate(['/groups', payload.value.linkName])
        )
      ),
    { dispatch: false }
  );

  getAllGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupActions.getAllGroups),
      withLatestFrom(this.store.pipe(select(selectPaginationMetadata))),
      switchMap(([action, metaData]) =>
        this.apiService
          .getAll(
            action.query,
            action.page,
            metaData ? metaData.pageSize : null,
            action.category
          )
          .pipe(
            map((result) =>
              groupActions.getAllGroupsSuccess({ payload: result })
            ),
            catchError((error) =>
              of(groupActions.groupError({ payload: error }))
            )
          )
      )
    )
  );

  getSingle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupActions.getSingleGroup),
      withLatestFrom(this.store.pipe(select(selectRouteParam('id')))),
      switchMap(([action, linkName]) =>
        this.apiService.getSingle(linkName).pipe(
          flatMap((result) => [
            groupActions.getSingleGroupSuccess({ payload: result }),
            // TODO When editing a form those do not have to be loaded
            meetupActions.getAllMeetupsFromGroup(),
            groupActions.getAllMembersFromGroup({ payload: linkName }),
          ]),
          catchError((error) => of(groupActions.groupError({ payload: error })))
        )
      )
    )
  );

  getAllMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupActions.getAllMembersFromGroup),
      switchMap(({ payload }) =>
        this.apiService.getMembersFromGroup(payload).pipe(
          map((result) =>
            groupActions.getAllMembersFromGroupSuccess({ payload: result })
          ),
          catchError((error) => of(groupActions.groupError({ payload: error })))
        )
      )
    )
  );

  becomeMember$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(groupActions.becomeMember),
        withLatestFrom(this.store.pipe(select(selectCurrentGroup))),
        switchMap(([action, { linkName }]) =>
          this.apiService
            .addUserAsMember(linkName)
            .pipe(
              catchError((error) =>
                of(groupActions.groupError({ payload: error }))
              )
            )
        )
      ),
    {
      dispatch: false,
    }
  );

  removeMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupActions.removeCurrentMember),
      withLatestFrom(
        this.store.pipe(select(selectRouteParam('id'))),
        this.store.pipe(select(selectCurrentMemberItem))
      ),
      switchMap(([action, linkName, member]) =>
        this.apiService.removeUserAsMember(linkName, member.memberId).pipe(
          map(() => groupActions.removeCurrentMemberSuccess()),
          catchError((error) => of(groupActions.groupError({ payload: error })))
        )
      )
    )
  );

  redirectAfterRemoveMember$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(groupActions.removeCurrentMemberSuccess),
        tap(() => this.router.navigate(['/groups']))
      ),
    { dispatch: false }
  );

  updateMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupActions.updateMember),
      withLatestFrom(this.store.pipe(select(selectCurrentGroup))),
      switchMap(([{ memberId, role }, { linkName }]) =>
        this.apiService.updateMember(linkName, memberId, role).pipe(
          tap(() => this.notificationService.showSuccess('Member updated')),
          map((result) =>
            groupActions.updateMemberSuccess({ payload: result })
          ),
          catchError((error) => of(groupActions.groupError({ payload: error })))
        )
      )
    )
  );

  getGroupRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupActions.getGroupRoles),
      switchMap(() =>
        this.apiService.getAllGroupRoles().pipe(
          map((result) =>
            groupActions.getGroupRolesSuccess({ payload: result })
          ),
          catchError((error) => of(groupActions.groupError({ payload: error })))
        )
      )
    )
  );

  sendGroupMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupActions.sendGroupMessage),
      withLatestFrom(this.store.pipe(select(selectCurrentGroup))),
      switchMap(([{ payload }, { id }]) => {
        payload.groupId = id;
        return this.contactApiService.contactGroup(payload).pipe(
          tap(() =>
            this.notificationService.showSuccess('Message sent to group')
          ),
          map(() => groupActions.sendGroupMessageSuccess()),
          catchError((error) =>
            of(meetupActions.meetupError({ payload: error }))
          )
        );
      })
    )
  );

  groupError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(groupActions.groupError),
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
