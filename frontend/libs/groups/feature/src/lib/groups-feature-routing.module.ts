import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@workspace/auth/util';
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
import { GroupsGatheringsListComponent } from './groups-gatherings-list/groups-gatherings-list.component';
import { GroupsOverviewComponent } from './groups-overview/groups-overview.component';

const routes: Routes = [
  { path: 'create', component: GroupFormComponent, canActivate: [AuthGuard] },
  { path: '', component: GroupsOverviewComponent },
  { path: ':id', component: GroupDetailsComponent },
  { path: ':id/members', component: GroupMemberOverviewComponent },
  { path: ':id/contact', component: GroupsContactComponent },
  { path: ':id/edit', component: GroupFormComponent, canActivate: [AuthGuard] },
  {
    path: ':id/leave',
    component: GroupLeaveComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id/gatherings',
    component: GroupsGatheringsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id/gatherings/create',
    component: GatheringFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id/gatherings/:gatheringid/edit',
    component: GatheringFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id/gatherings/:gatheringid/members',
    component: GatheringMemberOverviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id/gatherings/:gatheringid/leave',
    component: GatheringLeaveComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id/gatherings/:gatheringid/cancel',
    component: GatheringCancelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id/gatherings/:gatheringid/contact',
    component: GatheringContactComponent,
  },
  {
    path: ':id/gatherings/:gatheringid',
    component: GatheringDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsFeatureRoutingModule {}
