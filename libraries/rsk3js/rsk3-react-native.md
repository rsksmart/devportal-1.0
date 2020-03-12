---
layout: rsk
title: rsk3.js
tags: libraries, rsk, rsk3js, javascript, web3js
---

# Integrate rsk3 with react native in DAPP

####  1. Install node-libs-browser

It will provide the interface which will fill the gap between nodejs and react native, eg. buffer, http...
```
npm i -S node-libs-browser
```

####  2. Create the globals.js

it wil check the environment. nodejs & react native
```
if (typeof __dirname === 'undefined') global.__dirname = '/'
if (typeof __filename === 'undefined') global.__filename = ''
if (typeof process === 'undefined') {
  global.process = require('process')
} else {
  const bProcess = require('process')
  for (var p in bProcess) {
    if (!(p in process)) {
      process[p] = bProcess[p]
    }
  }
}
global.Buffer = require('buffer').Buffer
global.process = require('process')
global.process.env.NODE_ENV = __DEV__ ? 'development' : 'production'
if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return new Buffer(str, 'binary').toString('base64')
  }
}
if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    return new Buffer(b64Encoded, 'base64').toString('binary')
  }
}
process.browser = false
if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer
global.location = { protocol: 'file:' }
const isDev = typeof __DEV__ === 'boolean' && __DEV__
process.env['NODE_ENV'] = isDev ? 'development' : 'production'
if (typeof localStorage !== 'undefined') {
  localStorage.debug = isDev ? '*' : ''
}
```

####  3. In root index.js, import globals.js

```$xslt
import './globals.js'
```

####  4. In metro.config.js

add resolver in the react native build config

```$xslt
resolver: {
  extraNodeModules: require('node-libs-browser')
}
```

####  5. Now it is good to go by using rsk3 in your react native project
