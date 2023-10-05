---
menu_order: 500
menu_title: Node Operators
layout: rsk
title: RIF Gateways Chainlink Node Operators
tags: rif, gateways, data services, chainlink, node operators
---

## Node Operators - Connect your Chainlink node to Rootstock (RSK) Testnet

Provided you have a functioning Chainlink node, and are interested in trying the Rootstock (RSK) Initiator and RSKTX Adapters to interact with Rootstock Network, you can follow these instructions to get started.

### Prerequisites.

You'll need to create a Postgres database for the Initiator and another for the Adapter. You can quickly set this up with the `psql` CLI utility:

```bash
psql -U postgres -c "create database rsk_initiator"
psql -U postgres -c "create database rsktx_adapter"
```

### 1. Clone the repository and enter project directory

```bash
git clone https://github.com/smartcontractkit/chainlink-RSK.git && cd chainlink-RSK
```

### 2. Configure the Initiator and Adapter

Create a `.env-testnet` file for each service and set the configuration environment variables.

#### Rootstock (RSK) Initiator

| Key | Description | Example |
|-----|-------------|---------|
| `CHAINLINK_BASE_URL` | The URL of the Chainlink Core service with a trailing slash | `http://localhost:6688/` |
| `DATABASE_URL` | The URL of the Postgres connection | `postgresql://user:passw@host:5432/dbname` |
| `INITIATOR_HOST` | The hostname of the Rootstock Initiator | `localhost` |
| `INITIATOR_NAME` | The Initiator name that will be registered on Chainlink Core | `rskinitiator` |
| `INITIATOR_PORT` | The port where the Initiator service will be listening | `30055` |
| `MIN_INCOMING_CONFIRMATIONS` | The number of blocks to wait before triggering a job run | `3` |
| `RSK_HOST` | The hostname of the Rootstock Node RPC | `localhost` |
| `RSK_WS_PROTOCOL` | The protocol that will be used to connect to the Rootstock Node RPC (ws or wss) | `ws` |
| `RSK_WS_PORT` | The port to connect to the RSK Node RPC websocket | `4445` |
| `RSK_WS_URL` | The Rootstock Node RPC websocket endpoint URL | `/websocket` |

#### RSKTX Adapter

| Key | Description | Example |
|-----|-------------|---------|
| `ADAPTER_HOST` | The hostname of the RSKTX Adapter | `localhost` |
| `ADAPTER_NAME` | The Adapter name that will be registered on Chainlink Core | `rsktxadapter` |
| `ADAPTER_PORT` | The port where the Adapter service will be listening | `30056` |
| `CHAINLINK_BASE_URL` | The URL of the Chainlink Core service with a trailing slash | `http://localhost:6688/` |
| `DATABASE_URL` | The URL of the Postgres connection | `postgresql://user:passw@host:5432/dbname` |
| `RSK_HOST` | The hostname of the Rootstock Node RPC | `localhost` |
| `RSK_WS_PROTOCOL` | The protocol that will be used to connect to the Rootstock Node RPC (ws or wss) | `ws` |
| `RSK_WS_PORT` | The port to connect to the Rootstock Node RPC websocket | `4445` |
| `RSK_WS_URL` | The Rootstock Node RPC websocket endpoint URL | `/websocket` |

### 3. Configure Chainlink API credentials

Create an `.api` file that will contain the auth credentials of your Chainlink node. The API e-mail should be in the first line, and the API password in the second line. Example:

```
admin@example.com
changethis
```

### 4. Configure RSKTX Adapter account

The RSKTX Adapter needs an account to sign and send the transactions to the network. To configure the account, save its private key in a file and reference it later when running the adapter. This account will need to have RBTC to pay for the transactions sent to the network. Testnet RBTC can be obtained through the Rootstock (RSK) Testnet Faucet in [faucet.rsk.co](https://faucet.rsk.co/).

### 5. Build the RSK Initiator and RSKTX Adapter Docker images 

```bash
docker build -t rsk-initiator-testnet -f ./rsk-initiator/Dockerfile.testnet .
docker build -t rsktx-adapter-testnet -f ./rsktx-adapter/Dockerfile.testnet .
```

### 6. Run the services

You can run the services containers in several ways. For the purpose of this quick guide, we'll use the docker run command. Be sure to pass the API credentials and make them available through the `.api` file in the destination paths `/home/rsk-initiator/src/.api` for the initiator, and `/home/rsktx-adapter/src/.api` for the adapter. You need to do the same with the `.adapterKey` file when running the RSKTX Adapter, also you need to load the environment variables from the `.env-testnet` file. In the example, optionally, a port parameter is added to map the service port to localhost.

```bash
docker run -v /path/to/host/api/file:/home/rsk-initiator/src/.api --env-file /path/to/initiator/.env-testnet -p 30055:30055 rsk-initiator-testnet
docker run -v /path/to/host/api/file:/home/rsktx-adapter/src/.api -v /path/to/host/adapterKey/file:/home/rsktx-adapter/src/.adapterKey --env-file /path/to/adapter/.env-testnet -p 30056:30056 rsktxk-adapter-testnet
```
The services will configure the database and register the Initiator and Adapter in Chainlink Core when first started.

### 7. Deploy the Oracle contract to Rootstock (RSK) Testnet

You'll need to deploy an Oracle contract on RSK Testnet to be able to receive requests. In the directory `testnet-deploy` there are some useful scripts to accomplish this.

* Edit the `truffle-config.js` to configure the Rootstock node RPC connection.
* Configure the account that will be used to deploy the contract. To do this, save its private key on the `testnet-deploy/.deployerKey` file. Remember this account needs to be funded with RBTC.
* Edit the `testnet-deploy/migrations/2_deploy_oracle.js` and configure the `ADAPTER_ADDRESS` constant, setting the adapter's account address. This is needed so the migration script, after the contract deploy, can call the `setFulfillmentPermission` function on the contract to authorize the adapter address to fulfill the Oracle's requests.
* Step into the `testnet-deploy` directory, install the dependencies and run the first and second migrations using Truffle:

```bash
cd testnet-deploy
npm install
npx truffle migrate --f 1 --to 2 --network rskTestnet
```

### 8. Create a test job

Now the only thing left to do is to test the request flow. First, login into the Chainlink Operator WebUI and create a new job that uses the RSK Initiator and the RSKTX Adapter. You'll need to replace RSK_INITIATOR_NAME, ORACLE_CONTRACT_ADDRESS and RSKTX_ADAPTER_NAME with your values.

```json
{
  "initiators": [
    {
	  "type": "external",
	  "params": {
	    "name": "RSK_INITIATOR_NAME",
	    "body": {
	      "address": "ORACLE_CONTRACT_ADDRESS"
	    }
	  }
	}
  ],
  "tasks": [
    {
	  "type": "httpget"
	},
	{
	  "type": "jsonparse"
	},
	{
	  "type": "multiply"
	},
	{
	  "type": "ethuint256"
	},
	{
	  "type": "RSKTX_ADAPTER_NAME"
	}
  ]
}
```

Additional information can be found in the following **links**: 

* [Chainlink Job Specifications](https://docs.chain.link/docs/job-specifications)

* [Chainlink External Initiators](https://github.com/smartcontractkit/chainlink/wiki/External-Initiators)
