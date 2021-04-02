import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromGroupStore from '@workspace/groups/data';
import { getGroupRoles } from '@workspace/groups/data';
import { Group, GroupMember } from '@workspace/shared/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'workspace-group-member-overview',
  templateUrl: './group-member-overview.component.html',
  styleUrls: ['./group-member-overview.component.scss'],
})
export class GroupMemberOverviewComponent implements OnInit {
  allGroupRoles$: Observable<number[]>;
  members$: Observable<GroupMember[]>;
  group$: Observable<Group>;

  constructor(private store: Store<any>, public location: Location) {}

  ngOnInit(): void {
    this.allGroupRoles$ = this.store.pipe(
      select(fromGroupStore.selectAllGroupRoles)
    );
    this.members$ = this.store.pipe(
      select(fromGroupStore.selectCurrentMembers)
    );

    this.group$ = this.store.pipe(select(fromGroupStore.selectCurrentGroup));

    this.store.dispatch(getGroupRoles());
    this.store.dispatch(fromGroupStore.getSingleGroup());
  }

  changeRole({ role, groupMember }) {
    this.store.dispatch(
      fromGroupStore.updateMember({
        memberId: groupMember.memberId,
        role: role,
      })
    );
  }
}
