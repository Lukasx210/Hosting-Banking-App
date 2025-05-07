import { createSelector } from 'reselect';
const authSelect = (state) => state.auth;

export const selectAuth = (state) => state.auth;
export const selectCurrentAdmin = createSelector([selectAuth], (auth) => auth.current);

export const isLoggedIn = createSelector([selectAuth], (auth) => auth.isLoggedIn);
export const access_token = createSelector([selectAuth], (auth) => auth.current.access_token);
export const refresh_token = createSelector([selectAuth], (auth) => auth.current.refresh_token);
