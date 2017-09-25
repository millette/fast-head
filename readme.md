# fast-head
[![Build Status](https://travis-ci.org/millette/fast-head.svg?branch=master)](https://travis-ci.org/millette/fast-head)
[![Coverage Status](https://coveralls.io/repos/github/millette/fast-head/badge.svg?branch=master)](https://coveralls.io/github/millette/fast-head?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/millette/fast-head.svg)](https://gemnasium.com/github.com/millette/fast-head)
> Fetch http(s) headers and statusCode or error.

## Install
```
npm install --save fast-head
# or, with yarn
yarn add fast-head
```

## Usage
```js
const fastHead = require('fast-head');

fastHead('http://www.yamaska.ca/')
  .then(({ elapsed, headers, statusCode, error }) => {
    // either headers and status code are filled,
    // or it's error
  })
  .catch(console.error)
```

## API
### fastHead(url, [timeout])
#### url
Type: `string`

* http://www.yamaska.ca/
* https://www.yamaska.ca/
* Etc.

#### timeout (optionnal)
Type: `number` in ms<br>
Default: `5000`

See fastHead.defaultTimeout.

### fastHead.defaultTimeout
Type: `number` in ms

To obtain the value of the default timeout. Since there's a single `fastHead`, it's best not to change this field.

## Contribute
**Contributions are appreciated!** Here are a few ideas to get you started:

* [add http2 support][1]
* [add url.parse() support][2]
* [add new URL() support][3]
* [make fastHead.defaultTimeout read-only][4]

## License
AGPL-v3 © 2017 [Robin Millette](http://robin.millette.info)

[1]: https://github.com/millette/fast-head/issues/1
[2]: https://github.com/millette/fast-head/issues/2
[3]: https://github.com/millette/fast-head/issues/3
[4]: https://github.com/millette/fast-head/issues/4
