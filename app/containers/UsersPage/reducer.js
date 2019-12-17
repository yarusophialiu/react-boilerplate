// The initial state of the App
// import produce from 'immer';
import produce from 'immer';
import { GET_USERS_SUCCESS } from './constants';

export const initialState = {
  users: [],
  // error: '',
};

const usersReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_USERS_SUCCESS:
        // Delete prefixed '@' from the github username
        // draft.users = [...state, action.payload.users];
        console.log('hi', action);
        break;

      default:
        return state;
    }
  });

export default usersReducer;
