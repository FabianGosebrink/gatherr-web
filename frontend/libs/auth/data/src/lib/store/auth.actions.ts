import { createAction, props } from '@ngrx/store';

export const checkAuth = createAction('[Auth] checkAuth');
export const login = createAction('[Auth] login with google');
export const checkAuthComplete = createAction(
  '[Auth] checkAuthComplete',
  props<{ isAuth: boolean }>()
);
export const loginComplete = createAction(
  '[Auth] loginComplete',
  props<{ isLoggedIn: boolean }>()
);
export const setProfile = createAction(
  '[Auth] setProfile',
  props<{ profile: any }>()
);

export const logout = createAction('[Auth] logout');
export const logoutComplete = createAction('[Auth] logoutComplete');
