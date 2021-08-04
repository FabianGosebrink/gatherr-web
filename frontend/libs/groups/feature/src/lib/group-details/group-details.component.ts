import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectIsLoggedIn } from '@workspace/auth/data';
import * as fromGroupStore from '@workspace/groups/data';
import {
  GatheringsSignalRService,
  GroupsMemberSignalRService,
} from '@workspace/groups/utils';
import { MapsService } from '@workspace/maps/util';
import { Gathering, Group, GroupMember } from '@workspace/shared/data';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'workspace-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
})
export class GroupDetailsComponent implements OnInit, OnDestroy {
  item$: Observable<Group>;
  loggedIn$: Observable<boolean>;
  previousGathering$: Observable<Gathering>;
  nextGathering$: Observable<Gathering>;
  upcomingGathering$: Observable<Gathering>;
  isCurrentUserMember$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  allMembers$: Observable<GroupMember[]>;
  canAddNewGatherings$: Observable<boolean>;
  isCurrentUserAdmin$: Observable<boolean>;
  address$: Observable<any>;

  constructor(
    private store: Store<any>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public location: Location,
    private mapsService: MapsService,
    private gatheringsSignalRService: GatheringsSignalRService,
    private groupsMemberSignalRService: GroupsMemberSignalRService
  ) {}

  ngOnInit() {
    this.loggedIn$ = this.store.pipe(select(selectIsLoggedIn));

    this.item$ = this.store.pipe(
      select(fromGroupStore.selectCurrentGroup),
      filter((group) => !!group),
      tap(({ latitude, longitude }) => {
        this.address$ = this.mapsService.getAddressByLatitudeLongitude(
          latitude,
          longitude
        );
      })
    );

    this.isLoading$ = this.store.pipe(
      select(fromGroupStore.selectGroupsLoading)
    );

    this.isCurrentUserMember$ = this.store.pipe(
      select(fromGroupStore.selectIsCurrentUserMember)
    );

    this.previousGathering$ = this.store.pipe(
      select(fromGroupStore.selectPreviousGathering)
    );

    this.nextGathering$ = this.store.pipe(
      select(fromGroupStore.selectNextGathering)
    );

    this.upcomingGathering$ = this.store.pipe(
      select(fromGroupStore.selectUpcomingGathering)
    );

    this.allMembers$ = this.store.pipe(
      select(fromGroupStore.selectCurrentMembers)
    );

    this.canAddNewGatherings$ = this.store.pipe(
      select(fromGroupStore.selectCanAddNewGatherings)
    );

    this.isCurrentUserAdmin$ = this.store.pipe(
      select(fromGroupStore.selectIsCurrentUserAdmin)
    );

    this.store.dispatch(fromGroupStore.getSingleGroup());

    this.gatheringsSignalRService.initGatheringSignalr();
    this.groupsMemberSignalRService.initGroupMemberSignalr();
  }

  ngOnDestroy(): void {
    this.gatheringsSignalRService.stopConnection();
    this.groupsMemberSignalRService.stopConnection();
  }

  navigateToGroupEdit() {
    this.router.navigate([
      '/groups',
      this.activatedRoute.snapshot.params.id,
      'edit',
    ]);
  }

  becomeMember() {
    this.store.dispatch(fromGroupStore.becomeMember());
  }
}
