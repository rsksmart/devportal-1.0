---
section_title: Cloud fast deploy
menu_order: 5
menu_title: Setup node on Azure
layout: rsk
title: Setup node on Azure
tags: azure, desktop, rpc, install, rsk, rskj, node, how-to, network, requirements, mainnet
---

## Install RskJ Using Azure

Follow the instructions below to install and run an RSK node in Azure. By default, the node connects to Mainnet. If you want to change the network read [this section](/rsk/node/configure/switch-network). If you want to change some configuration, please refer to the [RSK node configuration section](/rsk/node/configure). Also you can [enable RPC calls](#rpc) to interact with the node (by default it's disabled).

#### Install The Node Using Azure

1. ***On Azure, create a resource.***
   ![create resource](/assets/img/azure/azure1.png)
1. ***Search for RSK, choose the node's version and click Create.***
   ![Search for RSK](/assets/img/azure/azure2.png)
1. ***You will see 4 steps after deploying the node:***
    1. Basics: complete this step with your information. Choose a name for the node, user name, password, subscription and resource group.
       ![step-1](/assets/img/azure/azure3.png)
    1. Size: select your VM options. Check recommended minimum requirements.
    1. Settings: configure optional features.
    1. Summary: review the summary of what you have set and press Create.
       Wait for Azure to finish the deployment.
1. Initialize RSK node configuration file settings (you can do it while [switching network](/rsk/node/configure/switch-network)).
    * [Connect your computer to the node using bash](#connect).
    * Edit configuration file using vi:
      ```shell
      sudo service rsk stop
      cd /etc/rsk
      sudo vi <NETWORK>.conf
      ```
    * Replace <NETWORK> with the network you are using. If you have not switched it, by default it is Mainnet.
    * Restart RSK service:
      ```shell
      sudo service rsk start
      ```

That's all! You have your own node running on an Azure Service.

<span id="rpc"></span>

#### Enable RPC calls

1\. Enable 4444 port. That is the default RSK port for RPC calls.
   * Navigate to the virtual machine where you are runing RSK. Go to networking configuration.

     ![azure-networking](/assets/img/azure/azure4.png)

   * Add an inbound port rule with the following options:

     ![azure-security-rule](/assets/img/azure/azure5.png)

> :exclamation: Important: this is a basic configuration that enables any call. Any other options can be added. At least you must maintain the destination to 4444.

You should get something like this:

![azure-port-4444](/assets/img/azure/azure6.png)

2\. [Connect your computer to the node using bash](#connect) .

3\. Edit configuration file.

```shell
sudo service rsk stop
cd /etc/rsk
sudo vi <NETWORK>.conf
```

Replace `<NETWORK>` with the network you are using. If you have not switched, by default it's Mainnet.

Press `i` to enable insert mode. Edit the following values:

* `rpc.address = "0.0.0.0"`
* `rpc.host = ["AZURE_SERVICE_VM_IP"]`. You can also add `localhost` and/or your node's `DNS`.

Then press `ESC`  to exit insertion and `:wq` to write changes and quit `vi`. Restart RSK service.

```shell
sudo service rsk start
```

If needed, change `cors` value.

4. Test your connection.

```shell
curl -s -X POST -H "Content-Type:application/json" -d '{"jsonrpc":"2.0","method":"eth_blockNumber", "params":[],"id":666}' http://<YOUR_IP>:4444
```

Should return something like:

```json
{"jsonrpc":"2.0","id":666,"result":"0x70d03"}
```

<span id="connect"></span>
#### Connect your computer to the node using bash

In a terminal run:

```shell
ssh user@server
```

To get user and server navigate to RSK virtual machine and go to the Overview window. Open Connect option in the top left corner.
![azure-connect](/assets/img/azure/azure7.png)

Copy and paste the text in Ḷogin using VM local account in the console
![azure-logssh](/assets/img/azure/azure8.png)

## Video

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube-nocookie.com/embed/0gk10ob5dr4?cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
