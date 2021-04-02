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
import { GroupRole, MeetupMember } from '@workspace/shared/data';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'workspace-meetup-member-roles',
  templateUrl: './meetup-member-roles.component.html',
  styleUrls: ['./meetup-member-roles.component.scss'],
})
export class MeetupMemberRolesComponent implements OnInit, OnChanges {
  @Input() members: MeetupMember[] = [];
  @Input() allRoles: number[] = [];
  @Output() memberRoleChanged = new EventEmitter();
  membersBackUp: MeetupMember[] = [];

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

  roleChanged(role: GroupRole, member: MeetupMember) {
    this.memberRoleChanged.emit({ role, member });
  }
}
