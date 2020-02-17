---
layout: rsk
title: Javacript Library - Contribute
tags: rns, javascript
---

## Run for development

Install dependencies:

```
git clone git@github.com:rnsdomains/rns-js.git
cd rns-js
npm i
```

Run tests:

```
npm test
```

## Try out your development

Create a testing project

```
# in rns-js folder
npm run build
npm link
cd ..
mkdir rns-js-test
cd rns-js-test
npm init
npm i web3
npm link @rsksmart/rns
```

Create a new .js file, [instantiate](/rif/rns/libs/javascript/RNS-instance) the library and try out your development.

## Versioning

- `master` branch point to latest release.
- `develop` branch contains changes that will apply next release. The first commit after release bumps to next version.
- Other branches (feature branches) point to `develop`.

Find releases scopes in [milestones](https://github.com/rnsdomains/rns-js/milestones)
