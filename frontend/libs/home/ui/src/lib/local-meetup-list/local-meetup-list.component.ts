import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Meetup } from '@workspace/shared/data';

@Component({
  selector: 'workspace-local-meetup-list',
  templateUrl: './local-meetup-list.component.html',
  styleUrls: ['./local-meetup-list.component.scss'],
})
export class LocalMeetupListComponent {
  @Input() localMeetups: Meetup[];
  @Input() isLoading: boolean;
  @Input() city = '';
  @Output() navigateTo = new EventEmitter();

  constructor(public router: Router) {}
}
