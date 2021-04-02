import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromStore from '@workspace/personal/data';
import { Group } from '@workspace/shared/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'workspace-groups-personal',
  templateUrl: './groups-personal.component.html',
  styleUrls: ['./groups-personal.component.scss'],
})
export class GroupsPersonalComponent implements OnInit {
  items$: Observable<Group[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<any>, public location: Location) {}

  ngOnInit() {
    this.items$ = this.store.pipe(select(fromStore.selectAllPersonalGroups));
    this.loading$ = this.store.pipe(select(fromStore.selectIsLoading));

    this.store.dispatch(fromStore.getAllPersonalGroups());
  }
}
