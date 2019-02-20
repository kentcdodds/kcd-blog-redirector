const codeMap = require('./code-map.json')

const last = array => array[array.length - 1]

function codeToBlogUrl(code) {
  const slug = codeToBlogSlug(code)
  if (slug) {
    return `https://kentcdodds.com/blog/${slug}`
  }
  return null
}

function codeToBlogSlug(code) {
  code = last(code.split('-')).replace(/\/$/, '')
  if (codeMap[code]) {
    return codeMap[code]
  }
  return null
}

module.exports = codeToBlogUrl
