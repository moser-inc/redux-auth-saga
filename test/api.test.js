import test from 'ava'
import * as API from '../src/api'

test('should define authenticate', t => {
  t.is(typeof API.authenticate, 'function')
})
