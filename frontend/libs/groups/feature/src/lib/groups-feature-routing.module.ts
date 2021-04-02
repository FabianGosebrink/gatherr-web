import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@workspace/auth/util';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupFormComponent } from './group-form/group-form.component';
import { GroupLeaveComponent } from './group-leave/group-leave.component';
import { GroupMemberOverviewComponent } from './group-member-overview/group-member-overview.component';
import { GroupsContactComponent } from './groups-contact/groups-contact.component';
import { GroupsMeetupsListComponent } from './groups-meetups-list/groups-meetups-list.component';
import { GroupsOverviewComponent } from './groups-overview/groups-overview.component';
import { MeetupCancelComponent } from './meetup-cancel/meetup-cancel.component';
import { MeetupContactComponent } from './meetup-contact/meetup-contact.component';
import { MeetupDetailsComponent } from './meetup-details/meetup-details.component';
import { MeetupFormComponent } from './meetup-form/meetup-form.component';
import { MeetupLeaveComponent } from './meetup-leave/meetup-leave.component';
import { MeetupMemberOverviewComponent } from './meetup-member-overview/meetup-member-overview.component';

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
    path: ':id/meetups',
    component: GroupsMeetupsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id/meetups/create',
    component: MeetupFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id/meetups/:meetupid/edit',
    component: MeetupFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id/meetups/:meetupid/members',
    component: MeetupMemberOverviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id/meetups/:meetupid/leave',
    component: MeetupLeaveComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id/meetups/:meetupid/cancel',
    component: MeetupCancelComponent,
    canActivate: [AuthGuard],
  },
  { path: ':id/meetups/:meetupid/contact', component: MeetupContactComponent },
  {
    path: ':id/meetups/:meetupid',
    component: MeetupDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsFeatureRoutingModule {}
