
![2 way peg app (peg-out)](/assets/img/guides/two-way-peg-app/pegout.gif)

## Performing a peg-out transaction using Liquality

The [Liquality Wallet](/solutions/liquality/) is a browser extension for accessing Bitcoin, Rootstock, and Ethereum applications. 

​
**Step 1: Choose the RBTC - BTC conversion type**

![Select rbtc to btc conversion](/assets/img/guides/two-way-peg-app/select-rbtc-to-btc-conversion.png)
​
**Step 2: Connect your Liquality wallet**
​
![Click connect wallet](/assets/img/guides/two-way-peg-app/connect-wallet-btn.png)
![Select liquality wallet](/assets/img/guides/two-way-peg-app/select-liquality.png)
​
See how to unlock your wallet, if locked.
​
![Waiting wallet connection](/assets/img/guides/two-way-peg-app/unlock-liquality.png)
​
Then, click 'Confirm' to complete the first step.
​
![Confirm metamask wallet connection](/assets/img/guides/two-way-peg-app/confirm-liquality.png)
​
**Step 3: Enter the amount you want to send**

​
You can either enter it manually or click 'Use max available balance' if you want to convert all the rbtc you have.
​
![Rbtc amount to send input](/assets/img/guides/two-way-peg-app/amount-input.png)
​
**Step 4: Verify your Bitcoin destination address**

We don't support the Bitcoin destination address' derivation from Liquality yet, so you have to follow the documentation linked here:
​
![Can't derive destination address using liquality](/assets/img/guides/two-way-peg-app/cant-derive-liquality.png)
​
**Step 5: Send transaction**


Review the information, and click 'Send' in 2-way peg app and then click 'Confirm' in Liquality.
​
![Send pegout transaction](/assets/img/guides/two-way-peg-app/send-liquality.png)
![Confirm pegout transaction on liquality wallet](/assets/img/guides/two-way-peg-app/confirm-liquality.png)

​
The final screen will be like the one below.
![Btc is on its way](/assets/img/guides/two-way-peg-app/final-screen-liquality.png)

​
To see the status of a transaction, click on the *Go to status page* button, you will see a page  as shown below, with your pegout tx and your Bitcoin recipient address information as well.
​
![Transaction status for pegout id](/assets/img/guides/two-way-peg-app/tx-status.png)


This address should match the one you can access through Electrum. See [How to view a derived address](/guides/two-way-peg-app/advanced-operations#how-to-view-a-derived-address) and [How to check a transaction status](/guides/two-way-peg-app/getting-started#using-the-transaction-status-page).

## Resources
- 2 way peg app frontend [repo](https://github.com/rsksmart/2wp-app)
- 2 way peg app backend [repo](https://github.com/rsksmart/2wp-api)
- How to get [RBTC using RSK’s built in Powpeg](https://developers.rootstock.io/guides/get-crypto-on-rsk/powpeg-btc-rbtc/)
- [RSK Testnet Faucet](https://faucet.rootstock.io/)
- [Get RBTC using Exchanges](https://developers.rootstock.io/guides/get-crypto-on-rsk/rbtc-exchanges/)
- Application Architecture [Design architecture](/guides/two-way-peg-app/tech/design-architecture)