import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meetup } from '@workspace/shared/data';

@Component({
  selector: 'workspace-group-meetups',
  templateUrl: './group-meetups.component.html',
  styleUrls: ['./group-meetups.component.scss'],
})
export class GroupMeetupsComponent {
  @Input() previousMeetup: Meetup;
  @Input() nextMeetup: Meetup;
  @Input() upcomingMeetup: Meetup;
  @Input() loggedIn: boolean;
  @Input() canAddNewMeetups: boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  navigateToMeetupAdd() {
    this.router.navigate([
      '/groups',
      this.activatedRoute.snapshot.params.id,
      'meetups',
      'create',
    ]);
  }

  navigateToMeetup(meetup: Meetup) {
    this.router.navigate([
      '/groups',
      this.activatedRoute.snapshot.params.id,
      'meetups',
      meetup.linkName,
    ]);
  }
}
