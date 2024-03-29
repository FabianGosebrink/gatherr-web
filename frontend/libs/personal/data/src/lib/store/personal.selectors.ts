import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './personal.reducer';
import { PersonalState } from './personal.reducer';

export const featureName = 'personal';
export const getPersonalFeatureState = createFeatureSelector(featureName);

export const selectPersonalState = createSelector(
  getPersonalFeatureState,
  (state: PersonalState) => state.personal
);

export const selectAllPersonalGatherings = createSelector(
  selectPersonalState,
  (state: fromReducer.ReducerPersonalState) =>
    Object.keys(state.gatherings).map((id) => state.gatherings[id])
);

export const selectAllPersonalGroups = createSelector(
  selectPersonalState,
  (state: fromReducer.ReducerPersonalState) =>
    Object.keys(state.groups).map((id) => state.groups[id])
);

export const selectIsLoading = createSelector(
  selectPersonalState,
  (state: fromReducer.ReducerPersonalState) => state.loading
);
