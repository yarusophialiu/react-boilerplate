/**
 * UsersPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUsers = state => state.users || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectUsers,
    usersState => usersState.users,
  );

export { selectUsers, makeSelectUsername };
