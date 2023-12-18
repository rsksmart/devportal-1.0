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
## Getting Started


 This guide helps to quickly get started with setting up your environment to use RIF Relay and also use the sample dApp to test relay services.

### 1. Running the Rootstock node

- this can be done either by using the [JAR package](https://dev.rootstock.io/rsk/node/install/operating-systems/java/) or the [docker](https://dev.rootstock.io/rsk/node/install/operating-systems/) container
- see devportal documentation: [https://dev.rootstock.io/rsk/node/install/](https://dev.rootstock.io/rsk/node/install/)
- in either case, a specific `node.conf` file must be used: [https://github.com/rsksmart/rif-relay/blob/develop/docker/node.conf](https://github.com/rsksmart/rif-relay/blob/develop/docker/node.conf)

#### Using the JAR file

To run the Rootstock node using the [JAR file](https://github.com/rsksmart/rskj/releases), see the instructions for how to **[Install the node using a JAR file](https://dev.rootstock.io/rsk/node/install/operating-systems/java/).**

- Create the directory for the node:

```jsx
mkdir rskj-node-jar
cd ~/rskj-node-jar
```

- Move or copy the just downloaded jar file to the directory

```jsx
mv ~/Downloads/rskj-core-5.3.0-FINGERROOT-all.jar SHA256SUMS.asc /Users/{user}/rskj-node-jar/
```

- Create another directory inside `~/rskj-node-jar/config`

```jsx
mkdir config
```

- Download this config file: [https://github.com/rsksmart/rif-relay/blob/develop/docker/node.conf](https://github.com/rsksmart/rif-relay/blob/develop/docker/node.conf)
- Copy or move the `node.conf` file just downloaded into the config directory
- CD into the folder containing the jar file

Run the following command in the terminal:

```bash
arch -x86_64 /usr/local/opt/openjdk@8/bin/java -Drsk.conf.file=./config/node.conf -cp ./rskj-core-5.3.0-FINGERROOT-all.jar co.rsk.Start --regtest
```

OR

```jsx
java -Drsk.conf.file=./config/node.conf \
cp ./<PATH-TO-JAR-FILE> co.rsk.Start \
-regtest
```

---

Leave the terminal running.

Now let’s check that the node is running

Open another terminal and enter the command below:

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

Check the blockNumber:

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

#### Using Docker

### 

- developer’s portal instructions
    
    Follow the instructions in [How to setup a Rootstock node using Docker](https://dev.rootstock.io/rsk/node/install/operating-systems/).
    
    In this guide, we will run the node using the **[Dockerfile.RegTest](https://github.com/rsksmart/reproducible-builds/tree/master/rskj/5.3.0-fingerroot).** This means a node connected to a private `RegTest` network.
    
    Note that If you get the error:
    
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
    

To run the RegTest node, you should execute:

Pull the RSKj Docker Image

```jsx
docker pull rsksmart/rskj
```

Run the Node

```jsx
docker run -d --name rsk-node -p 4444:4444 -p 50505:50505 rsksmart/rskj node --regtest
```

If successful, the node should be running.

Interacting with the Node

```jsx
curl -X POST -H "Content-Type: application/json" --data "{\"jsonrpc\":\"2.0\",\"method\":\"net_version\",\"params\":[],\"id\":1}" http://127.0.0.1:4444
```

---

---

You should see the below output:

```bash
{"jsonrpc":"2.0","id":1,"result":"33"}
```

To check that the node running, see section on Using the JAR file

Now, you have successfully setup a Rootstock node using the docker image.

### 2. Add network to Metamask

In order to interact with the Rootstock network, we have to add it to Metamask. As we are using the node on `--regtest` mode, we will add the Regtest Network. Follow the steps below or see tutorial on [How to add Metamask to Rootstock Programmatically](https://dev.rootstock.io/kb/rootstock-metamask/).

- On Metamask, click the network selector, and then “add network”

- Click: “Add a network manually” and enter the following data:
    - Network name: RSK regtest
    - New RPC URL: [http://127.0.0.1:4444](http://127.0.0.1:4444)
    - Chain ID: 33
    - Currency symbol: tRBTC


### 3. Set up RIF Relay contracts

RIF Relay Repository: [https://github.com/rsksmart/rif-relay-contracts](https://github.com/rsksmart/rif-relay-contracts)

#### 3.2 Clone repo and install dependencies:

```bash
# clone repository
git clone https://github.com/rsksmart/rif-relay-contracts
cd rif-relay-contracts
# install dependencies
npm install
# deploy contracts to the network
npx hardhat deploy --network regtest
```

#### 3.3 List of deployed contracts:

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

#### 3.4 Collector Deployment:

```bash
npx hardhat collector:deploy --network regtest --config-file-name "deploy-collector.input.sample.json" --output-file-name "collector-output.json"
```

#### 3.5 Allow tokens:

- for this step we have to register the address of the token `UtilToken`

```bash
npx hardhat allow-tokens --network regtest 0x6f217dEd6c86A57f1211F464302e6fA544045B4f
```

#### 3.4 Check allowed tokens:

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

#### 3.5 Mint token:

- In this step, we mint new units of the `UtilToken` into the Metamask wallet address
- for that, go to the Metamask wallet, and copy the wallet address:

- execute the command to mint the token, where:
    - `--token-address` → this is the address for `UtilToken`
    - `--amount` → quantity to be minted
    - `--receiver` → wallet address

```bash
npx hardhat mint --token-address 0x6f217dEd6c86A57f1211F464302e6fA544045B4f --amount 10000000000000000000 --receiver 0xcff73226883c1cE8b3bcCc28E45c3c92C843485c --network regtest 
```

- Import the minted token into the wallet:
- in order to see the token in the wallet, click on “import tokens”, and then paste the token address

### 4. Set up RIF Relay Server

- repository: [https://github.com/rsksmart/rif-relay-server](https://github.com/rsksmart/rif-relay-server)

#### 4.1 clone repo and install dependencies:

```bash
# clone repository
git clone https://github.com/rsksmart/rif-relay-server
cd rif-relay-server
# install dependencies
npm install
```

#### 4.2 Add configuration file

- Create a file named `local.json5` inside the `config` directory located in the `rif-relay-server` folder.

```bash
cd config
touch local.json5
nano local.json5
```

- Add the following lines into the `local.json5` file:

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

- error related to the port number:
    - If I don’t add the port number to the url, the server starts ok
    - the problem is when I run the register, I have the following error `ECONNREFUSED`:
    
    - and it doesn’t register the server
    - but if I add the following value to the `local.json5` file: `"url": "http://127.0.0.1:8090"` , and then execute the register again, it works ok.
        
    - 

#### 4.3 Start the RIF Relay Server

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

- new error when starting the server:
    - rif relay server:
    - when I execute `npm start` for the first time, I get the following error:
    
    - I noticed the execution adds the file `manager\keystore` with the following data: `{"seed":"8789dffd0f1377924feee4200b2cfea0"}`
    - due to the error, If I change the data in the file by adding `0x` to the seed, so it has `{"seed":"0x8789dffd0f1377924feee4200b2cfea0"}`,
    - I can run the command `npm start` again and it works, but throws the same error for the `workers\keystore`
        
    - do the same and change the data in the `workers\keystore` , from `{"seed":"d358dbadce89d25dc2101c13b48f6bca"}` to `{"seed":"0xd358dbadce89d25dc2101c13b48f6bca"}`
    - then, run the command again, and it works ok
    
    - think this could be fixed by changing the function `generateRandomSeed()` , just by adding `‘0x’` to the returned value
    
    ```jsx
    private generateRandomSeed() {
        return Buffer.from(utils.randomBytes(16).buffer).toString('hex');
    }
    ```
    

#### 4.4 Run the register

- Note: Leave the server running.
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

