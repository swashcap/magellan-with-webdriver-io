import { assert } from 'chai'

describe('home page', () => {
  it('should have the right title', async () => {
    browser.url('http://localhost:4000')
    assert.equal(await browser.getTitle(), 'hello')
  })
})
