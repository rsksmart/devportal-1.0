---
layout: rsk
title: Web3/RSK3
---
#### Rsk3.js

The Rsk3.js allows you to interact with an Ethereum blockchain and Ethereum smart contracts.

#### Note on checksum addresses
All Ethereum addresses returned by functions of this package are returned as checksum addresses. This means some letters are uppercase and some are lowercase. Based on that it will calculate a checksum for the address and prove its correctness. Incorrect checksum addresses will throw an error when passed into functions. If you want to circumvent the checksum check you can make an address all lower- or uppercase.