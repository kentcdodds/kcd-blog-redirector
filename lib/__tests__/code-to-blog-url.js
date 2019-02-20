const cases = require('jest-in-case')
const codeToBlogUrl = require('../code-to-blog-url')

cases(
  'code-to-blog-url',
  ({code, blogSlug}) => {
    expect(codeToBlogUrl(code)).toBe(`https://kentcdodds.com/blog/${blogSlug}`)
  },
  [
    {
      code: 'write-tests-not-too-many-mostly-integration-5e8c7fff591c',
      blogSlug: 'write-tests',
    },
    {
      code: 'blah-5e8c7fff591c',
      blogSlug: 'write-tests',
    },
    {
      code: '5e8c7fff591c',
      blogSlug: 'write-tests',
    },
    {
      code: '5e8c7fff591c/',
      blogSlug: 'write-tests',
    },
  ].map(({code, blogSlug}) => {
    return {
      name: `${code} -> ${blogSlug}`,
      code,
      blogSlug,
    }
  }),
)
