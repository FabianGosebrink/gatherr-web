import { Action, createReducer, on } from '@ngrx/store';
import {
  Group,
  GroupLinks,
  GroupMember,
  PagingMetadata,
} from '@workspace/shared/data';
import * as groupSignalRActions from './groups-signalr.actions';
import * as groupActions from './groups.actions';

export interface ReducerGroupState {
  entities: { [id: string]: Group };
  selectedItem: Group;
  groupMembers: GroupMember[];
  links: GroupLinks[];
  metadata: PagingMetadata;
  loading: boolean;
  roles: any;
}

export const initialState: ReducerGroupState = {
  entities: {},
  selectedItem: null,
  groupMembers: [],
  links: [],
  metadata: null,
  loading: false,
  roles: null,
};

const groupReducerInternal = createReducer(
  initialState,

  on(
    groupActions.addGroup,
    groupActions.updateGroup,
    groupActions.updateCompleteGroup,
    groupActions.getAllGroups,
    groupActions.getSingleGroup,
    groupActions.getAllMembersFromGroup,
    groupActions.becomeMember,
    groupActions.removeCurrentMember,
    groupActions.sendGroupMessage,
    (state) => {
      return {
        ...state,
        loading: true,
      };
    }
  ),

  on(groupActions.groupError, groupActions.sendGroupMessageSuccess, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),

  on(
    groupActions.updateGroupSuccess,
    groupSignalRActions.signalrGroupAdded,
    (state, { payload }) => {
      const entities = {
        ...state.entities,
        [payload.value.id]: payload.value,
      };

      return {
        ...state,
        entities,
        loading: false,
      };
    }
  ),

  on(groupActions.getAllGroupsSuccess, (state, { payload }) => {
    const entities: { [id: string]: Group } = {};

    for (const entity of payload.value) {
      entities[entity.id] = entity;
    }

    return {
      ...state,
      entities,
      metadata: payload.metadata,
      links: payload.links,
      loading: false,
    };
  }),

  on(groupActions.getSingleGroupSuccess, (state, { payload }) => {
    return {
      ...state,
      selectedItem: payload.value,
      loading: false,
    };
  }),

  on(groupActions.getAllMembersFromGroupSuccess, (state, { payload }) => {
    return {
      ...state,
      groupMembers: payload.value,
      loading: false,
    };
  }),

  on(groupActions.getGroupRolesSuccess, (state, { payload }) => {
    return {
      ...state,
      roles: payload,
      loading: false,
    };
  }),

  on(
    groupSignalRActions.signalrGroupMemberAdded,
    groupSignalRActions.signalrGroupMemberRemoved,
    (state, { payload }) => {
      return {
        ...state,
        groupMembers: payload.value,
        loading: false,
      };
    }
  ),

  on(groupActions.updateMemberSuccess, (state, { payload }) => {
    const allMembers = [...state.groupMembers];
    const index = allMembers.findIndex(
      (x) => x.memberId === payload.value.memberId
    );

    allMembers[index] = payload.value;

    return {
      ...state,
      groupMembers: allMembers,
      loading: false,
    };
  })
);

export function groupReducer(
  state: ReducerGroupState | undefined,
  action: Action
) {
  return groupReducerInternal(state, action);
}
