import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromGroupStore from '@workspace/groups/data';
import { ConfirmResult } from '@workspace/shared/ui-common';

@Component({
  selector: 'workspace-gathering-leave',
  templateUrl: './gathering-leave.component.html',
  styleUrls: ['./gathering-leave.component.scss'],
})
export class GatheringLeaveComponent implements OnInit {
  constructor(
    private store: Store<any>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ensureGatheringIsInState();
  }

  possibleLeave(result: ConfirmResult) {
    if (result === ConfirmResult.Ok) {
      this.store.dispatch(
        fromGroupStore.removeCurrentUserFromGatheringAttendees()
      );
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
