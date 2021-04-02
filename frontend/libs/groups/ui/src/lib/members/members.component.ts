import { Component, Input, OnInit } from '@angular/core';
import { GroupMember, MeetupMember } from '@workspace/shared/data';

@Component({
  selector: 'workspace-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  @Input() members: GroupMember[] | MeetupMember[] = [];
  @Input() title: string;

  constructor() {}

  ngOnInit() {}
}
