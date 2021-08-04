import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { Gathering, GatheringMember } from '@workspace/shared/data';
import * as gatheringSignalRActions from './gathering-signalr.actions';
import * as gatheringActions from './gatherings.actions';

export const featureName = 'gatherings';
export interface ReducerGatheringState {
  entities: { [id: string]: Gathering };
  selectedItem: Gathering;
  attendees: GatheringMember[];
  address: string;
  loading: boolean;
  roles: any;
}

export const initialState: ReducerGatheringState = {
  entities: {},
  attendees: [],
  selectedItem: null,
  address: '',
  loading: false,
  roles: null,
};

const gatheringReducerInternal = createReducer(
  initialState,

  on(
    gatheringActions.addGatheringToCurrentGroup,
    gatheringActions.updateGathering,
    gatheringActions.getAllGatheringsFromGroup,
    gatheringActions.getSingleGathering,
    gatheringActions.getAttendeesFromCurrentGathering,
    gatheringActions.addCurrentUserToAttendGathering,
    gatheringActions.removeCurrentUserFromGatheringAttendees,
    (state) => {
      return {
        ...state,
        loading: true,
      };
    }
  ),

  on(
    gatheringSignalRActions.signalrGatheringAdded,
    gatheringActions.updateGatheringSuccess,
    gatheringActions.cancelGatheringSuccess,
    (state, { gathering }) => {
      const entities = {
        ...state.entities,
        [gathering.value.id]: gathering.value,
      };

      return {
        ...state,
        entities,
        loading: false,
      };
    }
  ),

  on(
    gatheringActions.getAllGatheringsFromGroupSuccess,
    (state, { payload }) => {
      const entities: { [id: string]: Gathering } = {};

      for (const entity of payload.value) {
        entities[entity.id] = entity;
      }

      return {
        ...state,
        entities,
        loading: false,
      };
    }
  ),

  on(gatheringActions.getSingleGatheringSuccess, (state, { payload }) => {
    return {
      ...state,
      selectedItem: payload.value,
      loading: false,
    };
  }),

  on(
    gatheringActions.getAttendeesFromCurrentGatheringSuccess,
    (state, { payload }) => {
      return {
        ...state,
        attendees: payload.value,
        loading: false,
      };
    }
  ),

  on(
    gatheringSignalRActions.signalrGatheringMemberAdded,
    (state, { payload }) => {
      const attendees = [...state.attendees, payload.value];

      return {
        ...state,
        attendees,
        loading: false,
      };
    }
  ),

  on(
    gatheringSignalRActions.signalrGatheringMemberRemoved,
    (state, { payload }) => {
      const toRemove = payload.value;

      const attendees = state.attendees.filter(
        (x) => x.memberId !== toRemove.memberId
      );

      return {
        ...state,
        attendees,
        loading: false,
      };
    }
  ),

  on(gatheringActions.getGatheringRolesSuccess, (state, { payload }) => {
    return {
      ...state,
      roles: payload,
      loading: false,
    };
  }),

  on(gatheringActions.getGatheringsAddressSuccess, (state, { address }) => {
    return {
      ...state,
      address,
    };
  })
);

export function gatheringReducer(
  state: ReducerGatheringState | undefined,
  action: Action
) {
  return gatheringReducerInternal(state, action);
}

export const getGatheringFeatureState = createFeatureSelector(featureName);
