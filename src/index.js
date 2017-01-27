import 'babel-polyfill'
import { delay } from 'redux-saga'
import { call, take, race } from 'redux-saga/effects'
import { getToken } from './storage'

import authorize from './authorize'
import signout from './signout'
import validateOptions from './validateOptions'

/*
* Primary authentication flow
*/
export default function* authSaga(options) {
  validateOptions(options)
  
  // Check if a token exists when app starts
  let token = yield call(getToken, options.storageType)

  // Expire the token immediately if we found one
  if (token && typeof token === 'object') token.expires_in = 0

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // If there wasn't a token, wait for the user to sign in
    if (!token) {
      let { payload: { credentials, redirectTo } } = yield take(options.loginActionType)
      token = yield call(authorize, options, credentials, redirectTo || null)
    }

    // Login failed, wait until next sign in
    if (!token) continue

    // Run as long as the user is signed in
    // eslint-disable-next-line no-constant-condition
    while (token) {
      // Wait for either token expiration or signout, whichever comes first
      const { expired } = yield race({
        expired: delay(token.expires_in * 1000),
        signout: take(options.logoutActionType),
      })

      // if token expired, try to refresh the token, otherwise signout
      if (expired) {
        token = yield call(authorize, options, token)
      } else { // user signed out manually
        token = null
      }
    }

    if (!token) yield call(signout, 'Signed out', options)
  }
}
