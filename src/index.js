import { delay } from 'redux-saga'
import { call, put, take, race } from 'redux-saga/effects'
import { getToken, setToken, clearToken } from './storage'
import { authenticate } from './api'

/*
* Clears token from localStorage, informs store of signout and redirects to login
*/
function* signout(error, onLogoutAction) {
  yield call(removeToken);
  yield put(onLogoutAction(error));
  yield call(nav.pushRoute, '/login');
}

/*
* Calls the authService and stores the token, cancels if a signout occurs
*/
function* authorize(options, credentialsOrToken, redirectTo) {
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
  if (redirectTo) yield call(nav.pushRoute, redirectTo);

  // return the token
  return response.token;
}

/*
* Primary authentication flow
*/
/*
    options = {
        storageType: 'localStorage|sessionStorage',
        loginActionType: 'String',
        logoutActionType: 'String',
        onLoginAction: 'Object',
        onLogoutAction: 'Object'
    }
*/
export default function* authSaga(options) {
  // Check if a token exists when app starts
  let token = yield call(getToken, options.storageType);

  // Expire the token immediately if we found one
  if (token && typeof token === 'object') token.expiresIn = 0;

  while (true) {
    // If there wasn't a token, wait for the user to sign in
    if (!token) {
      let { payload: { credentials, redirectTo } } = yield take(options.loginActionType);
      token = yield call(authorize, options, credentials, redirectTo);
    }

    // Login failed, wait until next sign in
    if (!token) continue;

    // Run as long as the user is signed in
    while (token) {
      // Wait for either token expiration or signout, whichever comes first
      const { expired } = yield race({
        expired: delay(token.expires_in * 1000),
        signout: take(options.logoutActionType),
      });

      // if token expired, try to refresh the token, otherwise signout
      if (expired) {
        token = yield call(authorize, options, token);
      } else { // user signed out manually
        token = null;
      }
    }

    if (!token) yield call(signout, 'Signed out', options.onLogoutAction);
  }
}
