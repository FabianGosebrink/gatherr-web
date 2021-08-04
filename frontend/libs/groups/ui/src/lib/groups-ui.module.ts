import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedUiCommonModule } from '@workspace/shared/ui-common';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { ContactComponent } from './contact/contact.component';
import { GatheringMemberRoleItemComponent } from './gathering-member-role-item/gathering-member-role-item.component';
import { GatheringMemberRolesComponent } from './gathering-member-roles/gathering-member-roles.component';
import { GroupCategoriesComponent } from './group-categories/group-categories.component';
import { GroupDescriptionComponent } from './group-description/group-description.component';
import { GroupGatheringsComponent } from './group-gatherings/group-gatherings.component';
import { GroupInformationWidgetComponent } from './group-information-widget/group-information-widget.component';
import { GroupMainInfoComponent } from './group-main-info/group-main-info.component';
import { GroupMemberRoleItemComponent } from './group-member-role-item/group-member-role-item.component';
import { GroupMemberRolesComponent } from './group-member-roles/group-member-roles.component';
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
    GroupGatheringsComponent,
    GroupDescriptionComponent,
    GroupInformationWidgetComponent,
    GroupCategoriesComponent,
    GroupMemberRoleItemComponent,
    GroupMemberRolesComponent,
    GatheringMemberRoleItemComponent,
    GatheringMemberRolesComponent,
    ContactComponent,
  ],
  exports: [
    GroupMainInfoComponent,
    MembersComponent,
    GroupGatheringsComponent,
    GroupDescriptionComponent,
    GroupInformationWidgetComponent,
    GroupCategoriesComponent,
    GroupMemberRolesComponent,
    GatheringMemberRolesComponent,
    ContactComponent,
  ],
})
export class GroupsUiModule {}
