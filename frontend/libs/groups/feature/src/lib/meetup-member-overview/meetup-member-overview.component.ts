import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromStore from '@workspace/groups/data';
import { getMeetupRoles } from '@workspace/groups/data';
import { Meetup, MeetupMember } from '@workspace/shared/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'workspace-meetup-member-overview',
  templateUrl: './meetup-member-overview.component.html',
  styleUrls: ['./meetup-member-overview.component.scss'],
})
export class MeetupMemberOverviewComponent implements OnInit {
  allRoles$: Observable<number[]>;
  members$: Observable<MeetupMember[]>;
  meetup$: Observable<Meetup>;

  constructor(private store: Store<any>, public location: Location) {}

  ngOnInit(): void {
    this.allRoles$ = this.store.pipe(select(fromStore.selectAllMeetupRoles));
    this.members$ = this.store.pipe(
      select(fromStore.selectAllCurrentMeetupAttendees)
    );

    this.meetup$ = this.store.pipe(select(fromStore.selectCurrentMeetup));

    this.store.dispatch(getMeetupRoles());
    this.store.dispatch(fromStore.getSingleMeetup());
  }

  changeRole({ role, member }) {
    this.store.dispatch(
      fromStore.updateMeetupMember({
        memberId: member.memberId,
        role: role,
      })
    );
  }
}
