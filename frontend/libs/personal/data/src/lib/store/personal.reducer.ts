import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { Group, Meetup } from '@workspace/shared/data';
import * as personalActions from './personal.actions';

export interface ReducerPersonalState {
  groups: { [id: string]: Group };
  meetups: { [id: string]: Meetup };
  loading: boolean;
}

export const initialState: ReducerPersonalState = {
  groups: {},
  meetups: {},
  loading: false,
};

export const personalReducer = createReducer(
  initialState,

  on(
    personalActions.getAllPersonalGroups,
    personalActions.getAllPersonalMeetups,
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

  on(personalActions.getAllPersonalMeetupsSuccess, (state, { payload }) => {
    const meetups: { [id: string]: Meetup } = {};

    for (const entity of payload.value) {
      meetups[entity.id] = entity;
    }

    return {
      ...state,
      meetups,
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
