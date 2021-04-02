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
import { GroupMember, GroupRole } from '@workspace/shared/data';

@Component({
  selector: 'workspace-group-member-role-item',
  templateUrl: './group-member-role-item.component.html',
  styleUrls: ['./group-member-role-item.component.scss'],
})
export class GroupMemberRoleItemComponent implements OnInit, OnChanges {
  @Input() member: GroupMember;
  @Input() allGroupRoles: number[];
  @Input() memberCount: number;
  @Output() roleChanged = new EventEmitter<number>();
  currentRole = new FormControl();
  groupRoles = GroupRole;
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
