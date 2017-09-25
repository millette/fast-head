'use strict'

// core
const parseUrl = require('url').parse
const httpOrHttps = {
  http: require('http'),
  https: require('https')
}

const badUrl = 'Bad URL'
const method = 'HEAD'
const allowed = ['http', 'https']

// url must be a string
// url.parse() <https://github.com/millette/fast-head/issues/2>
// and new URL() <https://github.com/millette/fast-head/issues/3> aren't (yet) supported
// Neither is http2 <https://github.com/millette/fast-head/issues/3>
// Timeouts after 5 * 1000 ms by default (see defaultTimeout field)
// The promise will resolve with headers, statusCode and elapsed time in ms
// An error during the request will also resolve the promise
const headNative = (url, timeout) => new Promise((resolve, reject) => {
  // throw will reject the promise
  if (!url || typeof url !== 'string') { throw new Error(badUrl) }
  // ok makes sure there's something after http(s):
  const [ scheme, ok ] = url.split(':')
  if (!ok || allowed.indexOf(scheme) === -1) { throw new Error(badUrl) }
  if (!timeout) { timeout = headNative.defaultTimeout }
  let startedAt = Date.now()
  let timer

  const done = (it) => {
    clearTimeout(timer)
    const elapsed = Date.now() - startedAt
    resolve(it.statusCode
      ? { elapsed, headers: it.headers, statusCode: it.statusCode }
      : { elapsed, error: it.toString() }
    )
  }

  // don't use fat-arrow function, we need 'this'
  const onSocket = function () {
    startedAt = Date.now()
    timer = setTimeout(() => {
      this.abort()
      done(new Error('Timeout'))
    }, timeout)
  }

  httpOrHttps[scheme]
    .request(Object.assign({ agent: false, method, timeout }, parseUrl(url)), done)
    .once('error', done)
    .once('socket', onSocket)
    .end()
})

headNative.defaultTimeout = 5000
module.exports = headNative
