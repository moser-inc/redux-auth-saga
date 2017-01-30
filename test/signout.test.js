import test from 'ava'
import { call, put } from 'redux-saga/effects'
import signout from '../src/signout'
import { clearToken } from '../src/storage'

const errorMsg = 'User signed out'
const opts = {
  storageType: 'sessionStorage',
  onLogoutAction: error => ({ type: 'LOGOUT', error }),
}

test('should clear auth token and dispatch onLogoutAction', t => {
  const generator = signout(errorMsg, opts)

  let next = generator.next()
  t.deepEqual(next.value, call(clearToken, opts.storageType), 'calls clearToken')
  next = generator.next()
  t.deepEqual(next.value, put(opts.onLogoutAction(errorMsg)), 'dispatches onLogoutAction')
  next = generator.next()
  t.true(next.done)
})

test('should clear auth token and dispatch onLogoutAction w/optional redirect callback', t => {
  const redirectToOnLogout = () => {}
  const generator = signout(errorMsg, Object.assign({}, opts, { redirectToOnLogout }))

  let next = generator.next()
  t.deepEqual(next.value, call(clearToken, opts.storageType), 'calls clearToken')
  next = generator.next()
  t.deepEqual(next.value, put(opts.onLogoutAction(errorMsg)), 'dispatches onLogoutAction')
  next = generator.next()
  t.false(next.done)
  t.deepEqual(next.value, call(redirectToOnLogout), 'calls redirectToOnLogout')
  next = generator.next()
  t.true(next.done)
})
