import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Gathering } from '@workspace/shared/data';

@Component({
  selector: 'workspace-gathering-list',
  templateUrl: './gathering-list.component.html',
  styleUrls: ['./gathering-list.component.scss'],
})
export class GatheringListComponent {
  @Input() items: Gathering[] = [];

  constructor(public router: Router) {}
}
