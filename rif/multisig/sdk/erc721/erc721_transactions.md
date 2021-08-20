---
layout: rsk
title: RIF Multisig SDK - ERC721 Transactions
description: follow these steps to send erc721 tokens through multisig transactions
tags: rif, gnosis, multisig, erc721
render_features: 'collapsible'
prevUrl: '/rif/multisig/sdk/erc721/receive_erc721/'
nextUrl: '/rif/multisig/sdk/listing/'
---

## ERC721 Transactions

The [@rsksmart/safe-transactions-sdk](https://github.com/rsksmart/safe-transactions-sdk) package facilitates the creation of ERC721 transactions.

The `ERC721TransactionBuilder` provides a set of methods related to [ERC721](https://eips.ethereum.org/EIPS/eip-721) transactions.

[](#top "collapsible")
- Initialize the ERC721TransactionBuilder.
  * **Parameters**
    - `safe: Safe` - a [Safe instance](https://github.com/gnosis/safe-core-sdk/blob/main/packages/safe-core-sdk/src/Safe.ts)
    - `ERC721Token: Contract` - an [ethers.js Contract](https://docs.ethers.io/v5/api/contract/contract/) representing the ERC721 token
  {:.snippet__parameters.snippet__parameters--lightgreen.border-bottom-0}

  ```ts
  import { ERC721TransactionBuilder } from "@rsksmart/safe-transactions-sdk";

  const erc721TransactionBuilder = ERC721TransactionBuilder.create(
    safe,
    ERC721Token
  );
  ```
  {:.snippet__code.snippet__code--lightgreen.border-top-0}

- TransferFrom transaction
  * **Parameters**
    - `from: string` - the address `from` which transfers the token identified by `tokenId`
    - `to: string` - the address will receive the token identified by `tokenId`
    - `tokenId: BigNumber` - the id of the token will be transferred to address `to`
  {:.snippet__parameters.snippet__parameters--lightgreen.border-bottom-0}

  ```ts
  const safeTransaction = await erc721TransactionBuilder.transferFrom(
    from,
    to,
    tokenId
  );
  ```
  {:.snippet__code.snippet__code--lightgreen.border-top-0}

  > **IMPORTANT**: Only the current owner, an authorized operator, or the approved address can call this method, see [ERC721](https://eips.ethereum.org/EIPS/eip-721)
  {:.mt-3}

- SafeTransferFrom transactions
  * The `safeTransferFrom` methods perform the same operation performed by `transferFrom` and additionally, if the receiver is a contract address, they check if the contract address implements the interface `ERC721TokenReceiver` and it returns the value `0x150b7a02`, obtained from `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`. For further info, see [ERC721](https://eips.ethereum.org/EIPS/eip-721)

  ```solidity
  interface ERC721TokenReceiver {
      function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes _data) external returns(bytes4);
  }
  ```

  > **IMPORTANT**: Only the current owner, an authorized operator, or the approved address can call this method, see [ERC721](https://eips.ethereum.org/EIPS/eip-721)

  * **Parameters**
    - `from: string` - the address `from` which transfers the token identified by `tokenId`
    - `to: string` - the address will receive the token identified by `tokenId`
    - `tokenId: BigNumber` - the id of the token will be transferred to address `to`
    - `data: string` - Optional, the data that will be sent to the receiver with the `onERC721Received` call.
  {:.snippet__parameters.snippet__parameters--lightgreen.border-bottom-0}

  ```ts
  await erc721TransactionBuilder.safeTransferFrom(
    from,
    to,
    tokenId
  );
  ```
  {:.snippet__code.snippet__code--lightgreen.border-top-0}

  It can be called with the optional `data` parameter that will be sent to the receiver with the `onERC721Received` call.

  ```ts
  await erc721TransactionBuilder.safeTransferFrom(
    from, 
    to,
    tokenId
    data
  )
  ```
  {:.snippet__code.snippet__code--lightgreen}

- Approve transaction
  * Parameters:
    - `approved: string` - the address allowed to execute transfer operations on behalf of the owner
    - `tokenId: BigNumber` - the id of the token
  {:.snippet__parameters.snippet__parameters--lightgreen.border-bottom-0}

  ```ts
  await erc721TransactionBuilder.approve(approved, tokenId);
  ```
  {:.snippet__code.snippet__code--lightgreen.border-top-0}

  > **IMPORTANT**: See [ERC721 approval method](https://eips.ethereum.org/EIPS/eip-721)
  {:.mt-3}

- SetApprovalForAll Transaction
  * It sets or unsets approval for a specific operator, that allows the operator to perform transfer operations on behalf of the owner.

  * **Parameters**
    - `operator: string` - the address allowed/forbidden to execute transfer operations on behalf of the owner's tokens
    - `approved: boolean` - set to `true` to allow the operator to execute the operations on behalf of the owner, can be set to `false` to disallow the approval.
  {:.snippet__parameters.snippet__parameters--lightgreen.border-bottom-0}

  ```ts
  await erc721TransactionBuilder.setApprovalForAll(
    operator,
    approved
  )
  ```
  {:.snippet__code.snippet__code--lightgreen.border-top-0}

  > **IMPORTANT**: See [ERC721 setApprovalForAll method](https://eips.ethereum.org/EIPS/eip-721)
  {:.mt-3}
