import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromStore from '@workspace/personal/data';
import { Gathering } from '@workspace/shared/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'workspace-gatherings-personal',
  templateUrl: './gatherings-personal.component.html',
  styleUrls: ['./gatherings-personal.component.scss'],
})
export class GatheringsPersonalComponent implements OnInit {
  items$: Observable<Gathering[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<any>, public location: Location) {}

  ngOnInit() {
    this.items$ = this.store.pipe(
      select(fromStore.selectAllPersonalGatherings)
    );
    this.loading$ = this.store.pipe(select(fromStore.selectIsLoading));

    this.store.dispatch(fromStore.getAllPersonalGatherings());
  }
}
