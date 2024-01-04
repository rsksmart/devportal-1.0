---
layout: redirect
permalink: /develop/wallet/rwallet/
redirect: /develop/wallet/rif-wallet/
---

rWallet is being discontinued and will soon be replaced by RIF Wallet, bringing more features, functionalities and improved UX, all powered by smart contract technology. 

If you are an rWallet user, we advise that you restore your seed in a different wallet to ensure the seamless transition of your assets until RIF Wallet becomes available. 

rWallet is an open-source easy to use blockchain wallet. It is the code-base to create your own mobile phone wallet with the most secure blockchain. Send, receive and swap Bitcoin (BTC), smartBitcoin (RBTC), RIF Token (RIF), Dollar on Chain (DOC) and more coming soon.

- 💰 rWallet currently supports: Bitcoin (BTC), smartBitcoin (RBTC), RIF Token (RIF), Dollar on Chain (DOC). 
- 🔒 Provides 100% security — Neither RSK or any 3rd party can access your money or data.
- 🌐Available in 4 languages: Chinese, English, Spanish and Portuguese

<a href="http://github.com/rsksmart/rwallet" target="_blank" class="green-button">Start building</a>

<a href="https://play.google.com/store/apps/details?id=com.rsk.rwallet.v2" target="blank"><img src="/assets/img/rwallet/android/google-play-badge.png" style="width: 160px; margin:0; padding:0;"></a><a href="https://apps.apple.com/us/app/id1489241342" target="blank"><img src="/assets/img/rwallet/ios/app-store-badge.svg" style="width: 145px; margin:0; padding:0;"></a>

## rWallet Architecture

<div class="graph">
    <div class="row">
    <div id="rWallet" class="col-sm-5 col-12">
        <div class="grafbox green-rsk">
            <a href="http://github.com/rsksmart/rwallet">rWallet<br>(Code base)</a>
        </div>
    </div>
    </div>
    <div id="api_services_group" class="row grafboxrow">
    <div class="col-sm-2 col-12">API<br>Services</div>
    <div class="col-sm-10 col-12">
        <div class="row justify-content-center">
            <div id="walletAPI" class="col-4">
                <div id="walletAPI_content" class="grafbox green-rsk">
                <span>Wallet API</span>
                </div>
            </div>
            <div id="explorerAPI" class="col-4">
                <div class="grafbox green-rsk">
                <span>Explorer API</span>
                </div>
            </div>
            <div class="col-4">
                <div class="grafbox grey">
                <span>Others</span>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div class="row">
    <div id="bitcoinjs" class="col-2 pl-0 pr-0-sm">
        <div class="grafbox h-100 rsk_orange">
            <span class="rotate"><a href="https://www.npmjs.com/package/bitcoinjs-lib" target="_blank">Bitcoin.js</a></span>
        </div>
    </div>
    <div id="group-row" class="col-10 pr-0">
        <div class="row rowtop">
            <div class="col-3 pr-0-sm">
                <div class="grafbox h-100 rsk_orange">
                <span class="rotate"><a href="/libraries/">Web 3 & Other Libraries</a></span>
                </div>
            </div>
            <div class="col-sm-5 col-6">
                <div class="row justify-content-center">
                <div class="col-6 pr-0-sm">
                    <div class="row justify-content-center">
                        <div id="rnslibs" class="col">
                            <div class="grafbox one-third-height rsk_orange">
                            <span class=""><a href="/rif/rns/libs/">RNS Libs</a></span>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col">
                            <div class="grafbox rif_blue">
                            <span class=""><a href="/rif/rns/">RNS</a></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6 pr-0-sm">
                    <div class="row justify-content-center">
                        <div class="col">
                            <div class="grafbox one-third-height grey">
                            Other RIF Libs
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col">
                            <div class="grafbox grey">
                            <a href="/rif/">Other RIF Services</a>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <!-- fin row top --> 
        <div class="row rowbottom">
            <div class="col-12 pr-0-sm">
                <div id="graph-rsk" class="grafbox green-rsk-solid">
                <a href="/rsk/">RSK</a>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div class="row has-unique-col bitcoin">
    <div class="col-12 grafbox orange-bitcoin"><a href="https://bitcoin.org/en/development" target="_blank">Bitcoin</a></div>
    </div>
</div>