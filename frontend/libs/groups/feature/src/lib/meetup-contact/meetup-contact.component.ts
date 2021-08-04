import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromStore from '@workspace/groups/data';
import { selectGroupsLoading } from '@workspace/groups/data';
import { ContactGathering } from '@workspace/shared/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'workspace-gathering-contact',
  templateUrl: './gathering-contact.component.html',
  styleUrls: ['./gathering-contact.component.scss'],
})
export class GatheringContactComponent implements OnInit {
  isLoading$: Observable<boolean>;
  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.ensureGatheringIsInStore();

    this.isLoading$ = this.store.pipe(select(selectGroupsLoading));
  }

  sendMessage(payload: ContactGathering) {
    this.store.dispatch(fromStore.sendGatheringMessage({ payload }));
  }

  private ensureGatheringIsInStore() {
    this.store.dispatch(fromStore.getSingleGathering());
  }
}
