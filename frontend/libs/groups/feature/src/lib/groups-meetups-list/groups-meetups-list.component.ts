import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromGroupStore from '@workspace/groups/data';
import { Meetup } from '@workspace/shared/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'workspace-groups-meetups-list',
  templateUrl: './groups-meetups-list.component.html',
  styleUrls: ['./groups-meetups-list.component.scss'],
})
export class GroupsMeetupsListComponent implements OnInit {
  items$: Observable<Meetup[]>;
  loading$: Observable<boolean>;

  constructor(public location: Location, private store: Store<any>) {}

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(fromGroupStore.selectIsLoading));

    this.items$ = this.store.pipe(select(fromGroupStore.selectAllMeetups));

    this.store.dispatch(fromGroupStore.getAllMeetupsFromGroup());
  }
}
