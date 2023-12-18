---
menu_order: 
menu_title: RIF Relay Sample dApp SDK
layout: rsk
title: How to use the RIF Relay Sample dApp SDK
description: Starter kit on How to use the RIF Relay Sample dApp SDK
tags: rif, envelope, relay, user, guide, java, docker, deployment
render_features: 'collapsible tables-with-borders'
permalink: /guides/rif-relay/rif-relay-sample-dapp-sdk/
---

## Install the node using a JAR file

#### Download and Setup

1. **Download the JAR**: Obtain the Fat JAR or Uber JAR from [RSKj releases](https://github.com/rsksmart/rskj/releases), or compile it [reproducibly](https://github.com/rsksmart/rskj/wiki/Reproducible-Build) or [otherwise](/rsk/node/contribute).
1. **Create Directory**: Create a directory for the node.
    ```jsx
    mkdir rskj-node-jar
    cd ~/rskj-node-jar
    ```
1. **Move the JAR**: Move or copy the just downloaded jar file to your directory.
    ```jsx
    mv ~/Downloads/rskj-core-5.3.0-FINGERROOT-all.jar SHA256SUMS.asc /Users/{user}/rskj-node-jar/
    ```

#### Configuration

1. **Create Config Directory**: Create another directory inside `~/rskj-node-jar/config`
    ```jsx
    mkdir config
    ```
1. **Download Config File**: Get `node.conf` from [here](https://github.com/rsksmart/rif-relay/blob/develop/docker/node.conf).
1. **Move Config File**: Move the `node.conf` file to the `config` directory.

#### Run the Node

[](#top "multiple-terminals")
- Linux, Mac OSX
    ```shell
    java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start
    ```
- Windows
    ```windows-command-prompt
    java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start
    ```
Replace `<PATH-TO-THE-RSKJ-JAR>` with the actual path to your JAR file such as `C:/RskjCode/rskj-core-5.3.0-FINGERROOT-all.jar`.

### Using Import Sync

> **Note**: This is an optional, experimental feature first introduced in RSKj v2.0.1.

Instead of the default synchronization, you can use import sync to import a pre-synchronized database from a trusted origin, which is significantly faster.

**Running Node with Import Sync**:


[](#top "multiple-terminals")
- Linux, Mac OSX
    ```shell
    java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --import
    ```
- Windows
    ```windows-command-prompt
    java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --import
    ```

**Memory Issues?**: If you encounter memory errors and meet the [minimum hardware requirements](/rsk/node/install/requirements/), consider using `-Xmx4G` flag to allocate more memory as shown below:

[](#top "multiple-terminals")
- Linux, Mac OSX
    ```shell
    $ java -Xmx4G -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --import
    ```
- Windows
    ```windows-command-prompt
    C:\> java -Xmx4G -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --import
    ```

Replace `<PATH-TO-THE-RSKJ-JAR>` with your JAR file path. For configuration details, see [`database.import` setting](/rsk/node/configure/reference/#databaseimport).

### Check the RPC

After starting the node, if there's no output, it's running correctly. 

1. To confirm, open a new console tab (it is important you do not close this tab or interrupt the process) and test the node's RPC server. A sample cURL request:

    [](#top "multiple-terminals")
    - Linux, Mac OSX
        ```shell
        curl http://localhost:4444 -s -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
        ```
    - Windows
        ```windows-command-prompt
        curl http://localhost:4444 -s -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
        ```

        Expect a response like:
        ```shell
        {"jsonrpc":"2.0","id":67,"result":"RskJ/5.3.0/Mac OS X/Java1.8/FINGERROOT-202f1c5"}
        ```

1. To check the block number:

    [](#top "multiple-terminals")
    - Linux, Mac OSX
        ```shell
        curl -X POST http://localhost:4444/ -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"eth_blockNumber","params":[],"id":1}'
        ```
    - Windows
        ```windows-command-prompt
        curl -X POST http://localhost:4444/ -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"eth_blockNumber","params":[],"id":1}'
        ```

        Output:
        ```jsx
        {"jsonrpc":"2.0","id":1,"result":"0x0"}
        ```

Now, you have successfully setup a Rootstock node using the jar file.
The `result` property represents the latest synced block in hexadecimal.

### Switching networks

To change networks on the RSKj node, use the following commands, replacing `<PATH-TO-THE-RSKJ-FATJAR>` with the actual path to your jar file:

[](#top "collapsible")
- Mainnet
    ```
    java -cp <PATH-TO-THE-RSKJ-FATJAR> co.rsk.Start
    ```
- Testnet
    ```
    java -cp <PATH-TO-THE-RSKJ-FATJAR> co.rsk.Start --testnet
    ```
- Regtest
    ```
    java -cp <PATH-TO-THE-RSKJ-FATJAR> co.rsk.Start --regtest
    ```

For example: `C:/RskjCode/rskj-core-5.3.0-FINGERROOT-all.jar`.

## Setup node on Docker

Before installing Docker, ensure your system meets the [minimum requirements](/rsk/node/install/requirements/) before installing the RSK node.

### Install Docker Desktop Client

[Docker Desktop](https://www.docker.com/products/docker-desktop/) provides an easy and fast way for running containerized applications on various operating systems.

[](#top "collapsible")
- Mac OSX and Windows
    - [Download](https://www.docker.com/products/docker-desktop) and install
    - Start the Docker Desktop client
    - Login with a Docker Hub free account
- Linux
    - Install [Docker Engine Community](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
    - Note that you will need to use `sudo` for all docker commands, by default. To avoid this [additional steps](https://docs.docker.com/install/linux/linux-postinstall/) are required.

Ensure that docker is running by running the following command - it should run without any errors.

```shell
docker ps
```

You can find more information about Docker install [here](https://docs.docker.com/install/).

### Install RSKj Using Docker
To install an RSK node using Docker:

1. Download the RSKj Dockerfiles and `supervisord.conf` from the [artifacts repo](https://github.com/rsksmart/reproducible-builds/tree/master/rskj/5.3.0-fingerroot) or pull the image from [Docker Hub](https://hub.docker.com/r/rsksmart/rskj).

    In the artifacts repo, select which ***type of*** node you want to install:
      * A node connected to the public RSK Mainnet: `Dockerfile.MainNet`
      * A node connected to the public RSK Testnet: `Dockerfile.TestNet`
      * A node connected to a private RegTest network: `Dockerfile.RegTest`

    > **Note:** If you get the following error:
      
    ```jsx
      => ERROR [6/6] COPY supervisord.conf /etc/supervisor/conf.d/supervisord.  0.0s
      ------
        > [6/6] COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf:
          ------
            failed to compute cache key: "/supervisord.conf" not found: not found
    ```     
    Ensure that supervisord.conf is in the same folder as the dockerfile.
      
    When the build finishes, you should see an output similar to this:
      
      ```jsx
      [+] Building 158.0s (11/11) FINISHED                                          
      => [internal] load build definition from Dockerfile.RegTest               0.0s
      => => transferring dockerfile: 293B
        ....
        => => exporting layers                                                    3.8s 
          => => writing image sha256:d73739affdbe3f82a8ba9c686d34c04f48ac510568522  0.0s 
          => => naming to docker.io/library/regtest                                 0.0s
          Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them
      ```
    Now you have a container ready to run Rootstock!
    
1. To run the RegTest node, execute the following commands:

    1. Pull the RSKj Docker Image:
        ```jsx
        docker pull rsksmart/rskj
        ```
    1. Run the Node:
        ```jsx
        docker run -d --name rsk-node -p 4444:4444 -p 50505:50505 rsksmart/rskj node --regtest
        ```
    If successful, the node should be running.

1. Interact with the Node using the following command:
    ```jsx
    curl -X POST -H "Content-Type: application/json" --data "{\"jsonrpc\":\"2.0\",\"method\":\"net_version\",\"params\":[],\"id\":1}" http://127.0.0.1:4444
    ```
    You should see the below output:

    ```bash
    {"jsonrpc":"2.0","id":1,"result":"33"}
    ```
1. To check that the node running, see the [Check the RPC](https://dev.rootstock.io/rsk/node/install/operating-systems/java/#check-the-rpc) section in Using the JAR file.

Now, you have successfully setup a Rootstock node using the docker image.

### Install the node using Docker containers (Intel Chips)

1. Build the container by running any of the following commands:

    > Note: The type of node to run is dependent on the node's type installed in [install RSKj using Docker](#install-rskj-using-docker).

    [](#top "collapsible")
    - Mainnet
        ```
        docker build -t mainnet -f Dockerfile.MainNet .
        ```
    - Testnet
        ```
        docker build -t testnet -f Dockerfile.TestNet .
        ```
    - Regtest
        ```
        docker build -t regtest -f Dockerfile.RegTest .
        ```

    When the build finishes, you should see an output similar to this:
    ```shell
      RSK-Node % docker build -t mainnet -f Dockerfile.MainNet . 
      [+] Building 452.4s (12/12) FINISHED                                            
      => [internal] load build definition from Dockerfile.MainNet

      Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them
    ```
    Now you have a container ready to run RSK!

1. To run the container, execute one of the following commands:

    [](#top "collapsible")
    - Mainnet
        ```
        docker run -p 5050:5050 rsksmart/rskj:latest
        ```
        > This will start a Mainnet node. 
    - Testnet
        ```
        docker run -p 50505:50505 rsksmart/rskj:latest --testnet
        ```
    - Regtest
        ```
        docker run rsksmart/rskj:latest --regtest
        ```

### Install the node using Docker containers (M1 Chips)

To install the node using docker containers from Mac M1:

1. Pull `rskj-standalone` docker image and run container from this image with the following command:
    ```
    docker run rsksmart/rskj-standalone
    ``` 
    *It's possible that you may need to enable experimental features of Docker if your version does not support BuildX plugin by default. In order to enable experimental features:*

1. Update `/etc/docker/daemon.json` to add the property `experimental: true`.

1. If you have docker desktop:

    1. Click **Settings -> Docker Engine**.
    1. In the center you will see the same json from `daemon.json`, add the property `experimental: true` at the top level of the json.
    1. Click **Apply and Restart**.

1. To build the containe, execute any of the following commands:

    > **Note:** The type of node to run is dependent on the node's type installed in[install RSKj using Docker](#install-rskj-using-docker).

    [](#top "collapsible")
    - Mainnet
        ```
        docker buildx build --platform linux/amd64 -t mainnet -f Dockerfile.MainNet .
        ```
    - Testnet
        ```
        docker buildx build --platform linux/amd64 -t testnet -f Dockerfile.TestNet .
        ```
    - Regtest
        ```
        docker buildx build --platform linux/amd64 -t regtest -f Dockerfile.RegTest .
        ```
    When the build finishes, you have a container ready to run RSK.
    
1. To run the container, execute any of the following commands:

    [](#top "collapsible")
    - Mainnet
        ```
        docker run -p 5050:5050 rsksmart/rskj:latest
        ```
        > This will start a Mainnet node. 
    - Testnet
        ```
        docker run -p 50505:50505 rsksmart/rskj:latest --testnet
        ```
    - Regtest
        ```
        docker run rsksmart/rskj:latest --regtest
        ```

> **Note:** RSK's blockchain is stored locally in the container.

1. If you want to save it to a permanent storage, you can use a volume mount while starting the container as shown in the command below:
    ```
    docker run -p 5050:5050 -v /path/to/my/storage:/var/lib/rsk/.rsk rsksmart/rskj:latest
    ```
1. To interact with the node's JSON-RPC endpoint, expose it to the host with the following command:
    ```
    docker run -p 5050:5050 -p 127.0.0.1:4444:4444 rsksmart/rskj:latest
    ```
1. Then, you could, for example, query the current block number with:
    ```shell
    curl -H "Content-type: application/json" -d '{"jsonrpc":"2.0","method":"eth_blockNumber","id":1}' http://127.0.0.1:4444/
    ```
1. Finally, you can provide a custom configuration to the node with:
    ```
    docker run -p 5050:5050 -v /path/to/my/custom/node.conf:/etc/rsk/node.conf rsksmart/rskj:latest
    ```

## Connect with MetaMask

(1) Open MetaMask extension.

(2) In the network selector (top right corner), choose Custom RPC.

  <div style="text-align:center"><img class="metamask-screenshot" src="/assets/img/metamask/metamask.png"></div>

(3) Fill with these values to connect to RSK Mainnet or Testnet

  <table class="table">
  <thead>
    <tr>
      <th scope="col">Field</th>
      <th scope="col">RSK Mainnet</th>
      <th scope="col">RSK Testnet</th>
      <th scope="col">RSK Regnet</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Network Name</td>
      <td>RSK Mainnet</td>
      <td>RSK Testnet</td>
      <td>RSK Regnet</td>
    </tr>
    <tr>
      <td>RPC URL</td>
      <td>https://public-node.rsk.co</td>
      <td>https://public-node.testnet.rsk.co</td>
      <td>http://127.0.0.1:4444</td>
    </tr>
    <tr>
      <td>ChainID</td>
      <td>30</td>
      <td>31</td>
      <td>33</td>
    </tr>
    <tr>
      <td>Symbol</td>
      <td>RBTC</td>
      <td>tRBTC</td>
      <td>tRBTC</td>
    </tr>
    <tr>
      <td>Block explorer URL</td>
      <td><a href="https://explorer.rsk.co" target="_blank">https://explorer.rsk.co</a></td>
      <td><a href="https://explorer.testnet.rsk.co" target="_blank">https://explorer.testnet.rsk.co</a></td>
      <td><a href="#" target="_blank">-------------------</a></td>
    </tr>
  </tbody>
  </table>

Now MetaMask is ready to use with RSK!


## Set Up RIF Relay Contracts and Server

### Deploy Contracts
Start by deploying on-chain components. All tools needed are in the [RIF Relay Contract repository](https://github.com/rsksmart/rif-relay-contracts)

[](#top "collapsible")
- Regtest
    1. Clone the Repository:
        ```bash
        git clone https://github.com/rsksmart/rif-relay-contracts
        ```
    2. Navigate to the directory and install dependencies:
        ```bash
        cd rif-relay-contracts
        npm install
        ```
    3. Deploy the contract:
        ```bash
        npx hardhat deploy --network regtest
        ```
    > This uses the Regtest configuration from `hardhat.config.ts`.
    After deployment, you'll see a summary of the deployed contracts. This summary includes the on-chain components essential for RIF Relay, and additional contracts for testing and validation purposes.
      ```
      ┌───────────────────────────────────────┬──────────────────────────────────────────────┐
      │             (index)                   │                    Values                    │
      ├───────────────────────────────────────┼──────────────────────────────────────────────┤
      │            Penalizer                  │ '0x77045E71a7A2c50903d88e564cD72fab11e82051' │
      │            RelayHub                   │ '0xDA7Ce79725418F4F6E13Bf5F520C89Cec5f6A974' │
      │           SmartWallet                 │ '0x83C5541A6c8D2dBAD642f385d8d06Ca9B6C731ee' │
      │       SmartWalletFactory              │ '0xE0825f57Dd05Ef62FF731c27222A86E104CC4Cad' │
      │         DeployVerifier                │ '0x73ec81da0C72DD112e06c09A6ec03B5544d26F05' │
      │          RelayVerifier                │ '0x03F23ae1917722d5A27a2Ea0Bcc98725a2a2a49a' │
      │        CustomSmartWallet              │ '0x1eD614cd3443EFd9c70F04b6d777aed947A4b0c4' │
      │    CustomSmartWalletFactory           │ '0x5159345aaB821172e795d56274D0f5FDFdC6aBD9' │
      │ CustomSmartWalletDeployVerifier       │ '0x7557fcE0BbFAe81a9508FF469D481f2c72a8B5f3' │
      │ CustomSmartWalletRelayVerifier        │ '0x0e19674ebc2c2B6Df3e7a1417c49b50235c61924' │
      │      NativeHolderSmartWallet          │ '0x4aC9422c7720eF71Cb219B006aB363Ab54BB4183' │
      │    NativeHolderSmartWalletFactory     │ '0xBaDb31cAf5B95edd785446B76219b60fB1f07233' │
      │ NativeHolderSmartWalletDeployVerifier │ '0xAe59e767768c6c25d64619Ee1c498Fd7D83e3c24' │
      │ NativeHolderSmartWalletRelayVerifier  │ '0x5897E84216220663F306676458Afc7bf2A6A3C52' │
      │            UtilToken                  │ '0x1Af2844A588759D0DE58abD568ADD96BB8B3B6D8' │
      │         VersionRegistry               │ '0x8901a2Bbf639bFD21A97004BA4D7aE2BD00B8DA8' │
      └───────────────────────────────────────┴──────────────────────────────────────────────┘
      ```
    The deployment summary shows two sets of Smart Wallets, each paired with its verifiers. This is because each verifier uses the factorY for deployment and relay validation. For testing purposes, the focus will be on using these Smart Wallet Contracts.
- Testnet
    1. Ensure your account is funded. You can get funds from the [tRBTC Faucet](https://faucet.rsk.co/).
    2. Deploy on Testnet:
        ```bash
        npx hardhat deploy --network testnet
        ```
        > Remember to configure Testnet in `hardhat.config.ts`.
        Existing RIF Relay contracts deployed on Testnet can be found in the [contracts section](/rif/relay/contracts).
- Mainnet
    1. Ensure your account is funded.
    2. Deploy on Mainnet:
        ```bash
        npx hardhat deploy --network mainnet
        ```
        > Ensure Mainnet is set up in `hardhat.config.ts`.
        Existing RIF Relay contracts deployed on Mainnet can be found in the [contracts section](/rif/relay/contracts).

### Revenue Sharing
Revenue Sharing is an optional feature in RIF Relay that can be implemented using collector contracts. You can deploy multiple Collector contracts, but they are not included in the default Relay contract deployment. For detailed information on Collector contracts, refer to the [architecture documentation](/rif/relay/architecture/#collector).

Before deploying a Collector contract ensure the following:
1. Ensure the chosen token for the Collector contract is the same as the one used for transaction fees. 
    > **Note:** You cannot retrieve any other tokens other than the one set during Collector deployment.
2. Select an appropriate owner for the Collector contract. This owner doesn't have to be the deployer but must have the authority to execute the withdraw function, or else the revenue funds will be locked in the contract.
3. Set up partners and their share percentages, ensuring the total adds up to 100%. Incorrectly sent tokens to an inaccessible address without a private key from the beneficiary will be lost. For an example of a structurally valid revenue shares definition see [sample configuration](https://github.com/rsksmart/rif-relay-contracts/blob/master/deploy-collector.input.sample.json).

[](#top "collapsible")
- Regtest
    1. To deploy the Collector contract, we'll use the [RIF Relay Contract](https://github.com/rsksmart/.
    1. Create a configuration file named `deploy-collector.input.json` with the required structure:
          ```json
          {
            "collectorOwner": "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
            "partners": [
                {
                  "beneficiary": "0x7986b3DF570230288501EEa3D890bd66948C9B79",
                  "share": 20
                },
                {
                  "beneficiary": "0x0a3aA774752ec2042c46548456c094A76C7F3a79",
                  "share": 35
                },
                {
                  "beneficiary": "0xCF7CDBbB5F7BA79d3ffe74A0bBA13FC0295F6036",
                  "share": 13
                },
                {
                  "beneficiary": "0x39B12C05E8503356E3a7DF0B7B33efA4c054C409",
                  "share": 32
                }
            ],
            "tokenAddresses": ["0x1Af2844A588759D0DE58abD568ADD96BB8B3B6D8"],
            "remainderAddress": "0xc354D97642FAa06781b76Ffb6786f72cd7746C97"
          }
          ```
          > **Note:** The `collectorOwner`, `beneficiaries`, and `remainderAddress` are the first five accounts provided by the node in Regtest.
    2. Deploy the contract:
        ```bash
        npx hardhat collector:deploy --network regtest
        ```
        The collector is ready and can start receiving fees.
- Testnet
    - Using the configuration file you created in the regtest section, run this command to deploy the contract: 
        ```
        npx hardhat collector:deploy --network testnet
        ```
- Mainnet
    - Using the configuration file you created in the regtest section, run this command to deploy the contract: 
        ```
        npx hardhat collector:deploy --network mainnet
        ```
### Allow Tokens
RIF Relay only accepts whitelisted tokens, primarily to ensure only tokens of value to the sponsor are accepted. To whitelist a token:
Execute the `acceptToken(address token)` function on the Relay Verifiers contracts, which include:
- `SmartWalletDeployVerifier`
- `SmartWalletRelayVerifier`

> Note: This action must be performed by the contracts' owner, typically the account that conducted the deployment.
  
[](#top "collapsible")
- Regtest
    - In the RIF Relay Contracts, execute this command:
        ```
        npx hardhat allow-tokens --network regtest 0x1Af2844A588759D0DE58abD568ADD96BB8B3B6D8
        ```
        > The `allowTokens` uses the first account (referred to as account[0]) as the owner of the contracts. This is important because only the account owner can allow tokens. 
- Testnet
    - In the RIF Relay Contracts, execute the command:
        ```
        npx hardhat allow-tokens --network testnet 0x3F49BaB0afdC36E9f5784da91b32E3D5156fAa5C
        ```
        > The `allowTokens` script will use the Testnet network configured in the `hardhat.config.ts`, this network will be required to use the account that deployed the contracts.
- Mainnet
    - In the RIF Relay Contracts, execute the command:
      ```
      npx hardhat allow-tokens --network mainnet 0xe49b8906A3ceFd184621A4193e2451b1c3C3dB0B
      ```
      > The `allowTokens` script will use the Mainnet network configured in `hardhat.config.ts`, this network will be required to use the account that did the deployment of the contracts.

### Run the RIF Relay Server
After setting up on-chain components, the next step is to set up off-chain components, using the [RIF Relay Server](https://github.com/rsksmart/rif-relay-server). 
Configuration of the Relay Server is streamlined using the [node-config](https://www.npmjs.com/package/config) package. For detailed advantages of this package, visit their [wiki](https://github.com/node-config/node-config/wiki).

<b>The TL;DR:</b> In the `config` directory, create a file named `local.json`.
For visual insights into how the Relay Server functions, refer to the diagrams available [here](/rif/relay/architecture/#relay-server).
    
[](#top "collapsible")
- Regtest
    1. Here's a configuration example for setting up the RSKj node locally with the contracts deployed in Regtest:
        ```json
        {
          "app": {
            "url": "http://127.0.0.1",
            "port": 8090,
            "devMode": true,
            "logLevel": 1,
            "workdir": "./enveloping/environment/",
          },
          "blockchain": {
            "rskNodeUrl": "http://127.0.0.1:4444",
          },
          "contracts": {
            "relayHubAddress": "0xDA7Ce79725418F4F6E13Bf5F520C89Cec5f6A974",
            "relayVerifierAddress": "0x03F23ae1917722d5A27a2Ea0Bcc98725a2a2a49a",
            "deployVerifierAddress": "0x73ec81da0C72DD112e06c09A6ec03B5544d26F05"
          }
        }
        ```
        > **Note:** Relay and Deploy verifiers use the contracts from the Smart Wallet section in the summary.
        The meaning of each key can be found in [RIF Relay Server Configuration](https://github.com/rsksmart/rif-relay-server#server-configuration)
    1. To start the server, run the following command:
        ```
        npm run start
        ```
        > By default, the server uses the `default.json5` file in the config directory. Depending on the profile in `NODE_ENV`, the values in the `default.json5` file is overriden.
        At this point the server should be running and ready to start processing transactions, however, you still need to register the off-chain components in the Relay Hub.
    1. To enable the server for transaction processing, you must register the off-chain components in the Relay Hub. This step requires the server to be active. To register the components, in a different terminal window, execute the following command:
        ```
        npm run register
        ```
        The register process performs the following actions:
        - Stakes the Relay Manager
        - Adds the Relay Worker
        - Registers the Relay Server
        The server is now ready to start processing transactions and a ready message is diplayed on the console. For more details on configuration and registration parameters, refer to the [RIF Relay Server documentation](https://github.com/rsksmart/rif-relay-server#overrides).
- Testnet
    1. Here's an example configuration file using the off-chain components deployed on RSK Testnet (https://public-node.testnet.rsk.co). 
        > **Important:** Due to specific modules enabled in the RSKj nodes, the RIF Relay Server cannot connect to the public nodes.            
        ```json
          {
            "app": {
                "url": "https://backend.dev.relay.rifcomputing.net",
                "port": 8090,
                "devMode": true,
                "logLevel": 1,
                "feePercentage": "0",
                "workdir": "/srv/app/environment"
            },
            "blockchain": {
                "rskNodeUrl": "http://172.17.0.1:4444"
            },
            "contracts": {
                "relayHubAddress": "0xAd525463961399793f8716b0D85133ff7503a7C2",
                "relayVerifierAddress": "0xB86c972Ff212838C4c396199B27a0DBe45560df8",
                "deployVerifierAddress": "0xc67f193Bb1D64F13FD49E2da6586a2F417e56b16"
            }
        }
        ```
        > The [contracts](https://developers.rsk.co/rif/relay/contracts/#primary-contracts) used in this setup are the primary contracts available on the RSK network. These primary contracts, however, do not include support for the `CustomSmartWallet`.            
        For details of each configuration key used in setting up the RIF Relay Server, refer to the [RIF Relay Server Configuration](https://github.com/rsksmart/rif-relay-server#server-configuration) documentation.
    1. To start the server, execute the following command:
        ```
        npm run start
        ```
        > By default, the server uses the `default.json5` file in the config directory. Depending on the profile in `NODE_ENV`, the values in the `default.json5` file is overriden. Therefore you need to setup the `NODE_ENV` environment to `testnet`.

        At this point the server should be running and ready to start processing transactions, however, you still need to register the off-chain components in the Relay Hub. For the registration process, the Relay Manager and Worker must have funds.           
    1. To get the addresses, this requires the server to be active. In a different terminal window, execute the following command:
        ```
        curl http://<SERVER_URL>/chain-info
        ```
        ```json
        {
          "relayWorkerAddress": "0xabf898bd73b746298462915ca91623f5630f2462",
          "relayManagerAddress": "0xa71d65cbe28689e9358407f87e0b4481161c7e57",
          "relayHubAddress": "0xe90592939fE8bb6017A8a533264a5894B41aF7d5",
          "feesReceiver": "0x52D107bB12d83EbCBFb4A6Ad0ec866Bb69FdB5Db",
          "minGasPrice": "6000000000",
          "chainId": "31",
          "networkId": "31",
          "ready": false,
          "version": "2.0.1"
        }
        ```
    1. Send at least 0.001 tRBTC to the Worker and Manager.
    1. Now execute the register command.
        ```
        npm run register
        ```
        Here's an example of the `register.json5`
        ```json
        {
          "register": {
            "stake": "REGISTER_STAKE",
            "funds": "REGISTER_FUNDS",
            "mnemonic": "REGISTER_MNEMONIC",
            "privateKey": "REGISTER_PRIVATE_KEY",
            "hub": "REGISTER_HUB_ADDRESS",
            "gasPrice": "REGISTER_GAS_PRICE",
            "relayUrl": "REGISTER_RELAY_URL",
            "unstakeDelay": "REGISTER_UNSTAKE_DELAY"
          }
        }
        ```
        The register process performs the following actions:
          - Stakes the Relay Manager
          - Adds the Relay Worker
          - Registers the Relay Server
        The server is now ready to start processing transactions and a ready message is diplayed on the console. For more details on configuration and registration parameters, refer to the [RIF Relay Server documentation](https://github.com/rsksmart/rif-relay-server#overrides).         
- Mainnet
    - To run RIF Relay Server on RSK Mainnet, the procedure is the same as the one on Testnet, the only difference is the configuration. Configure it to use contracts deployed on Mainnet and an RSKj node connected to Mainnet.
