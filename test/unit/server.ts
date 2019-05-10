import { assert } from 'chai'
import { Server } from '@hapi/hapi'

import { getServer } from '../../src/server'

it('Root route', async () => {
  // TODO: Why aren't src types working?
  const server: Server = await getServer()
  const response = await server.inject('/')

  assert.equal(response.statusCode, 200)
})
