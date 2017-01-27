import test from 'ava'
import { getStorage } from '../src/storage'

test('storage should default to sessionStorage', t => {
  t.is(getStorage(), window.sessionStorage)
  t.is(getStorage('sessionStorage'), window.sessionStorage)
  t.is(getStorage('localStorage'), window.localStorage)
})
