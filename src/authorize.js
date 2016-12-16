import { call, put, take, race } from 'redux-saga/effects'
import { authenticate } from './api'
import { setToken } from './storage'

/*
* Calls the authService and stores the token, cancels if a signout occurs
*/
export default function* authorize(options, credentialsOrToken, redirectTo) {
  // Wait for response from server or signout, whichever comes first
  const { response } = yield race({
    response: call(authenticate, options.endpoint, credentialsOrToken),
    signout: take(options.logoutActionType),
  });

  // user signed out or response contained errors
  if (!response || !response.token) {
    yield call(options.signoutAction, response ? response.error : 'Signed out');
    return null;
  }

  // store the token in localStorage
  yield call(setToken, options.storageType, response.token);

  // dispatch auth success
  yield put(options.onLoginAction(response.token));

  // redirect if specified
  if (redirectTo) yield call(redirectTo);

  // return the token
  return response.token;
}
