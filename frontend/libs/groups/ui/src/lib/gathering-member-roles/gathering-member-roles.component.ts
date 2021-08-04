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
import { GatheringMember, GroupRole } from '@workspace/shared/data';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'workspace-gathering-member-roles',
  templateUrl: './gathering-member-roles.component.html',
  styleUrls: ['./gathering-member-roles.component.scss'],
})
export class GatheringMemberRolesComponent implements OnInit, OnChanges {
  @Input() members: GatheringMember[] = [];
  @Input() allRoles: number[] = [];
  @Output() memberRoleChanged = new EventEmitter();
  membersBackUp: GatheringMember[] = [];

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

  roleChanged(role: GroupRole, member: GatheringMember) {
    this.memberRoleChanged.emit({ role, member });
  }
}
