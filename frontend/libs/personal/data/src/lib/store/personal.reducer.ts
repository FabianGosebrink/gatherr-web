import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { Gathering, Group } from '@workspace/shared/data';
import * as personalActions from './personal.actions';

export interface ReducerPersonalState {
  groups: { [id: string]: Group };
  gatherings: { [id: string]: Gathering };
  loading: boolean;
}

export const initialState: ReducerPersonalState = {
  groups: {},
  gatherings: {},
  loading: false,
};

export const personalReducer = createReducer(
  initialState,

  on(
    personalActions.getAllPersonalGroups,
    personalActions.getAllPersonalGatherings,
    (state) => {
      return {
        ...state,
        loading: true,
      };
    }
  ),

  on(personalActions.getAllPersonalGroupsSuccess, (state, { payload }) => {
    const groups: { [id: string]: Group } = {};

    for (const entity of payload.value) {
      groups[entity.id] = entity;
    }

    return {
      ...state,
      groups,
      loading: false,
    };
  }),

  on(personalActions.getAllPersonalGatheringsSuccess, (state, { payload }) => {
    const gatherings: { [id: string]: Gathering } = {};

    for (const entity of payload.value) {
      gatherings[entity.id] = entity;
    }

    return {
      ...state,
      gatherings,
      loading: false,
    };
  }),

  on(personalActions.personalError, (state, { payload }) => {
    return {
      ...state,
      loading: false,
    };
  })
);

export interface PersonalState {
  personal: ReducerPersonalState;
}

export const personalReducers: ActionReducerMap<PersonalState> = {
  personal: personalReducer,
};
