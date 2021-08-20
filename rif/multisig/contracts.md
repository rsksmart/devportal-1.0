---
layout: rsk
title: RIF Multisig Architecture - Safe Contracts
description: use this set of smart contracts to create multi-signature wallets
tags: rif, multisig, gnosis, smart-contracts, solidity
prevUrl: '/rif/multisig/sample-application/'
nextUrl: '/rif/multisig/transaction-service/'
---

There are 3 main contracts involved in RIF Multisig:
- [`GnosisSafe`](https://github.com/gnosis/safe-contracts/blob/v1.2.0/contracts/GnosisSafe.sol)
- [`GnosisSafeProxy`](https://github.com/gnosis/safe-contracts/blob/v1.2.0/contracts/proxies/GnosisSafeProxy.sol)
- [`GnosisSafeProxyFactory`](https://github.com/gnosis/safe-contracts/blob/v1.2.0/contracts/proxies/GnosisSafeProxyFactory.sol)

![Safe contracts overview](/assets/img/rif-multisig/overview.png)

They apply the [proxy pattern](https://blog.openzeppelin.com/proxy-patterns/) to lower the gas cost by splitting logic (GnosisSafe) and storage (GnosisSafeProxy) into separate contracts.

![Safe proxy pattern](/assets/img/rif-multisig/proxy.png)

### Addresses

| Contract | RSK Testnet | RSK Mainnet |
| - | - | - |
| `GnosisSafe` | [`0xFFd41b816f2821e579b4DA85c7352bf4f17e4fA5`](https://explorer.testnet.rsk.co/address/0xffd41b816f2821e579b4da85c7352bf4f17e4fa5) |  [`0xC6cFa90Ff601D6AAC45D8dcF194cf38B91aCa368`](https://explorer.rsk.co/address/0xC6cFa90Ff601D6AAC45D8dcF194cf38B91aCa368) |
| `GnosisSafeProxyFactory` | [`0x5b836117aed4Ca4DEe8E2E464F97f7F59b426C5A`](https://explorer.testnet.rsk.co/address/0x5b836117aed4ca4dee8e2e464f97f7f59b426c5a) | [`0x4b1Af52EA200BAEbF79450DBC996573A7b75f65A`](https://explorer.rsk.co/address/0x4b1Af52EA200BAEbF79450DBC996573A7b75f65A) |

___
## `GnosisSafe`

It provides the functionalities required to setup a GnosisSafe and to execute the transactions. It also exposes the methods to add, remove or swap the owners and set a new threshold.

### Setup

It sets the initial storage of the contract.

```solidity
function setup(
    address[] calldata _owners,
    uint256 _threshold,
    address to,
    bytes calldata data,
    address fallbackHandler,
    address paymentToken,
    uint256 payment,
    address payable paymentReceiver
)
    external
```

Parameters:
- `_owners`: List of Safe owners.
- `_threshold`: Number of required confirmations for a Safe transaction.
- `to`: Contract address for optional delegate call.
- `data`: Data payload for optional delegate call.
- `fallbackHandler`: Handler for fallback calls to this contract
- `paymentToken`: Token that should be used for the payment (0 is ETH)
- `payment`: Value that should be paid
- `paymentReceiver`: Address that should receive the payment (or 0 if tx.origin)

### `getTransactionHash`

It calculates the hash of a transaction.

```solidity
function getTransactionHash(
    address to,
    uint256 value,
    bytes memory data,
    Enum.Operation operation,
    uint256 safeTxGas,
    uint256 baseGas,
    uint256 gasPrice,
    address gasToken,
    address refundReceiver,
    uint256 _nonce
)
    public
    view
    returns (bytes32)
```

Parameters:
- `to`: Destination address.
- `value`: Ether value.
- `data`: Data payload.
- `operation`: Operation type.
- `safeTxGas`: Gas that should be used for the safe transaction.
- `baseGas`: Gas costs for data used to trigger the safe transaction.
- `gasPrice`: Maximum gas price that should be used for this transaction.
- `gasToken`: Token address (or 0 if ETH) that is used for the payment.
- `refundReceiver`: Address of receiver of gas payment (or 0 if tx.origin).
- `_nonce`: Transaction [nonce](#nonce).

### `approveHash`

It marks a hash as approved, hence, it can be executed by owners only.

```solidity
function approveHash(bytes32 hashToApprove)
    external
```

Parameters:
- `hashToApprove`: The hash that should be marked as approved for signatures that are verified by this contract.


### `execTransaction`

It allows to execute a Safe transaction confirmed by the required number of owners (threshold) and then pays the account that submitted the transaction. The fees are always transferred, even if the user transaction fails.

```solidity
function execTransaction(
    address to,
    uint256 value,
    bytes calldata data,
    Enum.Operation operation,
    uint256 safeTxGas,
    uint256 baseGas,
    uint256 gasPrice,
    address gasToken,
    address payable refundReceiver,
    bytes calldata signatures
)
    external
    payable
    returns (bool success)
```

Parameters:
- `to`: Destination address of Safe transaction.
- `value`: Ether value of Safe transaction.
- `data`: Data payload of Safe transaction.
- `operation`: Operation type of Safe transaction.
- `safeTxGas`: Gas that should be used for the Safe transaction.
- `baseGas`: Gas costs for that are independent of the transaction execution(e.g. base transaction fee, signature check, payment of the refund)
- `gasPrice`: Gas price that should be used for the payment calculation.
- `gasToken`: Token address (or 0 if ETH) that is used for the payment.
- `refundReceiver`: Address of receiver of gas payment (or 0 if tx.origin).
- `signatures`: Packed signature data ({bytes32 r}{bytes32 s}{uint8 v})

### `nonce`

The nonce usage prevents replay attacks. Its value is incremented each time a transaction is executed, hence each transaction should have a different nonce. This mechanism also allows the rejection of a transaction before its execution. Once a transaction is created, it can be rejected by creating and executing a new transaction with the same nonce. In that way, the original transaction cannot be executed anymore.

```solidity
uint256 public nonce;
```



## `GnosisSafeProxy`

It is the contract entitled to manage the address and the storage of a Safe. It forwards the requests to the master copy ([GnosisSafe](#gnosissafe)). Its master copy can be changed so the Safe logic is also upgradable, even if it requires the creation of a transaction that must be confirmed by all Safe owners.

## fallback function
It forwards all transactions and returns all received return data.

```solidity
function ()
    external
    payable
{
    assembly {
        let masterCopy := and(sload(0), 0xffffffffffffffffffffffffffffffffffffffff)
        // 0xa619486e == keccak("masterCopy()"). The value is right padded to 32-bytes with 0s
        if eq(calldataload(0), 0xa619486e00000000000000000000000000000000000000000000000000000000) {
            mstore(0, masterCopy)
            return(0, 0x20)
        }
        calldatacopy(0, 0, calldatasize())
        let success := delegatecall(gas, masterCopy, 0, calldatasize(), 0, 0)
        returndatacopy(0, 0, returndatasize())
        if eq(success, 0) { revert(0, returndatasize()) }
        return(0, returndatasize())
    }
}
```

## `GnosisSafeProxyFactory`

It allows the creation and the setup of (GnosisSafeProxy)[#gnosissafeproxy] instances and it emits an event upon successful creation.

### `createProxy`

It allows to create new proxy contact and execute a message call to the new proxy within one transaction.

```solidity
function createProxy(address masterCopy, bytes memory data)
    public
    returns (GnosisSafeProxy proxy)
{
```

Parameters:
- `masterCopy`: Address of master copy.
- `data`: Payload for message call sent to new proxy contract. It allows the creation of new SafeProxy instances and their setup in a single transaction.

### `ProxyCreation`

Event emitted upon successful creation.

```solidity
event ProxyCreation(GnosisSafeProxy proxy);
```


> The official specs can be found on the [Gnosis Safe Developer Portal](https://docs.gnosis.io/safe/).
