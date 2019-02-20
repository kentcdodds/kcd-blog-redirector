const codeToBlogUrl = require('../lib/code-to-blog-url')

exports.handler = async event => {
  // just something for grouping the netlify logs for this run together
  const runId = Date.now()
    .toString()
    .slice(-5)
  const log = (...args) => console.log(runId, ...args)

  const {host = ''} = event.headers
  log(`Request coming to "${event.path}"`)
  const [, code] = event.path.match(/^.*?redirect\/?(.*)$/) || [event.path, '']
  if (!code) {
    log(`no code provided`)
    return getResponse({statusCode: 301})
  }

  const blogUrl = codeToBlogUrl(code)
  if (blogUrl) {
    return getResponse({blogUrl, statusCode: 301})
  } else {
    return getResponse()
  }

  function getResponse({
    blogUrl = 'https://kentcdodds.com/blog',
    statusCode = 302,
  } = {}) {
    const title = `${host}/${code || ''}`
    log(`> redirecting: ${title} -> ${blogUrl}`)
    const body = `<html><head><title>${title}</title></head><body><a href="${blogUrl}">moved here</a></body></html>`

    return {
      statusCode,
      body,
      headers: {
        Location: blogUrl,
        'Cache-Control': 'public, max-age=604800', // 604800 seconds is 1 week
        // these headers I got by curling a bit.ly URL
        // and just doing what they do.
        'Content-Length': String(body.length),
        'Content-Type': 'text/html; charset=utf-8',
        Connection: 'close',
        'Content-Security-Policy': 'referrer always',
        'Referrer-Policy': 'unsafe-url',
      },
    }
  }
}
