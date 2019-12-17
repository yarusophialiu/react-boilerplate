import { takeLatest, takeEvery, take, call, put } from 'redux-saga/effects';
import { GET_USERS_REQUEST, DELETE_USER_REQUEST } from './constants';
import * as actions from './actions';
import * as api from './userApi';

export function* getUsers() {
  try {
    console.log('user');
    const result = yield call(api.getUsers);
    // dispatch action
    yield put(
      actions.getUsersSuccess({
        items: result.data.data,
      }),
    );
  } catch (err) {
    console.log(err);
  }
}

export default function* watchGetUsersRequest() {
  while (true) {
    console.log('user2');
    yield take(GET_USERS_REQUEST, getUsers);
  }
}

export function* deleteUser({ userId }) {
  try {
    yield call(api.deleteUser, userId);
    yield call(getUsers);
  } catch (e) {
    console.log(e);
  }
}

export function* watchDeleteUserRequest() {
  while (true) {
    const action = yield take(DELETE_USER_REQUEST);
    yield call(deleteUser, {
      userId: action.payload.userId,
    });
  }
}
