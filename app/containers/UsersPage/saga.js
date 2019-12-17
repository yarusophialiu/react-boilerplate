import { takeLatest, take, call, all, put } from 'redux-saga/effects';
import { GET_USERS_REQUEST, DELETE_USER_REQUEST } from './constants';
import * as actions from './actions';
import * as api from './userApi';

export function* getUsers() {
  try {
    const result = yield call(api.getUsers);
    // dispatch action
    yield put(
      actions.getUsersSuccess({
        items: result.data.data,
      }),
    );
  } catch (err) {
    // console.log(e);
  }
}

export function* watchGetUsersRequest() {
  while (true) {
    yield take(GET_USERS_REQUEST, getUsers);
  }
}

export function* deleteUser({ userId }) {
  try {
    yield call(api.deleteUser, userId);
    // yield call(getUsers);
    yield put({ type: 'DELETE_USER_SUCCESS', payload: { userId } });
  } catch (e) {
    // console.log(e);
  }
}

export function* watchDeleteUserRequest() {
  yield takeLatest(DELETE_USER_REQUEST, deleteUser);
}

export default function* rootSaga() {
  yield all([watchGetUsersRequest(), watchDeleteUserRequest()]);
}
