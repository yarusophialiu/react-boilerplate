import { GET_USERS_REQUEST, GET_USERS_SUCCESS } from './constants';

export function getUsersRequest() {
  return {
    type: GET_USERS_REQUEST,
  };
}

export const getUsersSuccess = ({ items }) => ({
  type: GET_USERS_SUCCESS,
  payload: { items },
});
