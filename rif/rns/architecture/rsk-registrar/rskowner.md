---
layout: rsk
title: RSK Owner
---

RSK MainNet: [0x45d3e4fb311982a06ba52359d44cb4f5980e0ef1](https://explorer.rsk.co/address/0x45d3e4fb311982a06ba52359d44cb4f5980e0ef1)

Owner of _rsk_ top level domain. It can `setSubdomainOwner` in RNS.

- It represents domain ownership implementing [ERC-721](https://eips.ethereum.org/EIPS/eip-721)<sup>1</sup> non-fungible token standard. This standard provides basic functionality to track and transfer NFTs<sup>2</sup>.
- Stores domains' expiration time. The expiration time determines whether a domain is owned or not.
- Determines if a domain is available to be purchased.
- Accepts domain ownership clamming from previous _rsk_ registrar.
- Grants access to other contracts for registering new domains (registrar role)<sup>2</sup>.
- Grants access to other contracts for renewing domains (renewer role)<sup>2</sup>.
- Allows to reclaim ownership in RNS of owned domains.
- It has an owner that can<sup>2</sup>
  - Change _rsk_ tld resolver and ttl.
  - Add/remove registrar contracts.
  - Add/remove renewer contracts.

## Implementation

RSK Owner is an [`Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/ownership/Ownable.sol) contract and represents domain labels ownership fully compatible with [ERC-721](https://eips.ethereum.org/EIPS/eip-721) interface using [OpenZeppelin's implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol).

The implementation is divided into two main parts: The public methods exposed by RSK Owner, and the restricted access methods to manage upgrades to the solution. The latter will not be described in this article.

### Public methods

- [`available`](#available)
- ERC-721
  - [`balanceOf`](#balanceof)
  - [`ownerOf`](#ownerof)
  - [`safeTransferFrom`](#safetransferfrom)
  - [`transferFrom`](#transferfrom)
  - [`approve`](#approve)
  - [`getApproved`](#getapproved)
  - [`setApprovalForAll`](#setapprovalforall)
  - [`isApprovedForAll`](#isapprovedforall)
  - [`safeTransferFrom`](#safetransferfrom)
- ERC-165
  - [`supportsInterface`](#supportsinterface)

> The term _domain label_ refers to the name that is added behind .rsk. For example, to register `'domain.rsk'` one should use `keccak256('domain')` for `tokenId` parameters.

#### `available`

```solidity
function available(uint256 tokenId) public view returns(bool);
```

Gets the owner of the specified domain.

- `tokenId` keccak256 of the domain label.

Returns domain owner.

#### `balanceOf`

```solidity
function balanceOf(address owner) public view returns (uint256 balance);
```

Gets the amount of domains owned by the specified address.

- `owner` address to query the balance of.

Returns the amount owned by the passed address.

#### `ownerOf`

```solidity
function ownerOf(uint256 tokenId) public view returns (address owner);
```

Gets the owner of the specified domain.

- `tokenId` keccak256 of the domain label to query the owner of.

Returns address currently marked as the owner of the given domain.

#### `transferFrom`

```solidity
function transferFrom(address from, address to, uint256 tokenId) public;
```

Transfers the ownership of a given token ID to another address.

Usage of this method is discouraged, use [safeTransferFrom](#safetransferfrom) whenever possible. Requires the `msg.sender` to be the owner, approved, or operator.

- `from` current owner of the domain.
- `to` address to receive the ownership of the given domain.
- `tokenId` keccak256 of the domain label to be transferred.

#### `approve`

```solidity
function approve(address to, uint256 tokenId) public;
```

Approves another address to transfer the given domain label.

The zero address indicates there is no approved address.
There can only be one approved address per token at a given time.
Can only be called by the token owner or an approved operator.

- `to` address to be approved for the given `tokenId`.
- `tokenId` keccak256 of the domain label to be approved.

#### `getApproved`

```solidity
function getApproved(uint256 tokenId) public view returns (address operator);
```

Gets the approved address for a domain, or zero if no address set.

- `tokenId` keccak256 of the domain label to query the approval of.

Returns currently approved for the given domain.

#### `setApprovalForAll`

```solidity
function setApprovalForAll(address operator, bool _approved) public;
```

Sets or unsets the approval of a given operator. An operator is allowed to transfer all tokens of the sender on their behalf.

- `to` operator address to set the approval.
- `approved` representing the status of the approval to be set.


#### `isApprovedForAll`

```solidity
function isApprovedForAll(address owner, address operator) public view returns (bool);
```

Tells whether an operator is approved by a given owner.

- `owner` owner address which you want to query the approval of.
- `operator` operator address which you want to query the approval of

Returns whether the given operator is approved by the given owner.

#### `safeTransferFrom`

```solidity
function safeTransferFrom(address from, address to, uint256 tokenId) public;
```

Safely transfers the ownership of a given domain to another address.

If the target address is a contract, it must implement [`onERC721Received`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721Receiver.sol), which is called upon a safe transfer, and return the magic value `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`; otherwise, the transfer is reverted.

Requires the `msg.sender` to be the owner, approved, or operator.

- `from` current owner of the domain.
- `to` address to receive the ownership of the given domain.
- `tokenId` keccak256 of the domain label to be transferred.

```solidity
function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public;
```

- `_data` bytes data to send along with a safe transfer check.

#### `supportsInterface`

```solidity
function supportsInterface(bytes4 interfaceId) external view returns (bool);
```

Returns true if this contract implements the interface defined by `interfaceId`, based on [ERC-165](https://eips.ethereum.org/EIPS/eip-165) standard for interface detection.

This function call costs less than 30 000 gas.

---

1. Strongly based on https://github.com/ensdomains/ethregistrar.
2. https://github.com/OpenZeppelin/openzeppelin-contracts implementation.
