import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureName, CategoriesRootState } from './categories.reducer';

export const getCategoryFeatureState = createFeatureSelector(featureName);

export const selectAllCategories = createSelector(
  getCategoryFeatureState,
  (state: CategoriesRootState) => state.categories
);
