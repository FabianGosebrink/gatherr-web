import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromGroupStore from '@workspace/groups/data';
import { Meetup } from '@workspace/shared/data';
import { ConfirmResult } from '@workspace/shared/ui-common';
import { Observable } from 'rxjs';

@Component({
  selector: 'workspace-meetup-cancel',
  templateUrl: './meetup-cancel.component.html',
  styleUrls: ['./meetup-cancel.component.scss'],
})
export class MeetupCancelComponent implements OnInit {
  item$: Observable<Meetup>;

  constructor(
    private store: Store<any>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ensureMeetupIsInState();

    this.item$ = this.store.pipe(select(fromGroupStore.selectCurrentMeetup));
  }

  cancelMeetup(result: ConfirmResult) {
    if (result === ConfirmResult.Ok) {
      this.store.dispatch(fromGroupStore.cancelMeetup());
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
