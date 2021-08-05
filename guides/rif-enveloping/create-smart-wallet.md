---
layout: rsk
title: Creating a Smart Wallet
tags: rif, enveloping, rsk, gas station network, gsn, defi, develop
---

### Pre-Requisites

* Follow the system-setup guide.

## Ways to create smart wallets

There are **two ways** to create a Smart Wallet:

1. **Regular transaction:** The Requester (or another account on behalf of the Requester) calls the Proxy Factory asking to get a new Smart Wallet. Therefore the Proxy Factory creates a proxy to the SmartWallet code, delegating the ownership to the Requester.
2. **Sponsored:** It needs to go through the Enveloping process, which is described in detail below. The requester asks a third party to pay for the Smart Wallet deployment, and the requester pays in tokens for that (or free if it is subsidized by the third-party, a.k.a, Sponsor).


## Deploy a Smart Wallet

To deploy a smart wallet we need to do some steps to generate the wallet address,
fund it and finally deploy the smart wallet. Here we are going to show you how to do that.

1. Generate your smart wallet address. To do this you need to call the method `getSmartWalletAddress` on the
   `SmartWalletFactory` contract, it can be found in the enveloping repo under `src/cli/compiled/SmartWalletFactory.json`.
   You need to extract the abi from there and then use it to instantiate the contract with web3.
   Here is an example of how to do it:
   ```javascript
        import Web3 from "web3";

        const web3 = new Web3(<RSK_NODE_ENDPOINT>);

        const smartWalletAddress = await new web3.eth.Contract(
            <SMART_WALLET_FACTORY_ABI>,
            <SMART_WALLET_FACTORY_ADDRESS>
        ).methods.getSmartWalletAddress(
            <RSK_ACCOUNT_ADDRESS>,
            <SMART_WALLET_RECOVERER>,
            <SMART_WALLET_INDEX>
        ).call();
   ```
   Where variables are:

   * **RSK_NODE_ENDPOINT**: the RSK node endpoint where is running (ex: http://localhost:4444).
   * **SMART_WALLET_FACTORY_ABI**: the smart wallet factory contract abi json to use.
   * **SMART_WALLET_FACTORY_ADDRESS**: the deployed smart wallet factory contract address.
   * **RSK_ACCOUNT_ADDRESS**: the rsk address that will own the smart wallet.
   * **SMART_WALLET_RECOVERER**: the rsk address that will be the recoverer account, in case the owner account is lost.
   * **SMART_WALLET_INDEX**: a wallet index, since we can have more than just one smart wallet per RSK address
   you can specify the index of the wallet.

2 (Optional). Now if you want, you can prefund this new address that will represent your smart wallet. To do that you can go
to any wallet and send some tokens to that address. Also you can use web3 if you are working on regtest, here an
   example:
   ```javascript
      import Web3 from "web3";

      const web3 = new Web3(<RSK_NODE_ENDPOINT>);

      const token = await new this.web3.eth.Contract(
        <ERC20_TOKEN_ABI>,
        <TOKEN_ADDRESS>
      );
     const accounts = await this.web3.eth.getAccounts();
     await token.methods.transfer(<SMART_WALLET_ADDRESS>, this.web3.utils.toWei(<AMOUNT_OF_TOKENS>, "ether"))
          .send({ from: accounts[0] });
   ```
   Where variables are:

   * **RSK_NODE_ENDPOINT**: the RSK node endpoint where is running (ex: http://localhost:4444).
   * **ERC20_TOKEN_ABI**: the ERC20 token contract abi to use.
   * **TOKEN_ADDRESS**: the token contract address.
   * **SMART_WALLET_ADDRESS**: the generated address of last step.
   * **AMOUNT_OF_TOKENS**: string containing the amount of tokens in decimal unit.

   **NOTE: in this example we asume that the `account[0]` of regtest has tokens to use.**

3. Finally you need to deploy your smart wallet, to do so you must follow these steps:

   1. Use the provider from enveloping to that you have an example here:
   ```javascript

      import { RelayProvider, resolveConfiguration } from "@rsksmart/enveloping";
      import Web3 from "web3";

      const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

      const web3 = new Web3(<RSK_NODE_ENDPOINT>);

      const config = await resolveConfiguration(web3.currentProvider,
      {
        verbose: window.location.href.includes("verbose"),
        onlyPreferredRelays: true,
        preferredRelays: ["http://localhost:8090"],
        factory: <SMART_WALLET_FACTORY_CONTRACT_ADDRESS>,
        gasPriceFactorPercent: 0,
        relayLookupWindowBlocks: 1e5,
        chainId: 33,
        relayVerifierAddress: <RELAY_VERIFIER_CONTRACT_ADDRESS>,
        deployVerifierAddress: <DEPLOY_VERIFIER_CONTRACT_ADDRESS>,
        smartWalletFactoryAddress: <SMART_WALLET_FACTORY_CONTRACT_ADDRESS>
      });
      resolvedConfig.relayHubAddress = <RELAY_HUB_CONTRACT_ADDRESS>;

      const provider = new RelayProvider(web3.currentProvider, config);

      provider.addAccount({
         address: <RSK_ACCOUNT_ADDRESS>,
         privateKey: Buffer.from(<RSK_ACCOUNT_PRIVATE_KEY>.replaceAll("0x", ""), "hex")
      });

      web3.setProvider(provider);

      const transaction = await provider.deploySmartWallet({
        from: <RSK_ACCOUNT_ADDRESS>,
        to: ZERO_ADDRESS,
        gas: "0x27100",
        value: "0",
        callVerifier: <DEPLOY_VERIFIER_CONTRACT_ADDRESS>,
        callForwarder: <SMART_WALLET_FACTORY_CONTRACT_ADDRESS>,
        tokenContract: <TOKEN_ADDRESS>,
        tokenAmount: <TOKEN_AMOUNT>,
        data: "0x",
        index: <SMART_WALLET_INDEX>,
        recoverer: <SMART_WALLET_RECOVERER>,
        isSmartWalletDeploy: true,
        onlyPreferredRelays: true,
        smartWalletAddress: <SMART_WALLET_ADDRESS>,
      });
   ```

   Where variables are:

   * **RSK_NODE_ENDPOINT**: the RSK node enpoint where is running (ex: http://localhost:4444).
   * **SMART_WALLET_FACTORY_CONTRACT_ADDRESS**: the deployed smart wallet factory contract address.
   * **RELAY_VERIFIER_CONTRACT_ADDRESS**: the deployed relay verifier contract address.
   * **DEPLOY_VERIFIER_CONTRACT_ADDRESS**: the deployed deploy verifier contract address.
   * **RELAY_HUB_CONTRACT_ADDRESS**: the deployed relay hub contract address.
   * **RSK_ACCOUNT_ADDRESS**: the RSK account address.
   * **RSK_ACCOUNT_PRIVATE_KEY**: the RSK account private key string.
   * **TOKEN_ADDRESS**: the token address.
   * **TOKEN_AMOUNT**: string containing the amount of tokens in decimal unit. This amount should be lower
     or equal to the amount of tokens that you transferred to the smart wallet account. If you didn't, just set `0` here.
   * **SMART_WALLET_INDEX**: a wallet index, since we can have more than just one smart wallet per RSK address
   * **SMART_WALLET_RECOVERER**: the rsk address that will be the recoverer account, in case the owner account is lost.
   * **SMART_WALLET_ADDRESS**: the address generated on the first step.

After following all these steps you should be able to have a deployed smart wallet with tokens ready to be used.

