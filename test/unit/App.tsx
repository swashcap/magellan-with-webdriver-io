import React from 'react'
import TestRenderer from 'react-test-renderer'
import { assert } from 'chai'

import { App } from '../../src/App'

it('App', () => {
  const testRenderer = TestRenderer.create(<App />)

  assert.equal(
    testRenderer.root.findAll(
      node => node.props.className && node.props.className.includes('app')
    ).length,
    1,
    'Includes app'
  )
})
