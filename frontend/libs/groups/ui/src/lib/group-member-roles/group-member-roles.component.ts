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
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'workspace-group-member-roles',
  templateUrl: './group-member-roles.component.html',
  styleUrls: ['./group-member-roles.component.scss'],
})
export class GroupMemberRolesComponent implements OnInit, OnChanges {
  @Input() members: GroupMember[] = [];
  @Input() allRoles: number[] = [];
  @Output() memberRoleChanged = new EventEmitter();
  membersBackUp: GroupMember[] = [];

  searchText = new FormControl('');
  loading: boolean;

  ngOnInit(): void {
    this.searchText.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => (this.loading = true))
      )
      .subscribe((value) => {
        if (!value) {
          this.members = this.membersBackUp;
        } else {
          this.members = this.membersBackUp.filter((x) =>
            x.userProfile.username.toLowerCase().includes(value.toLowerCase())
          );
        }
        this.loading = false;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.members?.currentValue) {
      this.membersBackUp = [...changes?.members?.currentValue];
    }
  }

  roleChanged(role: GroupRole, groupMember: GroupMember) {
    this.memberRoleChanged.emit({ role, groupMember });
  }
}
