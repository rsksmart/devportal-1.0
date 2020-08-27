---
layout: rsk
title: RIF Storage Pinning service - Local setup with storage dev UI
---

This tutorial is very much step by step. For advenced users we suggest the [Local setup with dev CLI](/rif/storage/services/pinning/guides/local_cli) guide.

### Prerequisities
- [nodejs](https://nodejs.org/) v10+
- npm v5.6+
- [ipfs](https://ipfs.io/) v0.6+ (we suggest installing with [`ipfs-update`](https://github.com/ipfs/ipfs-update))

### Installing and setting up the tools
1. [Pinner](https://github.com/rsksmart/rif-storage-pinner)
    ```bash
    git clone git@github.com:rsksmart/rif-storage-pinner.git
    cd rif-storage-pinner
    npm ci
    ```
2. [Ganache CLI](https://github.com/trufflesuite/ganache-cli)
    ```bash
    npm i -g ganache-cli
    ```
3. [Pinning UI](https://github.com/rsksmart/rif-storage-pinning-ui)
    ```bash
    git clone git@github.com:rsksmart/rif-storage-pinning-ui.git
    cd rif-storage-pinning-ui
    npm ci
    ```
    By default the UI will only allow connections to RSK testnet. To change this you can create a `.env.local` file which defines following variables
    ```
    REACT_APP_REQUIRED_NETWORK_ID=8545
    REACT_APP_REQUIRED_NETWORK_NAME="Local Ganache"
    ```
    These lines tell the app to only allow connections to local ganache blockchain.

### Run
#### Provider and Consumer IPFS nodes
To fully test the system, we need to run locally two IPFS nodes (one for provider and one for consumer). In the `rif-storage-pinner` run:
```bash
npm run init
```
which will bootstrap the IPFS repos in .repos folder and configure the ports settings. Next we will run the consumer and IPFS node:
```bash
npm run ipfs:consumer
```
In new terminal window run the provider node with:
```bash
npm run ipfs:provider
```
Consumer IPFS API runs on 5002, Swarms on 4002 and Gateway is on 8081.
Provider IPFS API runs on 5003, Swarms on 4003 and Gateway is on 8082.

#### Local Blockchain
Start the ganache in deterministic mode
```bash
ganache-cli -d --networkId=8545
```
You should see an output with public and private keys
```
Ganache CLI v6.7.0 (ganache-core: 2.8.0)

Available Accounts
==================
(0) 0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1 (100 ETH)
(1) 0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0 (100 ETH)
(2) 0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b (100 ETH)
(3) 0xE11BA2b4D45Eaed5996Cd0823791E0C93114882d (100 ETH)
(4) 0xd03ea8624C8C5987235048901fB614fDcA89b117 (100 ETH)
(5) 0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC (100 ETH)
(6) 0x3E5e9111Ae8eB78Fe1CC3bb8915d5D461F3Ef9A9 (100 ETH)
(7) 0x28a8746e75304c0780E011BEd21C72cD78cd535E (100 ETH)
(8) 0xACa94ef8bD5ffEE41947b4585a84BdA5a3d3DA6E (100 ETH)
(9) 0x1dF62f291b2E969fB0849d99D9Ce41e2F137006e (100 ETH)

Private Keys
==================
(0) 0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d
(1) 0x6cbed15c793ce57650b9877cf6fa156fbef513c4e6134f022a85b1ffdd59b2a1
(2) 0x6370fd033278c143179d81c5526140625662b8daa446c22ee2d73db3707e620c
(3) 0x646f1ce2fdad0e6deeeb5c7e8e5543bdde65e86029e2fd9fc169899c440a7913
(4) 0xadd53f9a7e588d003326d1cbf9e4a43c061aadd9bc938c843a79e7b4fd2ad743
(5) 0x395df67f0c2d2d9fe1ad08d1bc8b6627011959b79c53d7dd6a3536a33ab8a4fd
(6) 0xe485d098507f54e7733a205420dfddbe58db035fa577fc294ebd14db90767a52
(7) 0xa453611d9419d0e56f499079478fd72c37b251a94bfde4d19872c44cf65386e3
(8) 0x829e924fdf021ba3dbbc4225edfece9aca04b929d6e75613329ca6f1d31c0bb4
(9) 0xb0057716d5917badaf911b193b12b910811c1497b5bada8d7711f758981c3773

HD Wallet
==================
Mnemonic:      myth like bonus scare over problem client lizard pioneer submit female collect
Base HD Path:  m/44'/60'/0'/0/{account_index}

Gas Price
==================
20000000000

Gas Limit
==================
6721975

Listening on 127.0.0.1:8545
```

#### Pinner UI
In a separate terminal run the `rif-storage-pinning-ui` from the rif-pinning-ui folder
```bash
npm run start
```
Which should output something like
```
Compiled successfully!

You can now view rif-storage-pinning-ui in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://172.20.10.3:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```
Navigate to `http://localhost:3000` in your favourite browser which has Metamask or Nifty wallet installed. Connect to the `localhost:8545` network and import any of the local ganache keys. Click `Connect wallet` button to link the webpage with your Metamask/Nifty.

![Connect Wallet](/assets/img/rif-storage/local_ui_connect_wallet.png)

You can now deploy the storage contract by clicking the deploy button.

![Deploy](/assets/img/rif-storage/local_ui_deploy.png)

If successful, the storage contract address should be shown

![Contract address](/assets/img/rif-storage/local_ui_contract_address.png)

#### Setting up pinner
In new terminal window, first set the storage contract address e.g. by using the environment variable:
```bash
export RIFS_CONTRACT_ADDR=<storage_contract_address>
```

From the `rif-storage-pinner` directory, initialise the pinner by:
```
npm run bin -- init --offerId=<your_rsk_address> --network=ganache
```

Run the daemon which will listen on the offer
```
npm run bin -- daemon
```

#### Creating offer
In the UI, fill in the offer details. The fields are as follows:

 - *Capacity* - the storage capacity of the offer in MB
 - *Periods* - Specifies array of periods how often is payment required in seconds
 - *Prices* - Specifies prices in wei per Megabyte for each Billing Period, resulting in period-price tuple
 - *Message* - A peerId of the provider's communication system

 Change the values to your liking and click Create Offer

 ![Offer](/assets/img/rif-storage/local_ui_create_offer.png)


#### Uploading file and creating agreement
Last step is to create a file as a consumer, upload it to IPFS and pin it:
```bash
IPFS_PATH="./provider"

echo "Hello RIF Storage Pinning service!" > file.txt
ipfs add file.txt
```

Extract the file hash from the output:
```
added QmbV37oEsvPzFpxeBMW7nbahGoQrMGvJ8K6hGCh9xKXDyf file.txt
 34 B / 34 B [=======] 100.00
 ```

And paste it into the UI. You should also specify the number of wei to be prepaid for the storage e.g. `5000`

 ![Agreement](/assets/img/rif-storage/local_ui_create_agreement.png)

 The pinner should now react to the agreement and pin the right file.
