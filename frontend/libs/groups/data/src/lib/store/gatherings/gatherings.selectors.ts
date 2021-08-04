import { createSelector } from '@ngrx/store';
import { selectCurrentUserIdentifier } from '@workspace/auth/data';
import {
  Gathering,
  GatheringMember,
  GatheringRole,
} from '@workspace/shared/data';
import { GroupState } from '..';
import { getGroupFeatureState } from '../groups/groups.selectors';
import * as fromReducer from './gatherings.reducer';

export const selectGatheringState = createSelector(
  getGroupFeatureState,
  (state: GroupState) => state.gatherings
);

export const selectAllGatherings = createSelector(
  selectGatheringState,
  (state: fromReducer.ReducerGatheringState) =>
    Object.keys(state.entities).map((id) => state.entities[id])
);

export const selectCurrentGathering = createSelector(
  selectGatheringState,
  (state: fromReducer.ReducerGatheringState) => state.selectedItem
);

export const selectAllCurrentGatheringAttendees = createSelector(
  selectGatheringState,
  (state: fromReducer.ReducerGatheringState) => state.attendees
);

export const selectAllCurrentGatheringAttendeesCount = createSelector(
  selectGatheringState,
  (state: fromReducer.ReducerGatheringState) => state.attendees.length
);

export const selectAllCurrentGatheringAttendeesCountInPercent = createSelector(
  selectCurrentGathering,
  selectAllCurrentGatheringAttendeesCount,
  (gathering: Gathering, count: number) =>
    `${Math.round((100 / gathering.maxAttendees) * count)}`
);

export const selectCurrentGatheringOrganisers = createSelector(
  selectAllCurrentGatheringAttendees,
  (attendees: GatheringMember[]) =>
    attendees.filter((x) => x.role === GatheringRole.Organiser)
);

export const selectCurrentGatheringWaitingList = createSelector(
  selectAllCurrentGatheringAttendees,
  (attendees: GatheringMember[]) =>
    attendees.filter((x) => x.role === GatheringRole.WaitingList)
);

export const selectCurrentGatheringAttendees = createSelector(
  selectAllCurrentGatheringAttendees,
  (attendees: GatheringMember[]) =>
    attendees.filter((x) => x.role === GatheringRole.Attendee)
);

export const selectCurrentMember = createSelector(
  selectAllCurrentGatheringAttendees,
  selectCurrentUserIdentifier,
  (attendees: GatheringMember[], username: string) => {
    return attendees.find((x) => x.userProfile?.userIdentifier === username);
  }
);

export const selectIsCurrentUserOnWaitingList = createSelector(
  selectCurrentGatheringWaitingList,
  selectCurrentUserIdentifier,
  (attendees: GatheringMember[], username: string) => {
    return !!attendees.find((x) => x.userProfile?.userIdentifier === username);
  }
);

export const selectIsCurrentUserGatheringAttendee = createSelector(
  selectAllCurrentGatheringAttendees,
  selectCurrentUserIdentifier,
  (attendees: GatheringMember[], username: string) => {
    return !!attendees.find((x) => x.userProfile?.userIdentifier === username);
  }
);

export const selectIsCurrentUserGatheringOrganiser = createSelector(
  selectCurrentGatheringOrganisers,
  selectCurrentUserIdentifier,
  (organisers: GatheringMember[], username: string) => {
    return !!organisers.find((x) => x.userProfile?.userIdentifier === username);
  }
);

export const selectIsCurrentUserAttending = createSelector(
  selectCurrentGatheringAttendees,
  selectCurrentGatheringOrganisers,
  selectCurrentUserIdentifier,
  (
    attendees: GatheringMember[],
    organisers: GatheringMember[],
    username: string
  ) => {
    const attendeesAndOrganisers = [...attendees, ...organisers];
    return !!attendeesAndOrganisers.find(
      (x) => x.userProfile?.userIdentifier === username
    );
  }
);

export const selectIsLoading = createSelector(
  selectGatheringState,
  (state: fromReducer.ReducerGatheringState) => state.loading
);

export const selectAllUpcomingGatherings = createSelector(
  selectAllGatherings,
  (gatherings: Gathering[]) => {
    const allGatherings = gatherings || [];
    const upcomingGatherings = [];

    allGatherings.forEach((gathering) => {
      if (new Date(gathering.date) >= new Date()) {
        upcomingGatherings.push(gathering);
      }
    });
    return upcomingGatherings;
  }
);

export const selectPreviousGathering = createSelector(
  selectAllGatherings,
  (gatherings: Gathering[]) => {
    const allGatherings = gatherings || [];
    const previousGatherings = [];

    allGatherings.forEach((gathering) => {
      if (new Date(gathering.date) < new Date()) {
        previousGatherings.push(gathering);
      }
    });
    return previousGatherings[0] || null;
  }
);

export const selectNextGathering = createSelector(
  selectAllUpcomingGatherings,
  (upcomingGatherings: Gathering[]) => upcomingGatherings[0]
);

export const selectUpcomingGathering = createSelector(
  selectAllUpcomingGatherings,
  (upcomingGatherings: Gathering[]) => {
    const clone = [...upcomingGatherings];
    clone.shift();
    return clone[0] || null;
  }
);
export const selectGatheringAddress = createSelector(
  selectGatheringState,
  (state: fromReducer.ReducerGatheringState) => state.address
);

export const selectAllGatheringRoles = createSelector(
  selectGatheringState,
  (state: fromReducer.ReducerGatheringState) => state.roles
);
