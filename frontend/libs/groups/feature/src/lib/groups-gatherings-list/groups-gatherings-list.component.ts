import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromGroupStore from '@workspace/groups/data';
import { Gathering } from '@workspace/shared/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'workspace-groups-gatherings-list',
  templateUrl: './groups-gatherings-list.component.html',
  styleUrls: ['./groups-gatherings-list.component.scss'],
})
export class GroupsGatheringsListComponent implements OnInit {
  items$: Observable<Gathering[]>;
  loading$: Observable<boolean>;

  constructor(public location: Location, private store: Store<any>) {}

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(fromGroupStore.selectIsLoading));

    this.items$ = this.store.pipe(select(fromGroupStore.selectAllGatherings));

    this.store.dispatch(fromGroupStore.getAllGatheringsFromGroup());
  }
}
