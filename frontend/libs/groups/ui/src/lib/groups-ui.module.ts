import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedUiCommonModule } from '@workspace/shared/ui-common';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { ContactComponent } from './contact/contact.component';
import { GroupCategoriesComponent } from './group-categories/group-categories.component';
import { GroupDescriptionComponent } from './group-description/group-description.component';
import { GroupInformationWidgetComponent } from './group-information-widget/group-information-widget.component';
import { GroupMainInfoComponent } from './group-main-info/group-main-info.component';
import { GroupMeetupsComponent } from './group-meetups/group-meetups.component';
import { GroupMemberRoleItemComponent } from './group-member-role-item/group-member-role-item.component';
import { GroupMemberRolesComponent } from './group-member-roles/group-member-roles.component';
import { MeetupMemberRoleItemComponent } from './meetup-member-role-item/meetup-member-role-item.component';
import { MeetupMemberRolesComponent } from './meetup-member-roles/meetup-member-roles.component';
import { MembersComponent } from './members/members.component';

@NgModule({
  imports: [
    CommonModule,
    SharedUiCommonModule,
    SharedUiLayoutModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  declarations: [
    GroupMainInfoComponent,
    MembersComponent,
    GroupMeetupsComponent,
    GroupDescriptionComponent,
    GroupInformationWidgetComponent,
    GroupCategoriesComponent,
    GroupMemberRoleItemComponent,
    GroupMemberRolesComponent,
    MeetupMemberRoleItemComponent,
    MeetupMemberRolesComponent,
    ContactComponent,
  ],
  exports: [
    GroupMainInfoComponent,
    MembersComponent,
    GroupMeetupsComponent,
    GroupDescriptionComponent,
    GroupInformationWidgetComponent,
    GroupCategoriesComponent,
    GroupMemberRolesComponent,
    MeetupMemberRolesComponent,
    ContactComponent,
  ],
})
export class GroupsUiModule {}
