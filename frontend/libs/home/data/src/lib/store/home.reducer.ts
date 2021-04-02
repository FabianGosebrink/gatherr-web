import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { Meetup, Place } from '@workspace/shared/data';
import * as homeActions from './home.actions';

export interface HomeReducerState {
  meetups: { [id: string]: Meetup };
  currentPlace: Place;
  loading: boolean;
}

export const initialState: HomeReducerState = {
  meetups: {},
  currentPlace: null,
  loading: false,
};

export const homeReducer = createReducer(
  initialState,

  on(homeActions.getLocalMeetups, homeActions.getCurrentPlace, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(homeActions.homeError, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),

  on(homeActions.getCurrentPlaceComplete, (state, { payload }) => {
    return {
      ...state,
      currentPlace: payload,
      loading: false,
    };
  }),

  on(homeActions.getMoreLocalMeetupsComplete, (state, { payload }) => {
    const existingMeetups: { [id: string]: Meetup } = state.meetups;

    const newMeetups: { [id: string]: Meetup } = {};
    for (const entity of payload.value) {
      newMeetups[entity.id] = entity;
    }

    const allMeetups = { ...existingMeetups, ...newMeetups };

    return {
      ...state,
      meetups: allMeetups,
      loading: false,
    };
  }),

  on(homeActions.getLocalMeetupsComplete, (state, { payload }) => {
    const meetups: { [id: string]: Meetup } = {};
    for (const entity of payload.value) {
      meetups[entity.id] = entity;
    }

    return {
      ...state,
      meetups,
      loading: false,
    };
  })
);

export interface HomeState {
  home: HomeReducerState;
}

export const homeReducers: ActionReducerMap<HomeState> = {
  home: homeReducer,
};
