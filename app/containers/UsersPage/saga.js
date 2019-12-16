import { takeEvery, call, fork, put } from 'redux-saga/effects';
import { GET_USERS_REQUEST } from './constants';
import * as actions from './actions';
import * as api from './userApi';

function* getUsers() {
  try {
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

function* watchGetUsersRequest() {
  yield takeEvery(GET_USERS_REQUEST, getUsers);
}

const usersSagas = [fork(watchGetUsersRequest)];

export default usersSagas;
