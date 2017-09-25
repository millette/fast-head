'use strict'

// npm
import test from 'ava'

// core
import url from 'url'

// self
import fn from './'

test('normal', async t => {
  const result = await fn('http://www.yamaska.ca/')
  t.truthy(result.elapsed < fn.defaultTimeout)
  t.is(result.statusCode, 200)
  t.is(result.headers.server, 'Apache')
})

test('normal, 10s timeout', async t => {
  const result = await fn('http://www.westmount.org/', 10000)
  t.truthy(result.elapsed < 10000)
  t.is(result.statusCode, 403)
  t.is(
    result.headers.server,
    'Apache/2.2.31 (Unix) mod_ssl/2.2.31 OpenSSL/1.0.1e-fips mod_bwlimited/1.4'
  )
})

test('timeout', async t => {
  const result = await fn('https://www.mun-stedg.qc.ca/')
  t.truthy(result.elapsed >= fn.defaultTimeout)
  t.is(result.error, 'Error: socket hang up')
})

test('bad https', async t => {
  const result = await fn('https://www.yamaska.ca/')
  t.truthy(result.elapsed < fn.defaultTimeout)
  t.is(
    result.error,
    'Error: Hostname/IP doesn\'t match certificate\'s altnames: "Host: www.yamaska.ca. is not in the cert\'s altnames: DNS:*.monitoring.io-servers.com, DNS:monitoring.io-servers.com"'
  )
})

test('bad URL', t => t.throws(fn('http'), 'Bad URL'))

test('bad URL (string only)', t => t.throws(fn(url.parse('http://www.yamaska.ca/')), 'Bad URL'))
