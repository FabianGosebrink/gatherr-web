import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Gathering } from '@workspace/shared/data';

@Component({
  selector: 'workspace-local-gathering-list',
  templateUrl: './local-gathering-list.component.html',
  styleUrls: ['./local-gathering-list.component.scss'],
})
export class LocalGatheringListComponent {
  @Input() localGatherings: Gathering[];
  @Input() isLoading: boolean;
  @Input() city = '';
  @Output() navigateTo = new EventEmitter();

  constructor(public router: Router) {}
}
