---
layout: rsk
title: Get your own RIF Lumino node up and running on MacOS
---

# Get your own RIF Lumino node up and running on MacOS

## Prerequisites

1. Access to a synced RSK node. You can do this in a variety of ways:
	1. Run your own node on Testnet or Mainnet, see [Node (RSKj): Install](/rsk/node/install/).
	2. Compile and run a RSK node locally, see [Node (RSKj): Contribute](/rsk/node/contribute/).

## Recommended

1. An RSK account with an RBTC balance of **at least** 0.001 RBTC, in order to be able to use all of the system features.

## Install required libraries/software

### 1. Install command line tools

Do this by opening a terminal and executing:

```
xcode-select --install
```

### 2. Install Homebrew

You can install Homebrew by executing:

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

### 3. Install OpenSSL

Do this by executing:

```
brew install openssl
export LC_ALL="en_US.UTF-8"\nexport LC_CTYPE="en_US.UTF-8"
export LIBRARY_PATH=$LIBRARY_PATH:/usr/local/opt/openssl/lib/
```

### 4. Install Python 3.7

We'll need Python 3.7 specifically, so install it through:

```
brew install python@3.7
```

### 5. Install `pip`

The package installer for Python can be installed through:

```
sudo easy_install pip
```

### 6. Install `virtualenv`

Install `virtualenv` by executing:

```
pip3 install virtualenv
```

### 7. Install database tools

Execute these 2 commands:

```
brew install libpq
```

```
brew install postgresql
```

### 8. Install other dependencies

There are a few more tools that will be needed for the Lumino installation. 

Execute these commands sequentially:

```
brew install pkg-config
```

```
brew install libtool
```

```
env LDFLAGS="-I/usr/local/opt/openssl/include -L/usr/local/opt/openssl/lib" pip3 install psycopg2
```

```
brew tap cuber/homebrew-libsecp256k1
brew install libsecp256k1
```

## Build RIF Lumino from code

### 1. Get the code

Get the code from [the Github page](https://github.com/rsksmart/lumino/). You can either clone the repo or get the compressed version from the [releases page](https://github.com/rsksmart/lumino/releases). 

Let's call your local path in which the code resides `$RIF_LUMINO_PATH`.

### 2. Create an environment

You'll only need to create a python virtual environment for RIF Lumino once. 

Execute the following command:

```
virtualenv -p <PATH_TO_PYTHON3.7> clientEnv
```

**Note:**

Replace `<PATH_TO_PYTHON3.7>` with the path where Python3.7 is installed in your system. In the case of MacOS, this is usually `/usr/local/bin/python3.7`.

You can verify your path to Python3.7 by executing:
```
which python3
```

### 3. Activate the environment
Activate the python virtual environment by executing the following command:

```
source clientEnv/bin/activate
```

Check if the Python version is correct inside the virtual environment by running:

```
python --version
```

This command should output version 3.7.x.

### 4. Make sure `pip` is up-to-date

Having the latest `pip` can help solve conflicts with dependencies. You can update `pip` by executing:

```
python -m pip install -U pip
```

### 5. Install RIF Lumino requirements in your environment

Inside the virtual environment, run the following command (this could take a few minutes):

```
pip install -r requirements.txt -c constraints.txt -e .
```

**If you experience an error** related to the `grpcio-tools` library, execute the following command while inside the environment:

```
GRPC_PYTHON_BUILD_SYSTEM_ZLIB=true pip install grpcio-tools
```

and then run `pip install -r requirements.txt -c constraints.txt -e .` again.

Finally, run the Lumino setup with the following command:

```
python setup.py develop
```

## Start RIF Communications transport layer

The communication between Lumino nodes can be done both using [RIF Communications](https://www.rifos.org/communications) and [Matrix](https://matrix.org/).

The default way, and the one encouraged to be used for a more decentralized ecosystem, is RIF Communications. 

In order to run Lumino using RIF Comms, you need to set up the RIF Communications node. To use Matrix, no configuration is required. 

### Set up a RIF Communications bootnode

Please follow the instructions in the [RIF Communications installation page](https://github.com/rsksmart/rif-communications-pubsub-bootnode/tree/grpc-api).

## Start your RIF Lumino Node

1. Go to `$RIF_LUMINO_PATH`.
2. If you haven't executed it before, run `source clientEnv/bin/activate` to activate the virtual environment.
3. Run the following command to start Lumino:
    
    ```
    lumino
        --keystore-path $KEYSTORE_PATH
        --network-id 33
        --eth-rpc-endpoint $RSK_NODE_URL
        --environment-type development
        --tokennetwork-registry-contract-address $TOKENNETWORK_REGISTRY_CONTRACT_ADDRESS
        --secret-registry-contract-address $SECRET_REGISTRY_CONTRACT_ADDRESS
        --endpoint-registry-contract-address $ENDPOINT_REGISTRY_CONTRACT_ADDRESS
        --no-sync-check
        --api-address 127.0.0.1:5001
        --rnsdomain $YOUR_RNS_DOMAIN
        --discoverable # if this flag is present, then your node will be registered on Lumino Explorer
        --hub-mode # if this flag is present, then your node will run in HUB mode
        --transport $TRANSPORT_MODE
        --grpc-endpoint $GRPC_ENDPOINT
    ```
    
   
    |                  FIELD                  |                                                                                                              DESCRIPTION                                                                                                             |
|---------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| *$KEYSTORE_PATH*                          | The path to your keystore folder.                                                                                                                                                                                                    |
| *network-id*                             | The blockchain network ID you're connecting to. This must match the RSK node you're connecting to. `33` is regtest.                                                                                                                  |
| *$RSK_NODE_URL*                           | URL of the RSK node to connect to (`http://URL:PORT`).  If you're running a local node, this will typically be `http://localhost:4444/`.                                                                                             |
| *environment-type*                        | You will need this set to `development` in order to use custom blockchain and contract addresses.                                                                                                                                    |
| *$TOKENNETWORK_REGISTRY_CONTRACT_ADDRESS* | Address for the token registry contract deployed (view contracts table).                                                                                                                                                             |
| *$SECRET_REGISTRY_CONTRACT_ADDRESS*       | Address for the secret registry contract deployed (view contracts table).                                                                                                                                                            |
| *$ENDPOINT_REGISTRY_CONTRACT_ADDRESS*     | Address for the endpoint registry contract deployed (view contracts table).                                                                                                                                                          |
| *no-sync-check*                           | This will allow you to bypass checking that the node is synchronized against etherscan.                                                                                                                                              |
| *$YOUR_RNS_DOMAIN*                        | You can supply the RNS address associated with your RSK node address, e.g. `--rnsdomain=lumino.rsk.co`                                                                                                                               |
| *$TRANSPORT_MODE*                         | Transport mode for Lumino. Supported values are `rif-comms` and `matrix`. Example of use: `--transport=matrix`.  Defaults to `rif-comms`.                                                                                            |
|                                         | The communication endpoint for the RIF Comms node used for transport purposes.  Note that the `transport` flag must be set to `rif-comms` (explicitly or by default) for this parameter to be used.  Defaults to `"localhost:5013"`. |

    More configuration options can be found by browsing the code.

4.  After you run Lumino you will be presented with the following message:
    
    ```
    Welcome to RIF Lumino Payments Protocol, Version 0.1
    ---------------------------------------------------------------------------------------------------------------
    | This is an Alpha version of experimental open source software released under the MIT license. By using the  |
    | RIF Lumino Payments Protocol (the “Software”), you acknowledge that this is a test version of the Software  |
    | and assume the risk that the Software may contain errors and/or bugs. RIF Labs Limited (“RIF Labs”) makes   |
    | no guarantees or representations  whatsoever, including as to the suitability or use of the Software for    |
    | any  purpose or regarding its compliance with any applicable laws or regulations. By using the Software,    |
    | you acknowledge that you have read this disclosure agreement, understand its contents, and assume all risks |
    | related to the use of of the software; further, by answering yes below and accepting the terms of this      |
    | Agreement, you release and discharge RIF Labs, its officers, employees, or affiliates from, waive  any      |
    | claims you might have against RIF Labs, its officers, employees, or affiliates in connection with, and      |
    | agree not to sue RIF Labs or any of its officers, employees, or affiliates for any direct or indirect       |
    | liability arising from the use of this Software.                                                            |
    |                                                                                                             |
    |                                                                                                             |
    | Privacy Warning:                                                                                            |
    |                                                                                                             |
    | By using the RIF Lumino Payments Protocol, you acknowledge that your RSK address, channels, channel deposits|
    | settlements, and the RSK address of your channel counterparty will be stored on the RSK blockchain—that is, |
    | on servers of RSK node operators—and therefore will be publicly available. The parties running nodes on the |
    | RIF Lumino network may also download and store this same or related information or data, and information or |
    | data stored on Lumino nodes and  network channels will be publicly visible, including on a RIF Lumino block |
    | explorer. By using the Software and by answering yes below, you acknowledge that information or data stored |
    | on the Lumino network is extremely difficult to alter, remove, or delete; you further acknowledge that      |
    | information or data related to individual tokens transfers will be made available via  the Lumino Payments  |
    | Protocol to the recipient intermediating nodes of a specific transfer as well as to the Lumino server       |
    | operators.                                                                                                  |
    ---------------------------------------------------------------------------------------------------------------
    Have you read and understood and do you accept the RIF Lumino Disclosure Agreement and Privacy Warning? [y/N]:
    ```

5. After you've accepted, you will be asked to select the account you want to use. Select the account and enter your passphrase to continue.

### Contract addresses for each network

Go to [the Lumino Github repo](https://github.com/rsksmart/lumino) for the latest addresses of the contracts.

You can also use your own contract addresses if you're connecting to a local blockchain for development or testing purposes. 