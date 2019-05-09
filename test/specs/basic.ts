/// <reference types="webdriverio" />
import { assert } from 'chai'

describe('home page', () => {
  it('should have the right title', async () => {
    browser.url('http://localhost:4000')
    const title = await browser.getTitle()
    assert.equal(title, 'Magellan with WebdriverIO')
  })
})
