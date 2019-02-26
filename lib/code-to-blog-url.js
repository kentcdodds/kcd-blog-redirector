const {URL} = require('url')
const codeMap = require('./code-map.json')

function isUrl(url) {
  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}

const last = array => array[array.length - 1]

function codeToBlogUrl(code) {
  const slug = codeToBlogSlug(code)
  if (slug) {
    return isUrl(slug) ? slug : `https://kentcdodds.com/blog/${slug}`
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
