import { Action, createReducer, on } from '@ngrx/store';
import * as categoryActions from './categories.actions';
import { Category } from '@workspace/shared/data';

export const featureName = 'categories';

export interface CategoriesRootState {
  categories: Category[];
}

export const initialState: CategoriesRootState = {
  categories: []
};

const categoryReducerInternal = createReducer(
  initialState,

  on(categoryActions.getAllSuccess, (state, { payload }) => {
    return {
      ...state,
      categories: payload.value
    };
  })
);

export function categoryReducer(
  state: CategoriesRootState | undefined,
  action: Action
) {
  return categoryReducerInternal(state, action);
}
