/**
 * UsersPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from '../HomePage/reducer';

const selectUsers = state => state.home || initialState;

const makeSelectUsers = () =>
  createSelector(
    selectUsers,
    // usersstate is the result of selectUsers
    usersState => usersState.users,
  );

export { selectUsers, makeSelectUsers };
