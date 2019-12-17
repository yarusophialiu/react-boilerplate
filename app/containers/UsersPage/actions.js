import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  DELETE_USER_REQUEST,
} from './constants';

export function getUsersRequest() {
  return {
    type: GET_USERS_REQUEST,
  };
}

export const getUsersSuccess = ({ users }) => ({
  type: GET_USERS_SUCCESS,
  payload: { users },
});

export const deleteUserRequest = userId => ({
  type: DELETE_USER_REQUEST,
  payload: {
    userId,
  },
});
