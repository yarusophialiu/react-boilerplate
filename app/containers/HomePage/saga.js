/**
 * Gets the repositories of the user from Github
 */

import {
  call,
  put,
  select,
  takeLatest,
  all,
  take,
  takeEvery,
} from 'redux-saga/effects';
import { LOAD_REPOS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';
import * as api from '../UsersPage/userApi';
import { DELETE_USER_REQUEST, GET_USERS_REQUEST } from './constants';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_REPOS, getRepos);
}

export function* getUsers() {
  try {
    const results = yield call(api.getUsers);
    yield put({ type: 'GET_USERS_SUCCESS', payload: results.data });
  } catch (e) {
    // console.log(e);
  }
}

export function* watchGetUserRequest() {
  yield takeEvery(GET_USERS_REQUEST, getUsers);
}

export function* deleteUser({ userId }) {
  try {
    yield call(api.deleteUser, userId);
    // yield put({ type: 'DELETE_USER_SUCCESS', payload: { userId } });
    yield call(getUsers);
  } catch (e) {
    // console.log(e);
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

export default function* rootSaga() {
  yield all([githubData(), watchGetUserRequest(), watchDeleteUserRequest()]);
}
