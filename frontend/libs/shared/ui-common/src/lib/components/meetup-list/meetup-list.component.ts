import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Meetup } from '@workspace/shared/data';

@Component({
  selector: 'workspace-meetup-list',
  templateUrl: './meetup-list.component.html',
  styleUrls: ['./meetup-list.component.scss'],
})
export class MeetupListComponent {
  @Input() items: Meetup[] = [];

  constructor(public router: Router) {}
}
