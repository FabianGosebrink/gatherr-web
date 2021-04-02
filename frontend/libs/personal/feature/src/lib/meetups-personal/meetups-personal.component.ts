import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromStore from '@workspace/personal/data';
import { Meetup } from '@workspace/shared/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'workspace-meetups-personal',
  templateUrl: './meetups-personal.component.html',
  styleUrls: ['./meetups-personal.component.scss'],
})
export class MeetupsPersonalComponent implements OnInit {
  items$: Observable<Meetup[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<any>, public location: Location) {}

  ngOnInit() {
    this.items$ = this.store.pipe(select(fromStore.selectAllPersonalMeetups));
    this.loading$ = this.store.pipe(select(fromStore.selectIsLoading));

    this.store.dispatch(fromStore.getAllPersonalMeetups());
  }
}
