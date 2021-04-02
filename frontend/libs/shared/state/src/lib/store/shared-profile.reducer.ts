import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { UserProfile } from '@workspace/shared/data';
import * as sharedProfileActions from './shared-profile.actions';

export interface ReducerSharedProfileState {
  userProfile: UserProfile;
  loading: boolean;
}

export const initialState: ReducerSharedProfileState = {
  userProfile: null,
  loading: false,
};

export const sharedProfileReducer = createReducer(
  initialState,

  on(sharedProfileActions.getSharedProfile, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(
    sharedProfileActions.getSharedProfileSuccess,
    sharedProfileActions.addSharedProfileSuccess,
    sharedProfileActions.updateSharedProfileSuccess,
    (state, { payload }) => {
      return {
        ...state,
        userProfile: payload.value,
        loading: false,
      };
    }
  ),

  on(sharedProfileActions.sharedProfileError, (state, { payload }) => {
    return {
      ...state,
      userProfile: null,
      loading: false,
    };
  })
);

export interface SharedProfileState {
  sharedProfile: ReducerSharedProfileState;
}

export const sharedProfileReducers: ActionReducerMap<SharedProfileState> = {
  sharedProfile: sharedProfileReducer,
};
