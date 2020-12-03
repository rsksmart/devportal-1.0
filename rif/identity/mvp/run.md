---
layout: rsk
---

## The MVP - RUN Locally

Running the project consists of XXX main steps. To understand all the process please read [architecture & design article](../architecture) first

### 1. Run the infrastructure

Requirements:
- RSK node with `eth_getLogs` enabled - public nodes are:
  - For RSK Mainnet https://did.rsk.co:4444
  - For RSK Testnet https://did.testnet.rsk.co:4444
- IPFS node on the same environment that the services will run
  - Guides to run an IPFS node https://docs.ipfs.io/how-to/command-line-quick-start/
  - Make sure you are able to pin files using this IPFS node

### 2. Configure and run the services

Clone the repo from https://github.com/rsksmart/rif-identity-services and checkout `v0.1.0`

First of all [set-up](https://github.com/rsksmart/rif-identity-services/tree/v0.1.0#setup) generals of all services

Each of the services needs specific (easy) configuration. To configure the service please follow each service-specific, and can be run as standalone. See the guides in each service's READMEs:
- [Issuer service](https://github.com/rsksmart/rif-identity-services/tree/v0.1.0/services/issuer#run)
- [Data Vault service](https://github.com/rsksmart/rif-identity-services/tree/v0.1.0/services/data-vault#run)
- [Convey service](https://github.com/rsksmart/rif-identity-services/tree/v0.1.0/services/convey)

The services are seamlessly run using Docker. See the guide [here](https://github.com/rsksmart/rif-identity-services/tree/v0.1.0#start-services)

### 3. Serve the services

You will need to serve the services on public HTTPS server to enable access from mobile applications. To do so you can:
- Run a cloud server
- Serve from your computer using tools like [ngrok](https://ngrok.com/)

### 4. Configure the apps

First of all you will need to [set up React Native](https://reactnative.dev/docs/environment-setup) - this can be time-spending

After this is done, clone the repo from https://github.com/rsksmart/rif-identity-ui and checkout `holder-v0.1.2`

Run the [general setup](https://github.com/rsksmart/rif-identity-ui#development). Please refer to each app's README to configure the service endpoints, the general README is outdated and already tagged.

### 5. Run the apps

The apps can be run in two modes:
- Development mode
- Production build

Please refer to [React Native docs](https://reactnative.dev/docs/running-on-device) to run the apps.

**All done!**. We recommend to follow [this user story](../#the-user-story) to understand and learn how to use the apps.
