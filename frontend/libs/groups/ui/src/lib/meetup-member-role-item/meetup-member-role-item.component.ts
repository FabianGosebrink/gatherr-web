import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MeetupMember, MeetupRole } from '@workspace/shared/data';

@Component({
  selector: 'workspace-meetup-member-role-item',
  templateUrl: './meetup-member-role-item.component.html',
  styleUrls: ['./meetup-member-role-item.component.scss'],
})
export class MeetupMemberRoleItemComponent implements OnInit, OnChanges {
  @Input() member: MeetupMember;
  @Input() allRoles: number[] = [];
  @Input() memberCount: number;
  @Output() roleChanged = new EventEmitter<number>();
  currentRole = new FormControl();
  meetupRoles = MeetupRole;
  constructor() {}

  ngOnInit(): void {
    this.currentRole.valueChanges.subscribe((value) =>
      this.roleChanged.emit(value)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.member?.currentValue) {
      this.currentRole.setValue(changes?.member?.currentValue.role);
    }

    if (changes?.memberCount?.currentValue === 1) {
      this.currentRole.disable();
    }
  }
}
