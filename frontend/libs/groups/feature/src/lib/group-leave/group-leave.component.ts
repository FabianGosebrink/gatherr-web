import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromGroupStore from '@workspace/groups/data';
import { ConfirmResult } from '@workspace/shared/ui-common';

@Component({
  selector: 'workspace-group-leave',
  templateUrl: './group-leave.component.html',
  styleUrls: ['./group-leave.component.scss'],
})
export class GroupLeaveComponent implements OnInit {
  constructor(
    private store: Store<any>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ensureGroupIsInState();
  }

  possibleLeave(result: ConfirmResult) {
    if (result === ConfirmResult.Ok) {
      this.store.dispatch(fromGroupStore.removeCurrentMember());
    } else {
      this.router.navigate(['/groups', this.activatedRoute.snapshot.params.id]);
    }
  }

  private ensureGroupIsInState() {
    this.store.dispatch(fromGroupStore.getSingleGroup());
  }
}
