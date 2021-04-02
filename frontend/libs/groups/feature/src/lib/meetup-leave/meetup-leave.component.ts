import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromGroupStore from '@workspace/groups/data';
import { ConfirmResult } from '@workspace/shared/ui-common';

@Component({
  selector: 'workspace-meetup-leave',
  templateUrl: './meetup-leave.component.html',
  styleUrls: ['./meetup-leave.component.scss'],
})
export class MeetupLeaveComponent implements OnInit {
  constructor(
    private store: Store<any>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ensureMeetupIsInState();
  }

  possibleLeave(result: ConfirmResult) {
    if (result === ConfirmResult.Ok) {
      this.store.dispatch(
        fromGroupStore.removeCurrentUserFromMeetupAttendees()
      );
    } else {
      this.router.navigate([
        '/groups',
        this.activatedRoute.snapshot.params.id,
        'meetups',
        this.activatedRoute.snapshot.params.meetupid,
      ]);
    }
  }

  private ensureMeetupIsInState() {
    this.store.dispatch(fromGroupStore.getSingleMeetup());
  }
}
