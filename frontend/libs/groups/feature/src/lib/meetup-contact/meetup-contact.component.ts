import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromStore from '@workspace/groups/data';
import { selectGroupsLoading } from '@workspace/groups/data';
import { ContactGathering } from '@workspace/shared/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'workspace-meetup-contact',
  templateUrl: './meetup-contact.component.html',
  styleUrls: ['./meetup-contact.component.scss'],
})
export class MeetupContactComponent implements OnInit {
  isLoading$: Observable<boolean>;
  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.ensureMeetupIsInStore();

    this.isLoading$ = this.store.pipe(select(selectGroupsLoading));
  }

  sendMessage(payload: ContactGathering) {
    this.store.dispatch(fromStore.sendGatheringMessage({ payload }));
  }

  private ensureMeetupIsInStore() {
    this.store.dispatch(fromStore.getSingleMeetup());
  }
}
