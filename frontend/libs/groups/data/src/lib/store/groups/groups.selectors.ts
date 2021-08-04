import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectCurrentUserIdentifier } from '@workspace/auth/data';
import { GroupMember, GroupRole } from '@workspace/shared/data';
import { GroupState } from '..';
import * as fromReducer from './groups.reducer';

export const featureName = 'groups';
export const getGroupFeatureState = createFeatureSelector(featureName);

export const selectGroupState = createSelector(
  getGroupFeatureState,
  (state: GroupState) => state.groups
);

export const selectAllEntities = createSelector(
  selectGroupState,
  (state: fromReducer.ReducerGroupState) =>
    Object.keys(state.entities).map((id) => state.entities[id])
);

export const selectGroupsLoading = createSelector(
  selectGroupState,
  (state: fromReducer.ReducerGroupState) => state.loading
);

export const selectCurrentGroup = createSelector(
  selectGroupState,
  (state: fromReducer.ReducerGroupState) => state.selectedItem
);

export const selectCurrentMembers = createSelector(
  selectGroupState,
  (state: fromReducer.ReducerGroupState) => state.groupMembers
);

export const selectAllOrganisers = createSelector(
  selectCurrentMembers,
  (members: GroupMember[]) => {
    const allOrganisers = members.filter(
      (x) => x.role === GroupRole.Organiser || x.role === GroupRole.Admin
    );
    return allOrganisers;
  }
);

export const selectCurrentMemberItem = createSelector(
  selectCurrentMembers,
  selectCurrentUserIdentifier,
  (members: GroupMember[], userIdentifier: string) => {
    return members.find((x) => x.userProfile.userIdentifier === userIdentifier);
  }
);

export const selectIsCurrentUserMember = createSelector(
  selectCurrentMemberItem,
  (member: GroupMember) => !!member
);

export const selectIsCurrentUserOrganiser = createSelector(
  selectCurrentMemberItem,
  (member: GroupMember) => !!member && member.role === GroupRole.Organiser
);

export const selectIsCurrentUserAdmin = createSelector(
  selectCurrentMemberItem,
  (member: GroupMember) => !!member && member.role === GroupRole.Admin
);

export const selectCanAddNewGatherings = createSelector(
  selectIsCurrentUserOrganiser,
  selectIsCurrentUserAdmin,
  (isOrganiser: boolean, isAdmin: boolean) => isOrganiser || isAdmin
);

export const selectPaginationMetadata = createSelector(
  selectGroupState,
  (state: fromReducer.ReducerGroupState) => state.metadata
);

export const selectLinks = createSelector(
  selectGroupState,
  (state: fromReducer.ReducerGroupState) => state.links
);

export const selectAllGroupRoles = createSelector(
  selectGroupState,
  (state: fromReducer.ReducerGroupState) => state.roles
);
