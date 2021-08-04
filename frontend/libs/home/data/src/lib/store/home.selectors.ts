import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './home.reducer';

export const featureName = 'home';
export const getHomeFeatureState = createFeatureSelector(featureName);

export const selectHomeState = createSelector(
  getHomeFeatureState,
  (state: fromReducer.HomeState) => state.home
);

export const selectAllLocalGatherings = createSelector(
  selectHomeState,
  (state: fromReducer.HomeReducerState, props) => {
    const result = Object.keys(state.gatherings).map(
      (id) => state.gatherings[id]
    );
    // const toReturn = [];

    // for (let index = 0; index < 10; index++) {
    //   toReturn.push(result[0]);
    // }

    return result.slice(
      0,
      props?.count || Object.keys(state.gatherings).length
    );
  }
);

export const selectCurrentPlace = createSelector(
  selectHomeState,
  (state: fromReducer.HomeReducerState) => state.currentPlace
);

export const selectAllLocalGatheringsCount = createSelector(
  selectHomeState,
  (state: fromReducer.HomeReducerState) => Object.keys(state.gatherings).length
);

export const selectIsLoading = createSelector(
  selectHomeState,
  (state: fromReducer.HomeReducerState) => state.loading
);
