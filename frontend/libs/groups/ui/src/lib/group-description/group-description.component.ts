import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'workspace-group-description',
  templateUrl: './group-description.component.html',
  styleUrls: ['./group-description.component.scss'],
})
export class GroupDescriptionComponent implements OnInit {
  @Input() description = '';

  constructor() {}

  ngOnInit() {}
}
