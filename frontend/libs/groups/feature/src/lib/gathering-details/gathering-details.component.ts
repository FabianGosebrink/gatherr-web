import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromAuthStore from '@workspace/auth/data';
import * as fromGroupStore from '@workspace/groups/data';
import { GatheringMembersSignalRService } from '@workspace/groups/utils';
import { Gathering, GatheringMember } from '@workspace/shared/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'workspace-gathering-details',
  templateUrl: './gathering-details.component.html',
  styleUrls: ['./gathering-details.component.scss'],
})
export class GatheringDetailsComponent implements OnInit, OnDestroy {
  item$: Observable<Gathering>;
  attendees$: Observable<GatheringMember[]>;
  allAttendees$: Observable<GatheringMember[]>;
  waitingList$: Observable<GatheringMember[]>;
  attendeesCount$: Observable<number>;
  organisers$: Observable<GatheringMember[]>;
  isLoading$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;
  isCurrentUserGatheringAttendee$: Observable<boolean>;
  isCurrentUserGatheringOrganiser$: Observable<boolean>;
  isCurrentUserOnWaitingList$: Observable<boolean>;
  selectIsCurrentUserAttending$: Observable<boolean>;
  address$: Observable<string>;
  widthExp$: Observable<string>;

  constructor(
    private store: Store<any>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public location: Location,
    private gatheringMembersSignalRService: GatheringMembersSignalRService
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(fromGroupStore.selectIsLoading));
    this.isLoggedIn$ = this.store.pipe(select(fromAuthStore.selectIsLoggedIn));
    this.isCurrentUserGatheringOrganiser$ = this.store.pipe(
      select(fromGroupStore.selectIsCurrentUserGatheringOrganiser)
    );
    this.isCurrentUserGatheringAttendee$ = this.store.pipe(
      select(fromGroupStore.selectIsCurrentUserGatheringAttendee)
    );
    this.organisers$ = this.store.pipe(
      select(fromGroupStore.selectCurrentGatheringOrganisers)
    );
    this.waitingList$ = this.store.pipe(
      select(fromGroupStore.selectCurrentGatheringWaitingList)
    );
    this.selectIsCurrentUserAttending$ = this.store.pipe(
      select(fromGroupStore.selectIsCurrentUserAttending)
    );
    this.isCurrentUserOnWaitingList$ = this.store.pipe(
      select(fromGroupStore.selectIsCurrentUserOnWaitingList)
    );

    this.item$ = this.store.pipe(select(fromGroupStore.selectCurrentGathering));

    this.address$ = this.store.pipe(
      select(fromGroupStore.selectGatheringAddress)
    );

    this.attendees$ = this.store.pipe(
      select(fromGroupStore.selectCurrentGatheringAttendees)
    );

    this.allAttendees$ = this.store.pipe(
      select(fromGroupStore.selectAllCurrentGatheringAttendees)
    );

    this.attendeesCount$ = this.store.pipe(
      select(fromGroupStore.selectAllCurrentGatheringAttendeesCount)
    );

    this.widthExp$ = this.store.pipe(
      select(fromGroupStore.selectAllCurrentGatheringAttendeesCountInPercent)
    );

    this.store.dispatch(fromGroupStore.getSingleGathering());

    this.gatheringMembersSignalRService.initGatheringMemberSignalr();
  }

  ngOnDestroy(): void {
    this.gatheringMembersSignalRService.stopConnection();
  }

  addCurrentUserToGathering() {
    this.store.dispatch(fromGroupStore.addCurrentUserToAttendGathering());
  }

  navigateToGroup() {
    this.router.navigate(['/groups', this.activatedRoute.snapshot.params.id]);
  }
}
