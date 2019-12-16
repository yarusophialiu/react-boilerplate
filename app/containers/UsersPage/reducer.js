// The initial state of the App
import produce from 'immer';
import { GET_USERS_REQUEST } from './constants';

export const initialState = {
  items: [],
  // error: '',
};

const usersReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_USERS_REQUEST:
        draft.items = [...state, action.payload.items];
        // draft.items = state.concat(action.payload.items);
        break;

      default: {
        return state;
      }
    }
  });

export default usersReducer;
