---
layout: rsk
title: Javacript Library
tags: rns, javascript
---

## Instantiate the lib with your local blockchain

The lib has already set the contract addresses for RSK Mainnet and Testnet, so if the web3 instance point to one of those networks, no extra action is needed.
If you want to use your local blockchain, contract addresses must be provided and should be sent as parameter.

**Example** 
```javascript
async function myCustomGetOwner(domain) {
  const web3 = new Web3('http://localhost:7545');

  const options = {
    contractAddresses: {
      registry: '0x0000000000000000000000000000000123456789'
    }
  };

  const rns = new RNS(web3, options);

  const address = await rns.addr('testing.rsk');
}
```


## Advanced usage

Use Web3 `Contract`s directly

```javascript
async function myCustomGetOwner(domain) {
  const web3 = new Web3('https://public-node.rsk.co')
  const rns = new RNS(web3)
  await rns.compose()

  const owner = await rns.contracts.registry.methods.owner(domain).call()
  return owner;
}
```

## Want to contribute? Find the process [here](/rif/rns/libs/javascript/contribute)
