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
import { GatheringMember, GatheringRole } from '@workspace/shared/data';

@Component({
  selector: 'workspace-gathering-member-role-item',
  templateUrl: './gathering-member-role-item.component.html',
  styleUrls: ['./gathering-member-role-item.component.scss'],
})
export class GatheringMemberRoleItemComponent implements OnInit, OnChanges {
  @Input() member: GatheringMember;
  @Input() allRoles: number[] = [];
  @Input() memberCount: number;
  @Output() roleChanged = new EventEmitter<number>();
  currentRole = new FormControl();
  gatheringRoles = GatheringRole;
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
