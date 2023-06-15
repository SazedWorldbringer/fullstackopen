const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const blogs = []

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })
})
