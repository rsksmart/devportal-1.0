---
layout: rsk
title: RIF Storage Pinning service - Testnet setup
---

### Prerequisities
- [nodejs](https://nodejs.org/) v10+
- npm v5.6+
- [ipfs](https://ipfs.io/) v0.6+ (we suggest installing with [`ipfs-update`](https://github.com/ipfs/ipfs-update))

### Install
Install the pinning service with
```npm i  -g @rsksmart/rif-storage-pinning@next```

### Run
1. **!IMPORTANT:** For now ensure that the `NODE_ENV` variable is set to `testnet` and the `RIFS_CONTRACT_ADDR` is set to the testnet contract address `0x4E1D9dBE2a6B643d64322c747e2E2Da5A808669A`
    ```bash
    export NODE_ENV=testnet
    export RIFS_CONTRACT_ADDR=0x4E1D9dBE2a6B643d64322c747e2E2Da5A808669A
    ```
    **NOTE:** this step will not be necessary after release
2. Initialise the service with
```rif-pinning init --offerId=<your_rsk_address>```
Where the offerId is your RSK wallet address with which you register on RIF Marketplace. The full list of options can be found on [the pinner repository](https://github.com/rsksmart/rif-storage-pinner#rif-pinning-init).
3. The init command will output a communication PeerID which is used to announce status updates or errors to the endusers. You then start the service with:
```rif-pinning daemon```

The pinning service is now listening on any new agreements that appear in your offer and pins/unpins the files from a local IPFS node.

The pinner service also offers a set of utility functions like listing valid agreements. For more information please see the the [Commands section in the pinner repository](https://github.com/rsksmart/rif-storage-pinner#commands).
