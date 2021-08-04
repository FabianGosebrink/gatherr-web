import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { Gathering, Place } from '@workspace/shared/data';
import * as homeActions from './home.actions';

export interface HomeReducerState {
  gatherings: { [id: string]: Gathering };
  currentPlace: Place;
  loading: boolean;
}

export const initialState: HomeReducerState = {
  gatherings: {},
  currentPlace: null,
  loading: false,
};

export const homeReducer = createReducer(
  initialState,

  on(homeActions.getLocalGatherings, homeActions.getCurrentPlace, (state) => {
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

  on(homeActions.getMoreLocalGatheringsComplete, (state, { payload }) => {
    const existingGatherings: { [id: string]: Gathering } = state.gatherings;

    const newGatherings: { [id: string]: Gathering } = {};
    for (const entity of payload.value) {
      newGatherings[entity.id] = entity;
    }

    const allGatherings = { ...existingGatherings, ...newGatherings };

    return {
      ...state,
      gatherings: allGatherings,
      loading: false,
    };
  }),

  on(homeActions.getLocalGatheringsComplete, (state, { payload }) => {
    const gatherings: { [id: string]: Gathering } = {};
    for (const entity of payload.value) {
      gatherings[entity.id] = entity;
    }

    return {
      ...state,
      gatherings,
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
