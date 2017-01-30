import { call, put } from 'redux-saga/effects'
import { clearToken } from './storage'

/*
* Clears token from storage, informs store of signout
* Optionally calls `redirectToOnLogout` to allow for redirect
*/
export default function* signout(error, options) {
  yield call(clearToken, options.storageType)
  yield put(options.onLogoutAction(error))

  if(options.redirectToOnLogout){
    yield call(options.redirectToOnLogout)
  }
}
