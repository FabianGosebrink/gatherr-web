import { Action, createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';

export const featureName = 'auth';

export interface AuthRootState {
  userProfile: any;
  isLoggedIn: boolean;
}

export const initialState: AuthRootState = {
  userProfile: null,
  isLoggedIn: false,
};

const authReducerInternal = createReducer(
  initialState,

  on(authActions.loginComplete, (state, { isLoggedIn }) => {
    return {
      ...state,
      isLoggedIn,
    };
  }),
  on(authActions.setProfile, (state, { profile }) => {
    return {
      ...state,
      userProfile: profile,
    };
  }),
  on(authActions.logout, (state, {}) => {
    return {
      ...state,
      userProfile: null,
      isLoggedIn: false,
    };
  })
);

export function authReducer(state: AuthRootState | undefined, action: Action) {
  return authReducerInternal(state, action);
}
