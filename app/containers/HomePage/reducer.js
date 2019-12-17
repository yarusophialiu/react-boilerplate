/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

// import produce from 'immer';
import { CHANGE_USERNAME } from './constants';

// The initial state of the App
export const initialState = {
  username: '',
  users: [],
};

/* eslint-disable default-case, no-param-reassign */
// const homeReducer = (state = initialState, action) =>
//   produce(state, draft => {
//     switch (action.type) {
//       case CHANGE_USERNAME:
//         // Delete prefixed '@' from the github username
//         draft.username = action.username.replace(/@/gi, '');
//         break;
//     }
//   });

// export default homeReducer;

export default function homeReducer(state = initialState, action) {
  // produce(state, draft => {
  //   switch (action.type) {
  //     case CHANGE_USERNAME:
  //       // Delete prefixed '@' from the github username
  //       draft.username = action.username.replace(/@/gi, '');
  //       break;
  //   }
  // });
  switch (action.type) {
    case CHANGE_USERNAME: {
      return {
        ...state,
        username: action.username.replace(/@/gi, ''),
      };
    }

    case 'DELETE_USER_SUCCESS': {
      return [...state.users.filter(user => user.id !== action.payload.id)];
    }

    case 'GET_USERS_SUCCESS': {
      return {
        ...state,
        users: action.payload.data,
      };
    }

    default: {
      return state;
    }
  }
}
