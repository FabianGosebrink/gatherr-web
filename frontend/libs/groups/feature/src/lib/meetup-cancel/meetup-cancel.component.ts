import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromGroupStore from '@workspace/groups/data';
import { Gathering } from '@workspace/shared/data';
import { ConfirmResult } from '@workspace/shared/ui-common';
import { Observable } from 'rxjs';

@Component({
  selector: 'workspace-gathering-cancel',
  templateUrl: './gathering-cancel.component.html',
  styleUrls: ['./gathering-cancel.component.scss'],
})
export class GatheringCancelComponent implements OnInit {
  item$: Observable<Gathering>;

  constructor(
    private store: Store<any>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ensureGatheringIsInState();

    this.item$ = this.store.pipe(select(fromGroupStore.selectCurrentGathering));
  }

  cancelGathering(result: ConfirmResult) {
    if (result === ConfirmResult.Ok) {
      this.store.dispatch(fromGroupStore.cancelGathering());
    } else {
      this.router.navigate([
        '/groups',
        this.activatedRoute.snapshot.params.id,
        'gatherings',
        this.activatedRoute.snapshot.params.gatheringid,
      ]);
    }
  }

  private ensureGatheringIsInState() {
    this.store.dispatch(fromGroupStore.getSingleGathering());
  }
}
