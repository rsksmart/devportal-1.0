---
layout: rsk
title: RBank
# menu_order: 300
tags: knowledgebase, rsk, rif , rbank, open-finance, tools, building blocks
description: "RBank: A lending solution on RSK, based on the Compound money market protocol"
---

## Introduction

RBank is a lending solution on the RSK network. It uses the money market protocol introduced on Compound whitepaper in order to establish money markets, with an algorithmic interest rate based on the supply balance and demand on the platform.

## Setup

To use the application, we are going to need the following:

1. An internet browser extension wallet. Read [Compatible wallets](https://developers.rsk.co/rif/rns/guide/setup/#compatible-wallets) on how to get a compatible wallet, or read the guide to connect [Metamask wallet](https://developers.rsk.co/rif/rns/guide/setup/#connect-metamask-wallet-to-rsk) to RSK.
2. RBTC to pay for the transaction cost. See [Getting RBTC](https://developers.rsk.co/rif/rns/guide/setup/#getting-rbtc).
3. Get an ERC20 based token set, at least 2 ([Know more about ERC20 tokens](https://eips.ethereum.org/EIPS/eip-20)). You don't need to be the owner of them but should have the contracts addresses.

## Getting Started

### As Administrator - RBank

#### Deploy a Controller contract

All the activities performed on RBank pass through a smart contract named Controller, which is in charge of the administration of the operation between markets and evaluates operations viability.

The library - RBank-js allows to deploy a Controller in a web browser with a wallet such as Metamask, making a single transaction through the create method of the Controller class:

```javascript
import RBank from '@rsksmart/rbank';
const rbank = new RBank();

rbank.Controller.create()
  .then((controllerAddress) => {
    rbank.controller = controllerAddress;
  })
  .catch(console.error);
```

The deployed address of the controller will be unique per instance of RBank, therefore it must be stored and the account must be kept in mind since it will be the owner of the platform, that is, the only account with administrative privileges on the platform.

#### Creating a market

To create a market, you must enter the RBank platform using the owner's account, that is, who deployed the Controller contract in the previous step. If the platform is new, you will see the option to create a new market to the right.

The creation form requires that you enter the address of the token with which you are going to trade in this market, the price that it has at this time is the general currency of the platform (USD or a stablecoin), and the annual percentage rate on this market (APR).

![RBank - Admin Dashboard](/assets/img/kb/rbank/AdminDashboard.jpg)

The creation operation requires approval of 4 transactions by the owner account: The creation of the Market contract, the registration of that contract in the Controller, the registration of the Controller in the Market and the initial price assignment.

### As a user

#### Dashboard

As a user, when you access the platform, you will be able to see the dashboard that indicates the activity of your account on the platform.

![RBank - Investment Dashboard](/assets/img/kb/rbank/InvestmentDashboard.jpg)

#### Health factor

The health factor represents the health of the loans of an account, due to the nature of the loans in RBank, only the tokens deposited in the platform serve as collateral at the time of requesting a loan. Tokens, like cryptocurrencies, have price fluctuations. For this reason, the token price at time A may be different at time B. The health factor shows how well backed the loans are based on the current price of the deposited tokens.
The moment this health factor reaches 0%, it means that the money deposited in tokens to RBank does not compensate for the current value of your debt, so that collateral will be taken to pay the current debt.

## Operations

### Supply

The supply operation deposits a quantity of tokens that an account owns (related in Metamask). When entering the Supply / Borrow tab, you can see the list of markets that are created in RBank. To start, click on one of the markets in which you want to deposit money.

![RBank - Supply](/assets/img/kb/rbank/Supply1.jpg)

Once you are in the supply view you must enter the amount of tokens you want to deposit in this market. You must bear in mind that the operation will be valid only if you have in your account (related to the wallet) that amount of tokens that you are relating in the form.

![RBank - Supply2](/assets/img/kb/rbank/Supply2.jpg)

Once you have the desired amount written in the form, click on the "Supply tokens" button, this will ask for confirmation of two transactions with your account. The first transaction will request your approval of the use of these tokens in RBank, and the second is the supply transaction in the market.

![RBank - AwaitingApproval](/assets/img/kb/rbank/AwaitingApproval.jpg)

When the transactions have been confirmed you will be able to see what your current balance is in RBank, showing  the balance of your wallet, the balance of the tokens in RBank and the loan limit available for your account in RBank.


![RBank - Success](/assets/img/kb/rbank/Success.jpg)

This sequence diagram shows how communication with RBank contracts occurs through the dApp. It should be noticed that the user must approve 2 transactions, one with the contract that manages the token he owns, and the second with the RBank Market contract, this one performs an operation called "transferFrom" that transfers funds to RBank and requires that the user has previously approved the use of that amount to RBank.

![RBank - Supplier](/assets/img/kb/rbank/Supplier.jpg)

### Borrow

Borrow operation requests tokens borrowed in some RBank market. To start, you select Borrow on the toggle button. Then select the market you want to borrow from.

![RBank - Borrow](/assets/img/kb/rbank/Borrow.jpg)

Once the market is selected you will be able to see what is the money available in the market and also the limit you have to borrow, based on the amount of tokens you have deposited before.

![RBank - Borrow2](/assets/img/kb/rbank/Borrow2.jpg)

Once you have entered a valid amount, click on the "Borrow Tokens" button. This operation will cause confirmation to be requested in the browser's wallet (Metamask, Liquality or Nifty), once confirmed we wait for its validation on the network. This should take approximately 4 minutes.

> Note: The Nifty browser wallet has been discontinued. See the [Nifty Wallet)](https://developers.rsk.co/wallet/use/nifty) page for more information.

![RBank - AwaitingTransactionApprovalForBorrow](/assets/img/kb/rbank/AwaitTransBorrow.jpg)

When the network confirms the transaction, you can see the updated balance of your account in RBank.

![RBank - BorrowSuccess](/assets/img/kb/rbank/BorrowSuccess.jpg)

This sequence diagram shows how communication with RBank contracts happens through the dApp. This operation performs several verifications, including checks for market funds and user liquidity. Remember that these tokens are received directly in the user's wallet.

![RBank - BorrowUser](/assets/img/kb/rbank/BorrowUser.jpg)

### Withdraw

This is the reverse operation to Supply. The objective is to withdraw the tokens that you have deposited in RBank . To do this, you must enter the Supply / Borrow view and select the market where you have your tokens available to withdraw.

![RBank - Supply-Withdraw](/assets/img/kb/rbank/Supply1.jpg)

Within this market, select the withdrawal form at the top of the dialog. Here, you will be able to see the amounts allowed to withdraw based on the current balance entered in the platform and what you have borrowed in the past.

![RBank - Withdraw](/assets/img/kb/rbank/Withdraw.jpg)

Once you have entered a valid amount to withdraw, click on the "Withdraw my tokens" button. This will ask you to confirm a transaction that generates the withdrawal of your tokens from the smart contract.

![RBank - AwaitingApproval-Withdraw](/assets/img/kb/rbank/AwaitingApprovalWithdraw.jpg)

When you have confirmed the transaction we wait for confirmation from the network, which may take up to 90 seconds. You will then see your updated RBank balance and you will have the tokens that you have withdrawn, available in your wallet.

![RBank - WithdrawSuccess](/assets/img/kb/rbank/Withdraw-Success.jpg)

![RBank - SupplierUser2](/assets/img/kb/rbank/Withdraw-SupplierUser2.jpg)

This sequence diagram shows how all the smart contracts interact with RBank dApp. The redeem operation consists of transferring some amount of tokens from a market to the users account, to perform this operation there are some verifications needed such as, checking the market balance, and the liquidity of the user. It is important to mention that these tokens are transferred to the personal account of the user, and can be verified on the user's wallet.

### Repay

The repay operation is where you can make the payment of a previously requested loan. To do this, you must enter the market where you have the debt and select the "Repay" button at the top of the dialog.

![RBank - Repay](/assets/img/kb/rbank/Repay.jpg)

Once you have entered a valid amount, taking into account the available tokens in your wallet account (Metamask) and your current debt in that market, click on the lower button "Repay tokens".

![RBank - Repay2](/assets/img/kb/rbank/Repay2.jpg)

The Repay operation as well as supply will ask you to confirm two transactions. The first transaction will request your approval of the use of those tokens in RBank, and the second is the repay transaction in the market.

![RBank - AwaitingRepayTrans](/assets/img/kb/rbank/AwaitRepayTrans.jpg)

Once the transactions are confirmed, we will wait for the confirmation from the network, which may take up to 60 seconds. At that time we can view the summary of the transaction and the balance of your account updated in RBank.

![RBank - RepaySuccess](/assets/img/kb/rbank/Repay-Success.jpg)

This sequence diagram shows how communication with RBank contracts happens through the dApp. This operation consists of two approvals by the user like the supply operation, the first one communicates directly with the contract that manages the token that the user owns in order to approve the use of an amount in RBank. After the “payBorrow” operation is performed in the Market contract, that transfers the funds to the market and updates the balance in RBank.

![RBank - RepayUser](/assets/img/kb/rbank/RepayUser.jpg)

### Liquidate

A settlement is a way of buying the debt that another RBank user has. This purchase consists of paying the debt in tokens of an RBank user whose health factor has fallen to 0% and obtaining in exchange their collateral deposited. As an example we have Alice and Bob situation:

- Alice made supply of 100 TK1 (1 TK1 = 10 $), Alice's health Factor 100% (t0 in the diagram below)
- Alice applied for a loan of TK2 25 (1 TK2 = $ 20) Alice's health factor 22.43% (t1 in the diagram below).
- Gradually a change occurs in the price of token 1. Now it costs less. (1 TK1 = $ 6 ).
- Because Alice borrowed up to her limit, the health of her account (Health factor) is quite dependent on the price of TK1 which is Alice's collateral. Since her collateral does not cost the same, Alice's health factor drops to 0%  (t2 in the diagram below).
- At this moment Alice's collateral (100 TK1) goes into liquidation, that is, another RBank user will be able to buy that collateral, if she pays the 25 TK2 that represents her debt.
- Bob has TK2 in his account, enough to buy Alice's debt. Once Bob agrees, he will pay 25 TK2 and in return 100 TK1 will be delivered directly to his account. Alice no longer has TK1 in her account and neither an active debt, so her health returns to 100%.

![RBank - LiquidateAliceBalance](/assets/img/kb/rbank/LiquidateAliceBal.jpg)

To liquidate you must access the supply / borrow view and select the market which you want to liquidate tokens in the Supply tab.

![RBank - LiquidateSupply](/assets/img/kb/rbank/Supply1.jpg)

In the dialog you must click on the "Liquidate" tab.

After waiting a moment, the market accounts that are available to liquidate the token will appear, in the list you will be able to see the available tokens to liquidate a specific account.

![RBank - Liquidate](/assets/img/kb/rbank/Liquidate.jpg)

You can choose any, the difference is the token with which you must pay. For the example of Alice and Bob, the debt was in TK2, but it may be another of the tokens available in the active markets of RBank.

When you select an account, the dialog shows you a field for you to write the amount of tokens you want to liquidate, and from that amount you will know how much you must pay in the token that is owed. The image shows an account that has 1000000 TK1 available to liquidate, when entering 1000 TK1 to settle you will have to pay 250 TK4.

![RBank - AvailableToLiquidate](/assets/img/kb/rbank/AvailableToLiquidate.jpg)

When you accept the operation, you must confirm two transactions. The first transaction will request your approval of the use of these tokens in RBank, and the second is the Liquidate transaction in the collateral market.

![RBank - AwaitTransApprovalLiquidate](/assets/img/kb/rbank/AwaitTransApprovalLiquidate.jpg)

When both transactions have been confirmed, RBank will show a summary of the operation with the new balance in your wallet and your balance in the RBank account.

![RBank - LiquidateSuccess](/assets/img/kb/rbank/LiquidateSuccess.jpg)

This sequence diagram shows how communication with RBank contracts happens through the dApp. This operation is a little more complex due to the number of contracts with which it interacts, but it can be understood as a sum of the operation “Repay” and “withdraw”, the difference is that they are performed in different market contracts. Repay is executed in the market where the debt is active and Withdraw in the market where the collateral to be liquidated is located. Upon completion of the operation, the values of both markets are updated for the accounts involved and the liquidated tokens are found in the liquidator user's wallet.

![RBank - LiquidateUser](/assets/img/kb/rbank/LiquidateUser.jpg)

## Advanced operations

### Market creation

If you are the administrator of RBank, you can create markets, by relating a token that complies with the ERC20 standard to a new contract in RBank of the Market type. To do this, you must log in with the administrator account in your browser wallet (Metamask) and RBank will show you the administration view with the current markets. Click on "Add new market" at the top right.

![RBank - AdvancedAdminDashboard](/assets/img/kb/rbank/AdvancedAdminDashboard.jpg)

In the dialog as shown, you must fill out the address of the contract that complies with the ERC20 standard, the current price of 1 unit of that Token in USD and the APR rate of loans in the market to create.

![RBank - CreateNewMarket](/assets/img/kb/rbank/CreateNewMarket.jpg)

As additional fields are the number of blocks per year that the network mines, this value only changes according to the network where RBank is working, in the case of RSK the value is 1000000 blocks per year.

![RBank - CreateNewMarket2](/assets/img/kb/rbank/CreateNewMarket2.jpg)

Once you have the valid information entered, click on the next button, which will execute  three transactions, the first is the deployment of a new market contract, the second will relate the new market in the controlling contract and the third will relate in the market contract, controller address.

![RBank - AwaitingTransApprovalAdvanced](/assets/img/kb/rbank/AwaitTransApprovalAdvanced.jpg)

At the end of the confirmations, RBank will show the address of the contract displayed with the summary of the created market.

![RBank - AdvancedSuccess](/assets/img/kb/rbank/AdvancedSuccess.jpg)

### Update market token price

As an RBank administrator you will be able to access a market performance view. In this view you can observe the market activity in terms of the amount of money available in the market and the money borrowed. You can also change the market price by clicking on the "Modify Market Price" button.

![RBank - UpdateTokenPrice](/assets/img/kb/rbank/UpdateTokenPrice.jpg)

On the next view enter the new value for the price of 1 token of this market in USD and click on "Modify market Price".

![RBank - InputNewPrice](/assets/img/kb/rbank/InputNewPrice.jpg)

You must confirm the transaction in your wallet.

![RBank - CheckTransaction](/assets/img/kb/rbank/CheckTransaction.jpg)

When the transaction has been confirmed on the network, RBank will show you the summary of the transaction with the new market price.

![RBank - ChangePriceSuccess](/assets/img/kb/rbank/ChangePriceSuccess.jpg)

## Reference Docs

- [DeFi Protocol](https://github.com/ajlopez/DeFiProt)
- [Building A DeFi Application](https://angeljavalopez.medium.com/building-a-defi-application-e8f42f8263fa)
- [rbank-js source code](https://github.com/rsksmart/rbank-js)
- [rbank source code](https://github.com/rsksmart/rbank)
