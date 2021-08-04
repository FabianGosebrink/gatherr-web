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
import { GatheringCancelComponent } from './gathering-cancel/gathering-cancel.component';
import { GatheringContactComponent } from './gathering-contact/gathering-contact.component';
import { GatheringDetailsComponent } from './gathering-details/gathering-details.component';
import { GatheringFormComponent } from './gathering-form/gathering-form.component';
import { GatheringLeaveComponent } from './gathering-leave/gathering-leave.component';
import { GatheringMemberOverviewComponent } from './gathering-member-overview/gathering-member-overview.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupFormComponent } from './group-form/group-form.component';
import { GroupLeaveComponent } from './group-leave/group-leave.component';
import { GroupMemberOverviewComponent } from './group-member-overview/group-member-overview.component';
import { GroupsContactComponent } from './groups-contact/groups-contact.component';
import { GroupsFeatureRoutingModule } from './groups-feature-routing.module';
import { GroupsGatheringsListComponent } from './groups-gatherings-list/groups-gatherings-list.component';
import { GroupsOverviewComponent } from './groups-overview/groups-overview.component';

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
    GatheringDetailsComponent,
    GroupFormComponent,
    GatheringFormComponent,
    GroupsOverviewComponent,
    GroupsGatheringsListComponent,
    GroupMemberOverviewComponent,
    GroupLeaveComponent,
    GatheringMemberOverviewComponent,
    GatheringLeaveComponent,
    GatheringCancelComponent,
    GatheringContactComponent,
    GroupsContactComponent,
  ],
})
export class GroupsFeatureModule {}
