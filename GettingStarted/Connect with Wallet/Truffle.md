---
layout: rsk
title: Connect to Truffle
---
You can connect RSK blockchain with Truffle as one of the networks. For this , it is supposed that you have an RSK node running. Or you can use our public nodes.

* https://public-node.testnet.rsk.co (Testnet)
* https://public-node.rsk.co (Mainnet)


### Connect RSK to Truffle

Open the truffle.js configuration file and change the default port to 4444 (this is the default port for RSK):

```
module.exports = {
  networks: {
    rsk: {
      host: "localhost",
      port: 4444,
      network_id: "*" // Match any network id
    }
  }
};
```
Note: replace 'localhost' with your IP if necessary.

Go to the command terminal and open Truffle console by typing:
```
truffle console --network rsk
```

Try to interact with the node:
```
truffle(RSK)> web3.eth.getBlockNumber().then(console.log);
```
It should log a number (the last block in your node).

You are now connected to your RSK node in Truffle.

