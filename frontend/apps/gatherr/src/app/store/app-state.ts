import {
  BaseRouterStoreState,
  routerReducer,
  RouterReducerState,
} from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects, authReducer, AuthRootState } from '@workspace/auth/data';
import {
  CategoriesEffects,
  CategoriesRootState,
  categoryReducer,
} from '@workspace/category/data';

export interface AppState {
  auth: AuthRootState;
  router: RouterReducerState<BaseRouterStoreState>;
  categories: CategoriesRootState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  router: routerReducer,
  categories: categoryReducer,
};

export const allMainEffects = [AuthEffects, CategoriesEffects];
