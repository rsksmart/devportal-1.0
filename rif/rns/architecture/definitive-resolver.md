---
layout: rsk
title: Resolver
---

- RSK Mainnet: [`0xD87f8121D44F3717d4bAdC50b24E50044f86D64B`](https://explorer.rsk.co/address/0xd87f8121d44f3717d4badc50b24e50044f86d64b)
- RSK Testnet: [`0x25C289ccCFFf700c6a38722F4913924fE504De0e`](https://explorer.testnet.rsk.co/address/0x25c289cccfff700c6a38722f4913924fe504de0e)
- Repo: [rnsdomains/rns-resolver](https://github.com/rnsdomains/rns-resolver)

## Features

Supported resolution protocols:

- Contract addresses - [EIP-137](https://eips.ethereum.org/EIPS/eip-137#resolver-specification)
- Multicoin addresses - [EIP-2304](https://eips.ethereum.org/EIPS/eip-2304)
- Contenthash - [EIP-1577](https://eips.ethereum.org/EIPS/eip-1577)
- Contract ABI - [EIP-205](https://eips.ethereum.org/EIPS/eip-205)
- SECP256k1 public keys - [EIP-619](https://github.com/ethereum/EIPs/pull/619)
- Text records - [EIP-634](https://eips.ethereum.org/EIPS/eip-634)
- Interface discovery - [EIP-1844](https://eips.ethereum.org/EIPS/eip-1844)

Architecture:

- Upgradeable contracts using [OpenZeppelin Upgrades](https://docs.openzeppelin.com/upgrades/2.8/).
- Use `setAuthorisation` to enable others set your records.
- Use `multicall` to perform multiple operations in one call/transaction.

## Public methods

- Resolution protocols
  - Contract and multicoin addresses: `addr` and `setAddr`
  - Contenthash: `contenthash` and `setContenthash`
  - Contract ABI: `abi` and `setAbi`
  - SECP256k1 public keys: `pubkey` and `setPubkey`
  - Text records: `text` and `setText`
  - Interface discovery: `interfaceImplementer` and `setInterfaceImplementer`
- Administartive
  - Authorisations: `authorisations`, `setAuthorisation` and `isAuthorised`
  - Multiple calls: `multicall`

### Authorisations

Any account can set an authorisation for any name, but the authorisation that is checked will be that of the current owner of a name. Thus, transferring a name effectively clears any existing authorisations, and new authorisations can be set in advance of an ownership transfer if desired.

```solidity
function setAuthorisation(bytes32 node, address target, bool isAuthorised) external;
```

Sets or clears an authorisation. Authorisations are specific to the caller.

- `node` The name to change the authorisation on.
- `target` The address that is to be authorised or deauthorised.
- `isAuthorised` True if the address should be authorised, or false if it should be deauthorised.

```solidity
function authorisations(bytes32 node, address owner, address caller) exsternal view returns (bool);
```

A mapping of authorisations: `(node, owner, caller) => isAuthorised`.

```solidity
function isAuthorised(bytes32 node) internal view returns(bool);
```

Returns if the sender is authorised for the given node.

### Multi calling

This method allows to update more than one record in a single transaction or retrive more than one record in a single call.

```
function multicall(bytes[] calldata data) external returns(bytes[] memory results);
```

- `data` is an array of ABI-encoded calls to be performed. ([spec](https://solidity.readthedocs.io/en/v0.5.3/abi-spec.html))

An example in JS setting the address and contenthash:

```javascript
const resolver = new web3.eth.Contract(resolverAbi, resolverAddress)

const setAddrData = web3.utils['setAddr(bytes32,address)'](myNode, myNewAddress).encodeABI()
const setContenthashData = web3.utils.setContenthash(myNode, myNewContenthash).encodeABI()

await resolver.multicall([setAddrData, setContenhashData]).send()
```

### Contract and multicoin addresses

[Specs](/rif/rns/specs/resolvers/#contract-address)

```
function setAddr(bytes32 node, address a) external;
```

Sets the RSK address associated with an RNS node.

```
function setAddr(bytes32 node, uint coinType, bytes memory a) public;
```

Sets the coin address associated with an RNS node.

```
function addr(bytes32 node) public view returns (address payable);
```

Returns the RSK address associated with an RNS node.

```
function addr(bytes32 node, uint coinType) public view returns(bytes memory);
```

Returns the address associated with an RNS node.


### Contenthash

[Specs](/rif/rns/specs/resolvers#contenthash)

```
function setContenthash(bytes32 node, bytes calldata hash) external;
```

Sets the contenthash associated with an RNS node.

```
function contenthash(bytes32 node) external view returns (bytes memory)
```

Returns the contenthash associated with an RNS node.


### Contract ABI

[Specs](/rif/rns/specs/resolvers#contract-abi)

```
function setABI(bytes32 node, uint256 contentType, bytes calldata data) external;
```

Sets the ABI associated with an ENS node. Nodes may have one ABI of each content type. To remove an ABI, set it to the empty string.

```
function ABI(bytes32 node, uint256 contentTypes) external view returns (uint256, bytes memory)
```

Returns the ABI associated with an RNS node.

### SECP256k1 public keys

[Specs](/rif/rns/specs/resolvers#secp256k1-public-keys)

```
function setPubkey(bytes32 node, bytes32 x, bytes32 y) external
```

Sets the SECP256k1 public key associated with an RNS node.

### Text records

[Specs](/rif/rns/specs/resolvers#text-records)

```
function pubkey(bytes32 node) external view returns (bytes32 x, bytes32 y)
```

Returns the SECP256k1 public key associated with an RNS node.

### Interface discovery

[Specs](/rif/rns/specs/resolvers#interface-discovery)

```
function setInterface(bytes32 node, bytes4 interfaceID, address implementer) external;
```

Sets an interface associated with a name. Setting the address to 0 restores the default behaviour of querying the contract at `addr()` for interface support.

```
function interfaceImplementer(bytes32 node, bytes4 interfaceID) external view returns (address);
```

Returns the address of a contract that implements the specified interface for this name. If an implementer has not been set for this interfaceID and name, the resolver will query the contract at `addr()`. If `addr()` is set, a contract exists at that address, and that contract implements EIP165 and returns `true` for the specified interfaceID, its address will be returned.
