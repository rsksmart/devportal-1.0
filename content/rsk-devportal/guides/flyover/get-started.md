---
menu_title: Getting Started
title: "Flyover Protocol Documentation | Getting Started"
description: "Welcome to the flyover documentation, learn about the flyover architecture, how to get started and integrate the flyover protocol into your project."
tags: flyover, powpeg, peg-in, peg-out, 2way-peg, bridge, rbtc, btc, testnet, mainnet, guide, setup, integrate, use
render_features: 'tables-with-borders'
layout: rsk
---

In this section, we'll cover how to perform a [peg-in](/guides/flyover/glossary/) operation on Testnet, connect to an instance of the liquidity provider server (LPS), make API calls, verify signature and wallet address, and deposit test funds (tBTC) using faucets. See [Overview](/rsk/architecture/flyover/) for more information.

> The flyover protocol is currently only available on Testnet, and wallet services looking to integrate the flyover protocol may only do so on Testnet.

## Setup

To use the flyover protocol, we are going to need:
- A [liquidity provider server (LPS)](https://flyover-lps.testnet.rsk.co:8080/)
- A [liquidity bridge contract (LBC)](/guides/flyover/design-architecture#liquidity-bridge-contract-lbc)
- tBTC to pay for transactions. See how to get [tBTC](#using-faucet).

## Performing a peg in on Testnet

To perform a peg in operation on Testnet using the flyover protocol, we will do the following steps:

1. Connect to an instance of the LPS
2. Make an API call to `getQuote`, `acceptQuote`
3. Verify signature and deposit address
4. Deposit Funds (tBTC)

###  Connect to an LPS Instance on Testnet

An instance of the LPS has already been set up on Testnet: `https://flyover-lps.testnet.rsk.co/`

> - The server's functionality is provided through a JSON HTTP interface. 
> - The server needs access to both a Bitcoin node and an RSK node. Currently, there’s no web UI, so we will make an API call using Postman or cURL.

**Steps:**

The following is a summary of the steps needed to use the flyover protocol on Testnet.

1. Make a call to `getQuote` on LPS and get a `quote` JSON object
2. Make a call to LBC's `hashQuote`, which verifies a quote object and returns its hash.
3. Trigger `acceptQuote` on LPS with the hash received in the previous step and obtain a quote signature and a BTC deposit address.
4. Deposit funds in a BTC deposit address as generated in step 3.
 
#### getQuote

This computes and returns a quote for the service. See the [Liquidity Provider Server](/guides/flyover/tools#liquidity-provider-server-lps) for more information.

Below are the parameters included in the request to [getQuote](https://flyover-lps.testnet.rsk.co/getQuote).

| Parameter | Type | Value |
| -------- | -------- | -------- |
|`callContractAddress` | `string` | contract address or EOA address |
|`callContractArguments`| `string`  | Contract data    |
|`valueToTransfer`| `number` | Value to send in the call|
|`gasLimit`  | `number`| Gas limit to use in the call |
|`rskRefundAddress` | `string`| User RSK refund address|
|`bitcoinRefundAddress` | `string` | User Bitcoin refund address. Note: Must be a legacy address, segwit addresses are **not** accepted |

> - If `callContractAddress` is an [EOA](/guides/flyover/glossary/),  then the `data` parameter should be an empty string (""), and if it is a contract address, then the `data` parameter has to be specified.
> - `valueToTransfer` is denominated in wei, where 1 RBTC = 10^18 wei

##### Using cURL:

To make a request to `getQuote`, paste the following code into a terminal or send a `POST` request via any other HTTP client.

```shell
curl \
--location \
--request POST 'https://flyover-lps.testnet.rsk.co/getQuote' \
--header 'Content-Type: application/json' \
--data-raw '{
"callContractAddress":"0x20E75e7287763de60851Ed020089ABf17a1e9a4d",
"callContractArguments":"",
"valueToTransfer":5000000000000000,
"gaslimit":3000000,
"rskRefundAddress":"0x20E75e7287763de60851Ed020089ABf17a1e9a4d",
"bitcoinRefundAddress":"mnYcQxCZBbmLzNfE9BhV7E8E2u7amdz5y6"
}'
```

**Returns:**

The `getQuote` api returns a `quote`; this is a list of quotes for the service, with extra [parameters](/guides/flyover/design-architecture#liquidity-bridge-contract-lbc):

| Parameter | Value 
| -------- | -------- 
| `fedBTCAddr`    | 2N6JWYUb6Li4Kux6UB2eihT7n3rm3YX97uv
| `lbcAddr`        | 0x20f1c96aF83f01c07277D100dd7c01d8C7c850e3
| `lpRSKAddr`     | 0xd053b9B695BEb7104deEa56773197F05AD03E4e0
| `btcRefundAddr`     | mnYcQxCZBbmLzNfE9BhV7E8E2u7amdz5y6
| `rskRefundAddr`     | 0x20E75e7287763de60851Ed020089ABf17a1e9a4d
| `lpBTCAddr`     | mnYcQxCZBbmLzNfE9BhV7E8E2u7amdz5y6
| `callFee`     | 1368444001000
| `penaltyFee`     | 1000000
| `contractAddr`     | 0x20E75e7287763de60851Ed020089ABf17a1e9a4d
| `data`     | ""
| `gasLimit`     | 3000000
| `nonce`     | 3390942776830067377
| `value`     | 5000000000000000
| `agreementTimestamp`     | 1657202610
| `timeForDeposit`     | 3600
| `callTime`     | 7200
| `confirmations`    | 2
| `callOnRegister`     | 2N6JWYUb6Li4Kux6UB2eihT7n3rm3YX97uv
| `fedBTCAddr`    | false

See more info in [Liquidity Bridge Contract](/guides/flyover/design-architecture#liquidity-bridge-contract-lbc).

> - The minimum `valueToTransfer` is 0.005 BTC + gas fees. `value` + `callFee` should not be less than `minPegIn`. `minPegIn` is a value that may be queried from the RSK bridge. At the time of writing (July 2022), the value of `minPegIn` is 0.005 RBTC in Testnet and Mainnet. See [minimum](https://developers.rsk.co/rsk/architecture/powpeg/#peg-in-and-peg-out-finality) required values.
> - For the above API call to `callContractArguments`, data is empty since it is being used as an EOA.
> - `valueToTransfer` is in wei. Use the [Simple Unit Converter](https://eth-converter.com/) to convert amount in RBTC to wei
> - `rskRefundAddress`: A remainder will be sent to this address in the event that the user sends more than the agreed amount, or refund, if the LP hasn’t provided its service, i.e. the `callForUser` action is not triggered. This address can also be the same as the `callContractAddress`. See [RSKIP 284](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP284.md) for more information.
> - `bitcoinRefundAddress`: funds will be sent to this address incase of a failed peg-in transaction to the RSK network. This may occur when a locking cap is exceeded.
> - `timeForDeposit`: In this case time specified is 1 hour in seconds.
> - `callFee` is made up of the LP fee, service fee, and gas limit fees. User has to send the sum of value plus callFee

#### Getting quoteHash

This is a 64 digit number that derives from a `quote` object. QuoteHash can be generated by calling the [`LBC.hashQuote()` contract function](https://github.com/rsksmart/liquidity-bridge-contract/blob/8dec3edfb8e27d87207edf8f5c477687baae606f/contracts/LiquidityBridgeContract.sol#L375).

This is a local method provided by the LBC, and doesn’t require mining a transaction or use of funds. A wallet service could call the RSK network contacting the LBC to hash quote. This method is already implemented by the LBC and is not required by a wallet service. See [Glossary](/guides/flyover/glossary/) section.

> The `quoteHash` is needed in order to make an API call to `acceptQuote`. There are different ways to get the quoteHash. See examples below:

**Using Liquidity Bridge Contract**

The `quoteHash` could be calculated using the [LBC hash function](https://github.com/rsksmart/liquidity-bridge-contract/blob/8dec3edfb8e27d87207edf8f5c477687baae606f/contracts/LiquidityBridgeContract.sol#L375).

```shell
function hashQuote(Quote memory quote) public view returns (bytes32) {
        return validateAndHashQuote(quote);
    }
```

**Using eth_call JSON-RPC**

Users can invoke the `eth_call` JSON-RPC directly, or by using a web3 library. Here's a sample ethers.js call below;

```shell
npx hardhat hash-quote --quote
```

See the [Tools](/guides/flyover/tools#hardhat) section for more information.

### acceptQuote

The `acceptQuote` parameter accepts the LPS quotes. This is done by passing the `quoteHash` in the body of the request. 

**Parameter:**

```
quoteHash (string) 
    - Hex-encoded quote hash as computed by LBC.hashQuote
```

**Returns:**

```
signature 
    - Signature of the quote
bitcoinDepositAddressHash 
    - Hash of the deposit BTC address
```

Example:

**Parameter:**

```shell
curl --location --request POST 'https://flyover-lps.testnet.rsk.co/acceptQuote' \
--header 'Content-Type: application/json' \
--data-raw '{
    "quoteHash": "102e8332dfd95f9d911e14b51349ad9305a834c4f38c1aa7f39cebbf84600bee"
}'
```

**Returns:**

If successful, returns a signature and a `bitcoinDepositAddressHash` (where funds for peg-in will be deposited).

```
{
    "signature": "1504e6ebf49cf6e7414fb98644b4e41303eec19e767f8ab9c86aafd0f0855aad3547817b496bc56cbbb540044677af15e7a423c4d23c7eb474fa6aeabb6585ce1c",
    "bitcoinDepositAddressHash": "2NCuphpp2VX8LKZA5aCVmDc8bDq7G7kUrNG"
}
```

> Signature is needed in case of failure by LP to fulfill its obligation. The call to `registerPegIn` also requires a signature parameter.

#### Verify Signature

Wallets are required to verify the signature and the deposit address before making deposits. 

A signature is a [Keccak256](https://solidity-by-example.org/hashing/) hash of the concatenation of `\x19Ethereum Signed Message:\n32` and `quoteHash`, signed with the LP's private key.

Verifying of signature is done by:

- Performing a calculation to an active powpeg address and generating `PowpegRedeemScript` (which enables expending of funds from powpeg address) which prepends the `quoteHash`.
- Using the method `getActivePowpegRedeemScript` will enable users and liquidity providers to validate unique addresses and compute unique addresses. See [RSKIP293](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP293.md).
- This is fully decentralised, and does not rely  on LPs. Verification can be done independently by the user and an LP.

## Using the Liquidity Bridge Contract (LBC)

The [LBC](https://github.com/rsksmart/liquidity-bridge-contract) manages the interaction between users and liquidity providers (LP) in order to achieve fast peg-ins.

See [design](/guides/flyover/design-architecture/) section for diagrams showing the interactions between liquidity provider, liquidity bridge contract and bridge contract.

###  Deposit Funds (Peg-in)

#### using Faucet

In this section, we will deposit test funds (tBTC) into the `bitcoinDepositAddress` generated in previous [step](#acceptquote) using a faucet, we will do the following;

> Note: It is advisable to use a wallet to send exact agreed BTC funds, because faucets may send less than agreed in a [getQuote](#getquote) API call. It might be a good idea to deposit some test BTC funds into a user-controlled wallet before proceeding. See minimum [valueToTransfer](#using-curl).

- Step 1: Get `bitcoinDepositAddressHash` by following the steps above.

Visit a Bitcoin [Testnet faucet]( https://coinfaucet.eu/en/btc-testnet/) to get test BTC funds.

- Step 2: Copy and paste `bitcoinDepositAddressHash` into address field.

![paste address](/assets/img/guides/flyover/coinfaucet-home.png)

- Step 3: Click on get test bitcoins

![get-test-bitcoins](/assets/img/guides/flyover/paste-address-coinfaucet.png)

> Note: The transaction can take up to an hour before test funds (tBTC) are deposited into your wallet from the faucet.