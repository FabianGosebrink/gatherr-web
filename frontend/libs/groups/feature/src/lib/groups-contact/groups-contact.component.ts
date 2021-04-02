import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromStore from '@workspace/groups/data';
import { selectGroupsLoading } from '@workspace/groups/data';
import { ContactGroup } from '@workspace/shared/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'workspace-groups-contact',
  templateUrl: './groups-contact.component.html',
  styleUrls: ['./groups-contact.component.scss'],
})
export class GroupsContactComponent implements OnInit {
  isLoading$: Observable<boolean>;
  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.ensureGroupIsInState();

    this.isLoading$ = this.store.pipe(select(selectGroupsLoading));
  }

  sendMessage(payload: ContactGroup) {
    this.store.dispatch(fromStore.sendGroupMessage({ payload }));
  }

  private ensureGroupIsInState() {
    this.store.dispatch(fromStore.getSingleGroup());
  }
}
