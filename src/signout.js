import { call, put } from 'redux-saga/effects'
import { clearToken } from './storage'

/*
* Clears token from localStorage, informs store of signout and redirects to login
*/
export default function* signout(error, options) {
  yield call(clearToken, options.storageType)
  yield put(options.onLogoutAction(error))

  if(options.redirectToOnLogout){
    yield call(options.redirectToOnLogout)
  }
}
