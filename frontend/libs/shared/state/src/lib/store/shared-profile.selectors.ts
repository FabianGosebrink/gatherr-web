import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './shared-profile.reducer';
import { SharedProfileState } from './shared-profile.reducer';

export const featureName = 'sharedProfile';
export const getSharedProfileFeatureState = createFeatureSelector(featureName);

export const selectSharedProfileState = createSelector(
  getSharedProfileFeatureState,
  (state: SharedProfileState) => state.sharedProfile
);

export const selectSharedCurrentUserProfile = createSelector(
  selectSharedProfileState,
  (state: fromReducer.ReducerSharedProfileState) => state.userProfile
);

export const selectSharedIsLoading = createSelector(
  selectSharedProfileState,
  (state: fromReducer.ReducerSharedProfileState) => state.loading
);
