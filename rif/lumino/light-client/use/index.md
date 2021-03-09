---
layout: rsk
title: Light Client SDK Tutorial
tags: lumino, client, rif
description: "How to use the RIF Lumino Light Client SDK"
---

This document provides a step by step guide to integrate the RIF Lumino light client sdk into a web or mobile dApp. 
For more information, please take a look at the Readme indications at [https://github.com/rsksmart/lumino-light-client-sdk](https://github.com/rsksmart/lumino-light-client-sdk)


1. **Include the library into your dApp**

    *Yarn*

    ```
    yarn add @rsksmart/lumino-light-client-sdk
    ```

    *NPM*

    ```
    npm install --save @rsksmart/lumino-light-client-sdk
    ```

2. **Initialization**

    To start using the SDK, you must first configure the Lumino object. This object is our main interface to interact with the SDK. Lumino must be initialized before being used, invoking the init function:

    ```
    // 1. Import Lumino, the LocalStorageHandler for data persistence and the default SigningHandler for message signing.
    
    import {
    Lumino,
    LocalStorageHandler,
    SigningHandler,
    } from "@rsksmart/lumino-light-client-sdk";

    // 2. Set the environment parameters 

    const address = process.env.REACT_APP_ADDRESS;
    const chainId = process.env.REACT_APP_CHAIN_ID;
    const PrivateKey = process.env.REACT_APP_PRIVATE_KEY;
    const rskEndpoint = process.env.REACT_APP_RSK_ENDPOINT;
    const hubEndpoint = process.env.REACT_APP_HUB_ENDPOINT;
    const notifierEndPoint = process.env.REACT_APP_RIF_NOTIFIER_ENDPOINT;
    


    const configParams = {
    chainId,
    rskEndpoint,
    hubEndpoint,
    Address,
    notifierEndPoint 
    };
    
    // 3. Create a web3 instance, pointing to your rsk endpoint     
    const web3 = new Web3(rskEndpoint);
    // 4. Create a signing handler and initialize it.
    // NOTE: Read below for info about this Handler
    const signingHandler = SigningHandler();
    signingHandler.init(web3, PrivateKey);
    // 5. Initialise the Lumino singleton instance. Note that this requires to be called inside an async function.
    await Lumino.init(signingHandler, LocalStorageHandler, configParams);
    ```

    NOTE about the SigningHandler: This method requires the PrivateKey since we instantiate everything with web3 and ethers.js to sign Smart Contract transactions and Off Chain Messages, it is not compulsory to use it.

    We advise only using it when testing in a secure environment, but in any case you may provide your own signing functions instead of using the handler.

    The idea is passing an object with 2 functions instead of the signingHandler to Lumino.init(), these functions receive 1 parameter each

    ```
    const myHandler = { 
        sign:(tx) => signTransction(tx),
        offChainSign: (byteMessage) => signByteMessage(byteMessage),
    }
    ```

    These functions may return promises, the SDK will wait until they resolve before signing a transaction.

    The byteMessage is a uint8array, so the offChainSign must be able to perform a signature of this data type.

    The sign function will manage simple web3 transactions.

3. **Make the onboarding**

    In order to start using the Lumino light client, you need to make an onboarding into a Lumino HUB node. 

    First, define an async function that invokes the onboarding primitive:

    ```
    onboarding = async () => {
        await Lumino.get().actions.onboardingClient();
    };
    ```

    Then you can use this function on a button action, for example. After that, your client is able to start interacting with the Lumino HUB

4. **Open a channel**

    ```
    const params = {
      Partner: “0x1234...”,
      settleTimeout: 500,
      tokenAddress: “0x1234...”,
    };
    await Lumino.get().actions.openChannel(params);
    ```

    The open channel function will fire and when the process is successful, a callback will be fired if specified (see the readme on Callbacks for more information on this topic). A channel structure will be added to the SDK state machine.

    You just need to specify the partner node (a lumino node) address and the token in which you want to create the channel. 

5. **Deposit**

    After a channel was created, you need to make an on-chain deposit in order to start making payments

    ```
     deposit = async () => {
        const theAmount =100000000 //amount in wei
        const paramsDeposit = {
            “0x123...”, //tokenAddress
            tokenNetworkAddress: “0x123”, // available in the channel data 
            amount: theAmount,
            1, //channel identifier
            “0x.123...”, // partner address
        };
        await Lumino.get().actions.createDeposit(paramsDeposit);
    };
    ```

6. **Make a payment**

    Now that the channel has funds, you can make a payment to your partner. 

    ```
    pay = async () => {
        const amountInWei = “1000000000000”; //amount on wei as a string
        const body = {
            partner: “0x123….”,
            token_address: “0x145….”,
            amount: amountInWei,
        };
        await Lumino.get().actions.createPayment(body);
    };
    ```

7. **Receive a payment**

    Receiving a payment is automatic, as long as the client is polling messages from the Lumino HUB, the payment will be processed and two callbacks will be fired

    * When a payment is received: A callback will be fired
    * When the payment is completed: A callback will also be fired


    Callbacks are explained on the next section

8. **Configuring callbacks**

    All the operations previously described perform operations on background, but you may want to display success or error messages into your dapp after the operation finalises. For that, there are different callbacks.

    Callbacks are set on the Lumino instance like this:

    ```
    Lumino.callbacks.set.setNameOfCallback;
    ```

    The callbacks.set method sets a function that may or may not receive the data regarding the event, the next table illustrates the callbacks, when they are fired and the data they provide (Which is always a single object or nothing)

    We recommend creating a callbacks.js file that encapsulates all the callbacks. For example:

    ```
    // // Set callbacks
    import { Lumino } from "@rsksmart/lumino-light-client-sdk";

    const setCallbacks = () => {
    Lumino.callbacks.set.setOnCompletedPaymentCallback((payment) => {
        console.log(¨payment completed¨)   
    });

    Lumino.callbacks.set.setOnReceivedPaymentCallback(({ payment }) =>
        console.log(“receiving payment”)
    );

    Lumino.callbacks.set.setOnOpenChannelCallback((channel) => {
        console.log(“channel opened”)
    });

    Lumino.callbacks.set.setOnChannelDepositCallback((channel) => {
        console.log(“deposit made”  });
    });
    Lumino.callbacks.set.setOnRequestClientOnboarding((address) =>
        console.log(“onboarding requested”)
    );
    Lumino.callbacks.set.setOnClientOnboardingSuccess((address) =>
        console.log(“onboarding succeed”)  
    );
    };

    export default setCallbacks;
    ```

    Then you can perform custom actions on each callback function body.

9. **Configuring RIF Notifier**

    In order to be notified when a channel with the light client was opened by a partner, the dApp must be integrated with the RIF Notifier. For more information please take a look at:

    * [https://github.com/rsksmart/lumino-light-client-sdk#notifier](https://github.com/rsksmart/lumino-light-client-sdk#notifier)
    * [https://github.com/rsksmart/rif-notifier](https://github.com/rsksmart/rif-notifier)

    Having a RIF Notifier up and running, the dApp must register to that notifier instance and subscribe to open channel events. 

    ```
    subscribeToNotifier = async() =>{
        await Lumino.get().actions.notifierRegistration();
        await Lumino.get().actions.subscribeToOpenChannel()
    };
    ```