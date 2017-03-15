import test from 'ava'
import authorize from '../src/authorize'
import { call, race, take, put } from 'redux-saga/effects'
import { authenticate } from '../src/api'
import { setToken } from '../src/storage'

const opts = {
  endpoint: 'http://localhost/auth',
  logoutActionType: 'LOGOUT',
  onLogoutAction: error => ({ type: 'LOGOUT_REQUEST', error }),
  storageType: 'localStorage',
  onLoginFailedAction: error => ({ type: 'LOGIN_FAILED', error }),
  onLoginAction: token => ({ type: 'LOGIN_SUCCESS', token }),
}

const credentialsOrToken = {
  email: 'testuser',
  password: '1337$tr33t'
}

test('should call onLoginFailedAction when auth fails', t => {
  const generator = authorize(opts, credentialsOrToken)
  const mockResponse = { response: { error: 'err' } }
  let next = generator.next()

  t.deepEqual(next.value, race({
    response: call(authenticate, opts.endpoint, credentialsOrToken),
    signout: take(opts.logoutActionType)
  }))

  // Login action was dispatched prior to auth response OR login failed
  next = generator.next(mockResponse)
  t.deepEqual(next.value, put(opts.onLoginFailedAction(mockResponse.response.error)))
  // Done
  next = generator.next()
  t.true(next.done)
})

test('should set token if auth is successful', t => {
  const generator = authorize(opts, credentialsOrToken)
  const mockResponse = { response: { token: 'foo' } }

  let next = generator.next()

  t.deepEqual(next.value, race({
    response: call(authenticate, opts.endpoint, credentialsOrToken),
    signout: take(opts.logoutActionType)
  }))

  // Simulate getting a token from out API and set storage
  next = generator.next(mockResponse)
  t.deepEqual(next.value, call(setToken, opts.storageType, mockResponse.response.token))
  // Dispatches action for successful login
  next = generator.next()
  t.deepEqual(next.value, put(opts.onLoginAction(mockResponse.response.token)))
  // Done
  next = generator.next()
  t.true(next.done)
})

test('should call redirect callback if provided', t => {
  const redirectTo = () => {}
  const generator = authorize(opts, credentialsOrToken, redirectTo)
  const mockResponse = { response: { token: 'foo' } }

  let next = generator.next()

  t.deepEqual(next.value, race({
    response: call(authenticate, opts.endpoint, credentialsOrToken),
    signout: take(opts.logoutActionType)
  }))

  // Simulate getting a token from out API and set storage
  next = generator.next(mockResponse)
  t.deepEqual(next.value, call(setToken, opts.storageType, mockResponse.response.token))
  // Dispatches action for successful login
  next = generator.next()
  t.deepEqual(next.value, put(opts.onLoginAction(mockResponse.response.token)))
  // Call redirectTo callback
  next = generator.next()
  t.deepEqual(next.value, call(redirectTo))
  // Done
  next = generator.next()
  t.true(next.done)
})
