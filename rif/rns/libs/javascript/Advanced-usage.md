---
layout: rsk
title: RNS JS Library - Advanced Usage
tags: rns, javascript
---

## Instantiate the lib with your local blockchain

The library has already set the contract addresses for RSK Mainnet and Testnet, so if the Web3 instance points to one of those networks, no extra action is needed.
If you want to use your local blockchain, contract addresses must be provided and should be sent as parameter.
If a custom blockchain has been set but the contracts addresses are not provided, it will throw [KB005](/rif/rns/libs/javascript/errors) on the first operation invoked.

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
The library must be composed before accessing to the contracts, if not, it will throw [KB004](/rif/rns/libs/javascript/errors).

```javascript
async function myCustomGetOwner(domain) {
  const web3 = new Web3('https://public-node.rsk.co')
  const rns = new RNS(web3)
  await rns.compose()

  const owner = await rns.contracts.registry.methods.owner(domain).call()
  return owner;
}
```

## Want to contribute? Find the process [here](/rif/rns/libs/javascript/Contribute/)
