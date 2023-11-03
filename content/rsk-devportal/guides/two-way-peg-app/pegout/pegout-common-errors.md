![2 way peg app (peg-out)](/assets/img/guides/two-way-peg-app/pegout.gif)

# Liquality Common Errors

## This will be a guide to show common errors when using Liquality with 2 way peg app and how to fix them.

### User Rejected Error

This error occurs when the user starts connecting its wallet and for some reason cancels it.

![User Rejected error](/assets/img/guides/two-way-peg-app/liquality/common-errors/1-common-errors.png)

This error occurs when the user starts connecting its wallet and for some reason cancels it.


---

### Error when connecting

This error occurs if you have MetaMask and Liquality enabled in your browser. 

![Error connecting](/assets/img/guides/two-way-peg-app/liquality/common-errors/2-common-errors.png)

This error occurs if you have MetaMask and Liquality enabled. 

![MetaMask and Liquality enabled](/assets/img/guides/two-way-peg-app/liquality/common-errors/3-common-errors.png)

This also happens if another activity is been carried out, outside the connecting process when the connection is happening (for example, trying to disable the Liquality wallet extension in the middle of the connection).

To fix both errors: 

* Go to manage chrome extensions, and disable any other wallet extension, 
* Disable Liquality, and  enable it
* Refresh the 2 way peg app.

![Disable extensions](/assets/img/guides/two-way-peg-app/liquality/common-errors/4-common-errors.png)

![Enable Liquality](/assets/img/guides/two-way-peg-app/liquality/common-errors/5-common-errors.png)

## Resources
- 2 way peg app frontend [repo](https://github.com/rsksmart/2wp-app)
- 2 way peg app backend [repo](https://github.com/rsksmart/2wp-api)
- How to get [RBTC using RSK’s built in Powpeg](https://developers.rootstock.io/guides/get-crypto-on-rsk/powpeg-btc-rbtc/)
- [RSK Testnet Faucet](https://faucet.rootstock.io/)
- [Get RBTC using Exchanges](https://developers.rootstock.io/guides/get-crypto-on-rsk/rbtc-exchanges/)
- Application Architecture [Design architecture](/guides/two-way-peg-app/tech/design-architecture)