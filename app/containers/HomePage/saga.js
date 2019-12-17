/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest, all, take } from 'redux-saga/effects';
import { LOAD_REPOS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';
import * as api from '../UsersPage/userApi';
import { DELETE_USER_REQUEST } from './constants';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  console.log('run');
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
  console.log('watch');
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_REPOS, getRepos);
}

export function* deleteUser({ userId }) {
  try {
    console.log('hi2', userId);
    yield call(api.deleteUser, userId);
    // yield call(getUsers);
    yield put({ type: 'DELETE_USER_SUCCESS', payload: { userId } });
  } catch (e) {
    console.log(e);
  }
}

export function* watchDeleteUserRequest() {
  // console.log('hi1');
  // yield takeLatest(DELETE_USER_REQUEST, deleteUser);
  // yield takeLatest(DELETE_USER_REQUEST, getRepos);
  while (true) {
    console.log('hi1');
    const action = yield take(DELETE_USER_REQUEST);
    yield call(deleteUser, {
      userId: action.payload.userId,
    });
  }
}

export default function* rootSaga() {
  yield all([githubData(), watchDeleteUserRequest()]);
}
