import { createSelector } from '@ngrx/store';
import { selectCurrentUserIdentifier } from '@workspace/auth/data';
import { Meetup, MeetupMember, MeetupRole } from '@workspace/shared/data';
import { GroupState } from '..';
import { getGroupFeatureState } from '../groups/groups.selectors';
import * as fromReducer from './meetups.reducer';

export const selectMeetupState = createSelector(
  getGroupFeatureState,
  (state: GroupState) => state.meetups
);

export const selectAllMeetups = createSelector(
  selectMeetupState,
  (state: fromReducer.ReducerMeetupState) =>
    Object.keys(state.entities).map((id) => state.entities[id])
);

export const selectCurrentMeetup = createSelector(
  selectMeetupState,
  (state: fromReducer.ReducerMeetupState) => state.selectedItem
);

export const selectAllCurrentMeetupAttendees = createSelector(
  selectMeetupState,
  (state: fromReducer.ReducerMeetupState) => state.attendees
);

export const selectAllCurrentMeetupAttendeesCount = createSelector(
  selectMeetupState,
  (state: fromReducer.ReducerMeetupState) => state.attendees.length
);

export const selectAllCurrentMeetupAttendeesCountInPercent = createSelector(
  selectCurrentMeetup,
  selectAllCurrentMeetupAttendeesCount,
  (meetup: Meetup, count: number) =>
    `${Math.round((100 / meetup.maxAttendees) * count)}`
);

export const selectCurrentMeetupOrganisers = createSelector(
  selectAllCurrentMeetupAttendees,
  (attendees: MeetupMember[]) =>
    attendees.filter((x) => x.role === MeetupRole.Organiser)
);

export const selectCurrentMeetupWaitingList = createSelector(
  selectAllCurrentMeetupAttendees,
  (attendees: MeetupMember[]) =>
    attendees.filter((x) => x.role === MeetupRole.WaitingList)
);

export const selectCurrentMeetupAttendees = createSelector(
  selectAllCurrentMeetupAttendees,
  (attendees: MeetupMember[]) =>
    attendees.filter((x) => x.role === MeetupRole.Attendee)
);

export const selectCurrentMember = createSelector(
  selectAllCurrentMeetupAttendees,
  selectCurrentUserIdentifier,
  (attendees: MeetupMember[], username: string) => {
    return attendees.find((x) => x.userProfile?.userIdentifier === username);
  }
);

export const selectIsCurrentUserOnWaitingList = createSelector(
  selectCurrentMeetupWaitingList,
  selectCurrentUserIdentifier,
  (attendees: MeetupMember[], username: string) => {
    return !!attendees.find((x) => x.userProfile?.userIdentifier === username);
  }
);

export const selectIsCurrentUserMeetupAttendee = createSelector(
  selectAllCurrentMeetupAttendees,
  selectCurrentUserIdentifier,
  (attendees: MeetupMember[], username: string) => {
    return !!attendees.find((x) => x.userProfile?.userIdentifier === username);
  }
);

export const selectIsCurrentUserMeetupOrganiser = createSelector(
  selectCurrentMeetupOrganisers,
  selectCurrentUserIdentifier,
  (organisers: MeetupMember[], username: string) => {
    return !!organisers.find((x) => x.userProfile?.userIdentifier === username);
  }
);

export const selectIsCurrentUserAttending = createSelector(
  selectCurrentMeetupAttendees,
  selectCurrentMeetupOrganisers,
  selectCurrentUserIdentifier,
  (attendees: MeetupMember[], organisers: MeetupMember[], username: string) => {
    const attendeesAndOrganisers = [...attendees, ...organisers];
    return !!attendeesAndOrganisers.find(
      (x) => x.userProfile?.userIdentifier === username
    );
  }
);

export const selectIsLoading = createSelector(
  selectMeetupState,
  (state: fromReducer.ReducerMeetupState) => state.loading
);

export const selectAllUpcomingMeetups = createSelector(
  selectAllMeetups,
  (meetups: Meetup[]) => {
    const allMeetups = meetups || [];
    const upcomingMeetups = [];

    allMeetups.forEach((meetup) => {
      if (new Date(meetup.date) >= new Date()) {
        upcomingMeetups.push(meetup);
      }
    });
    return upcomingMeetups;
  }
);

export const selectPreviousMeetup = createSelector(
  selectAllMeetups,
  (meetups: Meetup[]) => {
    const allMeetups = meetups || [];
    const previousMeetups = [];

    allMeetups.forEach((meetup) => {
      if (new Date(meetup.date) < new Date()) {
        previousMeetups.push(meetup);
      }
    });
    return previousMeetups[0] || null;
  }
);

export const selectNextMeetup = createSelector(
  selectAllUpcomingMeetups,
  (upcomingMeetups: Meetup[]) => upcomingMeetups[0]
);

export const selectUpcomingMeetup = createSelector(
  selectAllUpcomingMeetups,
  (upcomingMeetups: Meetup[]) => {
    const clone = [...upcomingMeetups];
    clone.shift();
    return clone[0] || null;
  }
);
export const selectMeetupAddress = createSelector(
  selectMeetupState,
  (state: fromReducer.ReducerMeetupState) => state.address
);

export const selectAllMeetupRoles = createSelector(
  selectMeetupState,
  (state: fromReducer.ReducerMeetupState) => state.roles
);
