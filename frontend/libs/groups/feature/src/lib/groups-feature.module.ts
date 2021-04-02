import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  allGroupEffects,
  featureName,
  groupReducers,
} from '@workspace/groups/data';
import { GroupsUiModule } from '@workspace/groups/ui';
import { SharedUiCommonModule } from '@workspace/shared/ui-common';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupFormComponent } from './group-form/group-form.component';
import { GroupLeaveComponent } from './group-leave/group-leave.component';
import { GroupMemberOverviewComponent } from './group-member-overview/group-member-overview.component';
import { GroupsContactComponent } from './groups-contact/groups-contact.component';
import { GroupsFeatureRoutingModule } from './groups-feature-routing.module';
import { GroupsMeetupsListComponent } from './groups-meetups-list/groups-meetups-list.component';
import { GroupsOverviewComponent } from './groups-overview/groups-overview.component';
import { MeetupCancelComponent } from './meetup-cancel/meetup-cancel.component';
import { MeetupContactComponent } from './meetup-contact/meetup-contact.component';
import { MeetupDetailsComponent } from './meetup-details/meetup-details.component';
import { MeetupFormComponent } from './meetup-form/meetup-form.component';
import { MeetupLeaveComponent } from './meetup-leave/meetup-leave.component';
import { MeetupMemberOverviewComponent } from './meetup-member-overview/meetup-member-overview.component';

@NgModule({
  imports: [
    CommonModule,
    GroupsFeatureRoutingModule,
    SharedUiLayoutModule,
    GroupsUiModule,
    NgSelectModule,
    SharedUiCommonModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature(featureName, groupReducers),
    EffectsModule.forFeature(allGroupEffects),
    NgbModule,
  ],
  declarations: [
    GroupDetailsComponent,
    MeetupDetailsComponent,
    GroupFormComponent,
    MeetupFormComponent,
    GroupsOverviewComponent,
    GroupsMeetupsListComponent,
    GroupMemberOverviewComponent,
    GroupLeaveComponent,
    MeetupMemberOverviewComponent,
    MeetupLeaveComponent,
    MeetupCancelComponent,
    MeetupContactComponent,
    GroupsContactComponent,
  ],
})
export class GroupsFeatureModule {}
