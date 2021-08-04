import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromStore from '@workspace/groups/data';
import { getGatheringRoles } from '@workspace/groups/data';
import { Gathering, GatheringMember } from '@workspace/shared/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'workspace-gathering-member-overview',
  templateUrl: './gathering-member-overview.component.html',
  styleUrls: ['./gathering-member-overview.component.scss'],
})
export class GatheringMemberOverviewComponent implements OnInit {
  allRoles$: Observable<number[]>;
  members$: Observable<GatheringMember[]>;
  gathering$: Observable<Gathering>;

  constructor(private store: Store<any>, public location: Location) {}

  ngOnInit(): void {
    this.allRoles$ = this.store.pipe(select(fromStore.selectAllGatheringRoles));
    this.members$ = this.store.pipe(
      select(fromStore.selectAllCurrentGatheringAttendees)
    );

    this.gathering$ = this.store.pipe(select(fromStore.selectCurrentGathering));

    this.store.dispatch(getGatheringRoles());
    this.store.dispatch(fromStore.getSingleGathering());
  }

  changeRole({ role, member }) {
    this.store.dispatch(
      fromStore.updateGatheringMember({
        memberId: member.memberId,
        role: role,
      })
    );
  }
}
