import test from 'ava'
import validateOptions from '../src/validateOptions'

test('should throw when loginActionType is missing', t => {
  const error = t.throws(() => {
    validateOptions({})
  })

  t.is(error.message, 'Option loginActionType: - Login action type is required')
})

test('should throw when logoutActionType is missing', t => {
  const error = t.throws(() => {
    validateOptions({
      loginActionType: 'LOGIN_ACTION_TYPE'
    })
  })

  t.is(error.message, 'Option logoutActionType: - Logout action type is required')
})

test('should throw when onLoginAction is missing', t => {
  const error = t.throws(() => {
    validateOptions({
      loginActionType: 'LOGIN_ACTION_TYPE',
      logoutActionType: 'LOGOUT_ACTION_TYPE'
    })
  })

  t.is(error.message, 'Option onLoginAction: - Action to use on login is required')
})

test('should throw when onLogoutAction is missing', t => {
  const error = t.throws(() => {
    validateOptions({
      loginActionType: 'LOGIN_ACTION_TYPE',
      logoutActionType: 'LOGOUT_ACTION_TYPE',
      onLoginAction: () => {}
    })
  })

  t.is(error.message, 'Option onLogoutAction: - Action to use on logout is required')
})

test('should throw when endpoint is missing', t => {
  const error = t.throws(() => {
    validateOptions({
      loginActionType: 'LOGIN_ACTION_TYPE',
      logoutActionType: 'LOGOUT_ACTION_TYPE',
      onLoginAction: () => {},
      onLogoutAction: () => {}
    })
  })

  t.is(error.message, 'Option endpoint: - Auth endpoint is required')
})

test('should not throw with valid options', t => {
  const validOpts = {
    loginActionType: 'LOGIN_ACTION_TYPE',
    logoutActionType: 'LOGOUT_ACTION_TYPE',
    onLoginAction: () => {},
    onLogoutAction: () => {},
    endpoint: 'https://app/auth'
  }

  t.notThrows(() => validateOptions(validOpts))
  t.true(validateOptions(validOpts))
})
