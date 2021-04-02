import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromAuthStore from '@workspace/auth/data';
import * as fromGroupStore from '@workspace/groups/data';
import { MeetupMembersSignalRService } from '@workspace/groups/utils';
import { Meetup, MeetupMember } from '@workspace/shared/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'workspace-meetup-details',
  templateUrl: './meetup-details.component.html',
  styleUrls: ['./meetup-details.component.scss'],
})
export class MeetupDetailsComponent implements OnInit, OnDestroy {
  item$: Observable<Meetup>;
  attendees$: Observable<MeetupMember[]>;
  allAttendees$: Observable<MeetupMember[]>;
  waitingList$: Observable<MeetupMember[]>;
  attendeesCount$: Observable<number>;
  organisers$: Observable<MeetupMember[]>;
  isLoading$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;
  isCurrentUserMeetupAttendee$: Observable<boolean>;
  isCurrentUserMeetupOrganiser$: Observable<boolean>;
  isCurrentUserOnWaitingList$: Observable<boolean>;
  selectIsCurrentUserAttending$: Observable<boolean>;
  address$: Observable<string>;
  widthExp$: Observable<string>;

  constructor(
    private store: Store<any>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public location: Location,
    private meetupMembersSignalRService: MeetupMembersSignalRService
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(fromGroupStore.selectIsLoading));
    this.isLoggedIn$ = this.store.pipe(select(fromAuthStore.selectIsLoggedIn));
    this.isCurrentUserMeetupOrganiser$ = this.store.pipe(
      select(fromGroupStore.selectIsCurrentUserMeetupOrganiser)
    );
    this.isCurrentUserMeetupAttendee$ = this.store.pipe(
      select(fromGroupStore.selectIsCurrentUserMeetupAttendee)
    );
    this.organisers$ = this.store.pipe(
      select(fromGroupStore.selectCurrentMeetupOrganisers)
    );
    this.waitingList$ = this.store.pipe(
      select(fromGroupStore.selectCurrentMeetupWaitingList)
    );
    this.selectIsCurrentUserAttending$ = this.store.pipe(
      select(fromGroupStore.selectIsCurrentUserAttending)
    );
    this.isCurrentUserOnWaitingList$ = this.store.pipe(
      select(fromGroupStore.selectIsCurrentUserOnWaitingList)
    );

    this.item$ = this.store.pipe(select(fromGroupStore.selectCurrentMeetup));

    this.address$ = this.store.pipe(select(fromGroupStore.selectMeetupAddress));

    this.attendees$ = this.store.pipe(
      select(fromGroupStore.selectCurrentMeetupAttendees)
    );

    this.allAttendees$ = this.store.pipe(
      select(fromGroupStore.selectAllCurrentMeetupAttendees)
    );

    this.attendeesCount$ = this.store.pipe(
      select(fromGroupStore.selectAllCurrentMeetupAttendeesCount)
    );

    this.widthExp$ = this.store.pipe(
      select(fromGroupStore.selectAllCurrentMeetupAttendeesCountInPercent)
    );

    this.store.dispatch(fromGroupStore.getSingleMeetup());

    this.meetupMembersSignalRService.initMeetupMemberSignalr();
  }

  ngOnDestroy(): void {
    this.meetupMembersSignalRService.stopConnection();
  }

  addCurrentUserToMeetup() {
    this.store.dispatch(fromGroupStore.addCurrentUserToAttendMeetup());
  }

  navigateToGroup() {
    this.router.navigate(['/groups', this.activatedRoute.snapshot.params.id]);
  }
}
