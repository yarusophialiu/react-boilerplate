import { GET_USERS_REQUEST } from './constants';

export function getUsers() {
  return {
    type: GET_USERS_REQUEST,
  };
}
