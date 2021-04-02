import { Component, Input } from '@angular/core';
import { Group } from '@workspace/shared/data';

@Component({
  selector: 'workspace-group-main-info',
  templateUrl: './group-main-info.component.html',
  styleUrls: ['./group-main-info.component.scss'],
})
export class GroupMainInfoComponent {
  @Input() item: Group;
  @Input() address: any;
}
