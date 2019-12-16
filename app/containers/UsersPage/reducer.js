// The initial state of the App
// import produce from 'immer';
import { combineReducers } from 'redux';
import { GET_USERS_SUCCESS } from './constants';

export const initialState = {
  users: [],
  // error: '',
};

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload.users,
      };
    }

    default: {
      return state;
    }
  }
}
// produce(state, draft => {
//   switch (action.type) {
//     case GET_USERS_REQUEST:
//       draft.items = [...state, action.payload.items];
//       // draft.items = state.concat(action.payload.items);
//       break;

//     default: {
//       return state;
//     }
//   }
// });

// export default usersReducer;

export default combineReducers({
  users: usersReducer,
});
