---
menu_order: 250
menu_title: Starter Kit
layout: rsk
title: How to use the RIF Relay Sample dApp SDK
description: RIF Relay Sample dApp SDK Starter kit
tags: rif, envelope, relay, user, guide, java, docker, deployment
render_features: 'collapsible tables-with-borders'
permalink: /guides/rif-relay/rif-relay-starter-kit/
---

## Getting Started

This guide helps to quickly get started with setting up your environment to use RIF Relay and also use the sample dApp to test relay services.

### Step 1: Run the Rootstock node

You need to set up and run a Rootstock node, preferably the latest version from RSKj releases. The node can operate locally or via Docker. In either case, a [`node.conf`](https://github.com/rsksmart/rif-relay/blob/develop/docker/node.conf) file is used.

[](#top "collapsible")
- Install the node using a JAR file
    1. Download the JAR file from [RSKj releases](https://github.com/rsksmart/rskj/releases).
    1. Create the directory for the node:
        ```jsx
        mkdir rskj-node-jar
        cd ~/rskj-node-jar
        ```
    1. Move or copy the just downloaded jar file to the directory
        ```jsx
        mv ~/Downloads/rskj-core-5.3.0-FINGERROOT-all.jar SHA256SUMS.asc /Users/{user}/rskj-node-jar/
        ```
    1. Create another directory inside `~/rskj-node-jar/config`
        ```jsx
        mkdir config
        ```
    1. Download this config file: [https://github.com/rsksmart/rif-relay/blob/develop/docker/node.conf](https://github.com/rsksmart/rif-relay/blob/develop/docker/node.conf)
    1. Move the `node.conf` file to the `config` directory.
    1. In the folder containing the jar file, run the following command in the terminal:
        ```bash
        arch -x86_64 /usr/local/opt/openjdk@8/bin/java -Drsk.conf.file=./config/node.conf -cp ./rskj-core-5.3.0-FINGERROOT-all.jar co.rsk.Start --regtest
        ```
        OR
        ```jsx
        java -Drsk.conf.file=./config/node.conf \
        cp ./<PATH-TO-JAR-FILE> co.rsk.Start \
        -regtest
        ```
    Leave the terminal running.
    To ensure that the node is running as expected, refer to the section below to check that the node is running.
- Check that the node is running
    1. Open another terminal and enter the command below:
        ```jsx
        curl http://localhost:4444 \
        -s \
        -X POST \
        -H "Content-Type: application/json" \
        --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
        ```
        It should output a response like this:

        ```jsx
        {"jsonrpc":"2.0","id":67,"result":"RskJ/5.3.0/Mac OS X/Java1.8/FINGERROOT-202f1c5"}
        ```
    1. Check the blockNumber:
        ```jsx
        curl -X POST http://localhost:4444/ \
        -H "Content-Type: application/json" \
        --data '{"jsonrpc":"2.0", "method":"eth_blockNumber","params":[],"id":1}'
        ```
        You should see the below output:
        ```jsx
        {"jsonrpc":"2.0","id":1,"result":"0x0"}
        ```
    Now, you have successfully setup a Rootstock node using the jar file.
- Install the node using Docker
    - In this guide, we'll set up a node connected to a private `RegTest` network using the **[Dockerfile.RegTest](https://github.com/rsksmart/reproducible-builds/tree/master/rskj/5.3.0-fingerroot)**
    To run a RegTest node using RSKj Docker Image, follow these steps:
    1. To pull the latest RSKj Docker image, execute:
    ```bash
    docker pull rsksmart/rskj
    ```
    2. Start the node with this command:
    ```bash
    docker run -d --name rsk-node -p 4444:4444 -p 50505:50505 rsksmart/rskj node --regtest
    ```
    If executed successfully, the node will be up and running.
    3. To interact with the node, use the following command:
    ```bash
    curl -X POST -H "Content-Type: application/json" --data "{\"jsonrpc\":\"2.0\",\"method\":\"net_version\",\"params\":[],\"id\":1}" http://127.0.0.1:4444
    ```
    **Expected Output:**
    ```bash
    {"jsonrpc":"2.0","id":1,"result":"33"}
    ```
    This confirms the successful operation of your node.
    4. To ensure that the node is running as expected, refer to the section above to check that the node is running.
    Congratulations! You have now successfully set up a Rootstock node using the Docker image.
    > **Note:** If you encounter the following error:
    ```jsx
    => ERROR [6/6] COPY supervisord.conf /etc/supervisor/conf.d/supervisord.  0.0s
    ------
    > [6/6] COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf:
    ------
    failed to compute cache key: "/supervisord.conf" not found: not found
    ```
    Make sure that `supervisord.conf` is located in the same directory as your Dockerfile.
    Upon successful build completion, you'll see an output similar to:
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


For additional details and advanced configurations, visit the Rootstock node setup documentation at [Rootstock Node Installation Guide](https://dev.rootstock.io/rsk/node/install/).

### Step 2: Add network to Metamask

To interact with the Rootstock network, you need to add it to Metamask. Follow the steps below to add the Regtest Network since we're using the node on `--regtest mode`.

To add network to Metamask:

1. On Metamask, click the network selector, and then “add network”.
    ![Add network to Metamask](/assets/img/rif-relay/starter-kit/add-network-to-metamask.png)
1. Click “Add a network manually” and enter the following data:
    - Network name: RSK regtest
    - New RPC URL: [http://127.0.0.1:4444](http://127.0.0.1:4444)
    - Chain ID: 33
    - Currency symbol: tRBTC

    ![Add network manually](/assets/img/rif-relay/starter-kit/add-network-manually.png)

    You should see a screen that says **Network added successfully!**

For additional details on Metamask and how to add it to Rootstock programmatically, see [Metamask](https://dev.rootstock.io/develop/wallet/use/metamask/) and [How to add Metamask to Rootstock Programmatically](https://dev.rootstock.io/kb/rootstock-metamask/).

### Step 3: Set up RIF Relay contracts

RIF Relay Contracts Repository: [https://github.com/rsksmart/rif-relay-contracts](https://github.com/rsksmart/rif-relay-contracts)

[](#top "collapsible")
1. Clone RIF Relay Contracts repository and install dependencies:
    ```bash
    # clone repository
    git clone https://github.com/rsksmart/rif-relay-contracts
    cd rif-relay-contracts
    # install dependencies
    npm install
    # deploy contracts to the network
    npx hardhat deploy --network regtest
    ```
2. List of deployed contracts:
    - Copy the deployed contracts from the console output:
        ```bash
        ┌───────────────────────────────────────┬──────────────────────────────────────────────┐
        │                (index)                │                    Values                    │
        ├───────────────────────────────────────┼──────────────────────────────────────────────┤
        │               Penalizer               │ '0xeFb80DB9E2d943A492Bd988f4c619495cA815643' │
        │               RelayHub                │ '0x463F29B11503e198f6EbeC9903b4e5AaEddf6D29' │
        │              SmartWallet              │ '0x987c1f13d417F7E04d852B44badc883E4E9782e1' │
        │          SmartWalletFactory           │ '0x79bbC6403708C6578B0896bF1d1a91D2BB2AAa1c' │
        │            DeployVerifier             │ '0x14f6504A7ca4e574868cf8b49e85187d3Da9FA70' │
        │             RelayVerifier             │ '0xA66939ac57893C2E65425a5D66099Bc20C76D4CD' │
        │           CustomSmartWallet           │ '0x20804b7317D2F4d0d2123f30c2D3A6B0E33DfB37' │
        │       CustomSmartWalletFactory        │ '0xb824784A5bF2Bc7139d1786639444e4Da259934B' │
        │    CustomSmartWalletDeployVerifier    │ '0x8921BF2f074b5470c02Cc7473F17282576111591' │
        │    CustomSmartWalletRelayVerifier     │ '0xC9dB73F54D43479b1a67DB2284bCFed17b0A13c2' │
        │        NativeHolderSmartWallet        │ '0xc53A82b9B7c9af4801c7d8EA531719E7657aFF3C' │
        │    NativeHolderSmartWalletFactory     │ '0x55c46eBC90C903Ff830b203Da1e7CA7CD2f0C3aa' │
        │ NativeHolderSmartWalletDeployVerifier │ '0x23EF9610F53092A66bf224862BfD45216d9f3ea2' │
        │ NativeHolderSmartWalletRelayVerifier  │ '0xEB71c55A85016d201718b7B08701b495548fe6aD' │
        │               UtilToken               │ '0x6f217dEd6c86A57f1211F464302e6fA544045B4f' │
        │            VersionRegistry            │ '0xbAFEd90451970adF0B511a1E9BCd1396a0Fe7f10' │
        └───────────────────────────────────────┴──────────────────────────────────────────────┘
        Generating network config...
        address file available at: contract-addresses.json
        ```
    - The script creates the file `./contract-addresses.json` with the same data
        ```bash
        {"regtest.33":{"Penalizer":"0xeFb80DB9E2d943A492Bd988f4c619495cA815643","RelayHub":"0x463F29B11503e198f6EbeC9903b4e5AaEddf6D29","SmartWallet":"0x987c1f13d417F7E04d852B44badc883E4E9782e1","SmartWalletFactory":"0x79bbC6403708C6578B0896bF1d1a91D2BB2AAa1c","DeployVerifier":"0x14f6504A7ca4e574868cf8b49e85187d3Da9FA70","RelayVerifier":"0xA66939ac57893C2E65425a5D66099Bc20C76D4CD","CustomSmartWallet":"0x20804b7317D2F4d0d2123f30c2D3A6B0E33DfB37","CustomSmartWalletFactory":"0xb824784A5bF2Bc7139d1786639444e4Da259934B","CustomSmartWalletDeployVerifier":"0x8921BF2f074b5470c02Cc7473F17282576111591","CustomSmartWalletRelayVerifier":"0xC9dB73F54D43479b1a67DB2284bCFed17b0A13c2","NativeHolderSmartWallet":"0xc53A82b9B7c9af4801c7d8EA531719E7657aFF3C","NativeHolderSmartWalletFactory":"0x55c46eBC90C903Ff830b203Da1e7CA7CD2f0C3aa","NativeHolderSmartWalletDeployVerifier":"0x23EF9610F53092A66bf224862BfD45216d9f3ea2","NativeHolderSmartWalletRelayVerifier":"0xEB71c55A85016d201718b7B08701b495548fe6aD","UtilToken":"0x6f217dEd6c86A57f1211F464302e6fA544045B4f","VersionRegistry":"0xbAFEd90451970adF0B511a1E9BCd1396a0Fe7f10"}}
        ```
3. Deploy Collector
    ```bash
    npx hardhat collector:deploy --network regtest --config-file-name "deploy-collector.input.sample.json" --output-file-name "collector-output.json"
    ```
4. Allow tokens
    - Register the address of the token `UtilToken`
        ```bash
        npx hardhat allow-tokens --network regtest 0x6f217dEd6c86A57f1211F464302e6fA544045B4f
        ```
5. Check allowed tokens
    ```bash
    npx hardhat allowed-tokens --network regtest
    ```
    Response:
    ```jsx
    rif-relay-contracts % npx hardhat allowed-tokens --network regtest
    deployVerifier [ '0x6f217dEd6c86A57f1211F464302e6fA544045B4f' ]
    relayVerifier [ '0x6f217dEd6c86A57f1211F464302e6fA544045B4f' ]
    customDeployVerifier [ '0x6f217dEd6c86A57f1211F464302e6fA544045B4f' ]
    customRelayVerifier [ '0x6f217dEd6c86A57f1211F464302e6fA544045B4f' ]
    nativeHolderDeployVerifier [ '0x6f217dEd6c86A57f1211F464302e6fA544045B4f' ]
    nativeHolderRelayVerifier [ '0x6f217dEd6c86A57f1211F464302e6fA544045B4f' ]
    ```
6. Mint token
    - To mint new units of the `UtilToken` into the Metamask wallet address:
        - Go to the Metamask wallet, and copy the wallet address:
        - Execute the command to mint the token, where:
            - `--token-address` → this is the address for `UtilToken`
            - `--amount` → quantity to be minted
            - `--receiver` → wallet address
            ```bash
            npx hardhat mint --token-address 0x6f217dEd6c86A57f1211F464302e6fA544045B4f --amount 10000000000000000000 --receiver 0xcff73226883c1cE8b3bcCc28E45c3c92C843485c --network regtest 
            ```
        - Import the minted token into the wallet.
        - To see the token in the wallet, click on “import tokens”, and then paste the token address.

### Step 4: Set up RIF Relay Server

RIF Relay Server Repository: [https://github.com/rsksmart/rif-relay-server](https://github.com/rsksmart/rif-relay-server)

[](#top "collapsible")
1. Clone RIF Relay Server repository and install dependencies:
    ```bash
    # clone repository
    git clone https://github.com/rsksmart/rif-relay-server
    cd rif-relay-server
    # install dependencies
    npm install
    ```
2. Add configuration file
    1. Create a file named `local.json5` inside the `config` directory located in the `rif-relay-server` folder.
        ```bash
        cd config
        touch local.json5
        nano local.json5
        ```
    2. Add the following lines into the `local.json5` file:
        ```bash
        {
            "app": {
                "url": "http://127.0.0.1:8090", // url of the server (if no port number is defined, it will connect to port 80 by default)
                "port": 8090,
                "devMode": true,
                "logLevel": 1,
                "workdir": ".",
            },
            "blockchain": {
                "rskNodeUrl": "http://127.0.0.1:4444",
            },
            "contracts": {
                "relayHubAddress": "0xDA7Ce79725418F4F6E13Bf5F520C89Cec5f6A974",
                "relayVerifierAddress": "0x03F23ae1917722d5A27a2Ea0Bcc98725a2a2a49a",
                "deployVerifierAddress": "0x73ec81da0C72DD112e06c09A6ec03B5544d26F05",
                        "feesReceiver": "0x848FD4E195dBb156F245E3E5FaB5b36706776Ba5"
            }
        }
        ```
    **Encounter `ECONNREFUSED` error?**
    If you encounter an `ECONNREFUSED` error during the registration process, it might be due to the absence of a port number in the URL. While the server may start correctly without specifying a port, registration requires it. To resolve this, add the port number to your `local.json5` file like this: `"url": "http://127.0.0.1:8090"`. After this modification, re-run the register command, and it should work correctly.
3. Start the RIF Relay Server
    ```bash
    # start the server
    npm start
    ```
    You should see the following response:
    ```jsx
    runServer() - Relay Server initialized
    runServer() - Relay Server started
    runServer() - Relay Server running
    Listening on port 8090
    Listening on port 8090
    Started polling for new blocks every 10000ms
    ```
4. Run the register
    > **Note:** Leave the server running.
    - Open another terminal in the rif relay server directory and enter the following command:
    ```bash
    npm run register
    ```
    - You should see the console of the server printing the changes
    Output from rif relay server already running:
    ```jsx
    NONCE FIX for signer= 0x43b6BD8980E79eE16E167ED9F7c09da4405Ea7aa : nonce= 2 2
    Broadcasting transaction:
    hash         | 0x9dcb086f331f227499c07f44839b7449dd7f7b06c654f7b2382027e3493a6160
    from         | 0x43b6BD8980E79eE16E167ED9F7c09da4405Ea7aa
    to           | 0x0xA5b4967ef4EAcB7D9c480E34DBCb206CEfa685a1
    value        | 3000000000000000 (0.003 RBTC)
    nonce        | 2
    gasPrice     | 1 (0.000000001 gwei)
    gasLimit     | 21000
    data         | 0x

    getWorkerBalance: workerIndex 0
    Relayer state: READY
    Done handling block #44. Created 1 transactions.
    address 0xA5b4967ef4EAcB7D9c480E34DBCb206CEfa685a1 sent. ready: true
    ```

## RIF Relay Sample dApp

This sample dApp shows you how to send transactions to the Rootstock blockchain using the [RIF Relay Sample dApp SDK](https://github.com/rsksmart/rif-relay-sample-dapp). You'll need to connect the dApp with MetaMask for signing transactions with the account managing your Smart Wallets.

[](#top "collapsible")
- Clone SDK repository and install dependencies:
    ```bash
    # clone repository
    git clone https://github.com/rsksmart/relaying-services-sdk-dapp
    cd relaying-services-sdk-dapp
    # install dependencies
    npm install --force
    ```
- Configure environment variables
    - Create a new file named `.env`  in the top directory, and add the following lines in it (with the contract addresses generated when we deployed the contracts) in the **Set up RIF Relay Contracts** section above:
        ```bash
        REACT_APP_CONTRACTS_RELAY_HUB=0x463F29B11503e198f6EbeC9903b4e5AaEddf6D29
        REACT_APP_CONTRACTS_DEPLOY_VERIFIER=0x14f6504A7ca4e574868cf8b49e85187d3Da9FA70
        REACT_APP_CONTRACTS_RELAY_VERIFIER=0xA66939ac57893C2E65425a5D66099Bc20C76D4CD
        REACT_APP_CONTRACTS_SMART_WALLET_FACTORY=0x79bbC6403708C6578B0896bF1d1a91D2BB2AAa1c
        REACT_APP_CONTRACTS_SMART_WALLET=0x987c1f13d417F7E04d852B44badc883E4E9782e1

        REACT_APP_RIF_RELAY_CHAIN_ID=33
        REACT_APP_RIF_RELAY_GAS_PRICE_FACTOR_PERCENT=0
        REACT_APP_RIF_RELAY_LOOKUP_WINDOW_BLOCKS=1e5
        REACT_APP_RIF_RELAY_PREFERRED_RELAYS=http://localhost:8090
        REACT_APP_BLOCK_EXPLORER=https://explorer.testnet.rsk.co
        ```
- Run the dApp
    ```bash
    # run app in regtest environment
    ENV_VALUE="regtest" npm run start
    ```
    ![Run the dApp](/assets/img/rif-relay/starter-kit/run-the-dapp.png)
- Connect metamask wallet for signing
    ![Connect Metamask Wallet](/assets/img/rif-relay/starter-kit/connect-metamask-wallet.png)
- Create a new smart wallet
    ![Create a new Smart Wallet](/assets/img/rif-relay/starter-kit/create-smart-wallet.png)
- Mint tokens to the wallet
    - For commands to mint token, See step 6 in the Set up RIF Relay contracts section above.
    ![Mint Tokens](/assets/img/rif-relay/starter-kit/mint-tokens.png)
- Transfer to different addresses, using TKN for transfer fees payment, instead of RBTC
    ![Transfer using TKN](/assets/img/rif-relay/starter-kit/transfer-using-tkn.png)