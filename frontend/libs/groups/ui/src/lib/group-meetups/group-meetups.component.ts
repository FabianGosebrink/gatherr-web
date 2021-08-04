import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gathering } from '@workspace/shared/data';

@Component({
  selector: 'workspace-group-gatherings',
  templateUrl: './group-gatherings.component.html',
  styleUrls: ['./group-gatherings.component.scss'],
})
export class GroupGatheringsComponent {
  @Input() previousGathering: Gathering;
  @Input() nextGathering: Gathering;
  @Input() upcomingGathering: Gathering;
  @Input() loggedIn: boolean;
  @Input() canAddNewGatherings: boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  navigateToGatheringAdd() {
    this.router.navigate([
      '/groups',
      this.activatedRoute.snapshot.params.id,
      'gatherings',
      'create',
    ]);
  }

  navigateToGathering(gathering: Gathering) {
    this.router.navigate([
      '/groups',
      this.activatedRoute.snapshot.params.id,
      'gatherings',
      gathering.linkName,
    ]);
  }
}
