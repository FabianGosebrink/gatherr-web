import { Component, Input } from '@angular/core';

@Component({
  selector: 'workspace-group-information-widget',
  templateUrl: './group-information-widget.component.html',
  styleUrls: ['./group-information-widget.component.scss'],
})
export class GroupInformationWidgetComponent {
  @Input() address: any;
}
