![2 way peg app (peg-out)](/assets/img/guides/two-way-peg-app/pegout.gif)

## Performing a peg-out transaction using rLogin(Trezor and Ledger)

​> - Note that we will be using the 2 way peg app on [2 way peg app - Testnet](https://2wp-app.testnet.rsk.co/) for learning purposes.
> - For transactions using **real tokens**, use the [2 way peg app - Mainnet](https://2wp-app.rsk.co/) application.
> - We're using Ledger Nano and Trezor One hardware wallets on this tutorial.
> - For how to perform a peg-in transaction using hardware wallets. See [Getting started using hardware wallets](/guides/two-way-peg-app/getting-started#using-hardware-wallets).
> - To use Ledger hardware wallet to create a **peg-in** see [How to perform a peg-in transaction using Ledger](/guides/two-way-peg-app/getting-started#performing-a-peg-in-transaction-with-ledger)
> - To use Trezor hardware wallet to create a **peg-in** see [How to perform a peg-in transaction using Ledger](/guides/two-way-peg-app/getting-started#trezor-hardware-wallet)


### Get started with Trezor

To perform a peg-out transaction using the Ledger device directly, follow the steps below:

Step 1: Plug the Ledger device into the computer

Step 2: Access **peg-out** screen:
![pegout screen](/assets/img/guides/two-way-peg-app/using-hd-wallets/acessing-pegout-screen.png)

Step 3: Click on **Connect wallet** button
![connect-wallet](/assets/img/guides/two-way-peg-app/using-hd-wallets/connect-wallet.png)

Step 4: Click on **Trezor** button<br/>
![connect-wallet](/assets/img/guides/two-way-peg-app/using-hd-wallets/trezor.png)

Step 5: The application will show what network you are connecting on. For this tutorial we are using **Testnet** <br/>
![network](/assets/img/guides/two-way-peg-app/using-hd-wallets/network.png)

Step 6: Plugin your Trezor device:<br/>
![plugin](/assets/img/guides/two-way-peg-app/using-hd-wallets/plugin.png)
Step 7: The trezor window will open to insert the pin and export the addresses
![pin-and-address](/assets/img/guides/two-way-peg-app/using-hd-wallets/pin-and-address.png)
Step 8: Insert the pin and click on confirm button
![insert-confirm](/assets/img/guides/two-way-peg-app/using-hd-wallets/insert-confirm.png)
Step 9: Insert the passphrase
![insert-passphrase](/assets/img/guides/two-way-peg-app/using-hd-wallets/pass.png)
Step 10: Follow instructions on your device <br/>
![verify-device](/assets/img/guides/two-way-peg-app/using-hd-wallets/follow-device.png)

​> - Note the trezor app screen will be opened some times, because the system will ask for addresses, each ask will open again the trezor screen, and the user will need to inform the [trezor-pin](/assets/img/guides/two-way-peg-app/using-hd-wallets/pass.png).

Step 11: Select account <br/>
![select-account](/assets/img/guides/two-way-peg-app/using-hd-wallets/trezor-select-account.png)

Step 12: Success
![success](/assets/img/guides/two-way-peg-app/using-hd-wallets/trezor-sucess.png)

Step 13: Continue filling in the other fields as amount and click on the Send button

Step 14: After finish the pegout transaction creation, click here to see how to see the steps to access to Bitcoin derived address in hardware wallet using [Electrum](/guides/two-way-peg-app/advanced-operations/#electrum-hardware-wallets)

--- 

## Resources
- 2 way peg app frontend [repo](https://github.com/rsksmart/2wp-app)
- 2 way peg app backend [repo](https://github.com/rsksmart/2wp-api)
- How to get [RBTC using RSK’s built in Powpeg](https://developers.rootstock.io/guides/get-crypto-on-rsk/powpeg-btc-rbtc/)
- [RSK Testnet Faucet](https://faucet.rootstock.io/)
- [Get RBTC using Exchanges](https://developers.rootstock.io/guides/get-crypto-on-rsk/rbtc-exchanges/)
- Application Architecture [Design architecture](/guides/two-way-peg-app/tech/design-architecture)