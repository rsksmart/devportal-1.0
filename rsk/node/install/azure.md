---
layout: rsk
title: Setup node on Azure
---

## Install RskJ Using Azure

Following the instructions below you will install and run the RSK node in Azure. By default, the node connects to MainNet. If you want to change the network read [this section](https://github.com/rsksmart/rskj/wiki/Switching-networks). If you want to change some configuration, please refer to our [RSK node configuration section](https://github.com/rsksmart/rskj/wiki/RSK-node-configuration). Also you can [enable RPC calls](#rpc) to interact with the node (by default it's not enabled).

#### Install The Node Using Azure
1. ***On Azure, create a resource.***
![create resource](https://files.readme.io/b00bff9-azure-create-resource.png)
1. ***Search for RSK, choose the node's version and click Create.***
![Search for RSK](https://files.readme.io/e562a79-azure-search-rsk.png)
1. ***You will see 4 steps after deploying the node:***
    1. Basics: complete this step with your information. Choose a name for the node, user name, password, subscription and resource group.
    ![step-1](https://files.readme.io/e562a79-azure-search-rsk.png)
    1. Size: select your VM options. Check recommended minimum requirements.
    1. Settings: configure optional features.
    1. Summary: review the summary of what you have set and press Create.
Wait for Azure to finish the deployment.
1. Initialize RSK node configuration file settings (you can do it while [switching network](https://github.com/rsksmart/rskj/wiki/install-rskj-using-azure#Switching-networks)).
    * [Connect your computer to the node using bash](#connect).
    * Edit configuration file using vi:
      ```
      sudo service rsk stop
          cd /etc/rsk
          sudo vi <NETWORK>.conf
      ```

    * Replace <NETWORK> with the network you are using. If you have not switched it, by default it is MainNet.
    * Restart RSK service:

      ```
          sudo service rsk start
      ```
  That's all! You have your own node running on an Azure Service.

<span id="rpc"></span>
#### Enable RPC calls
1. Enable 4444 port. That is the default RSK port for RPC calls.
Navigate to the virtual machine where you are runing RSK. Go to networking configuration.
  ![azure-networking](https://files.readme.io/21862c4-azure-networking.png)
Add an inbound port rule with the following options:
![azure-security-rule](https://files.readme.io/2b7a894-azure-security-rule.png)

>:exclamation: Important: this is a basic configuration that enables any call. Any other options can be added. At least you must maintain the destination to 4444.
>
You should get something like this:
![azure-port-4444](https://files.readme.io/07b69a9-azure-port-4444.png)

2. [Connect your computer to the node using bash](#connect) .

3. Edit configuration file.

```
sudo service rsk stop
cd /etc/rsk
sudo vi <NETWORK>.conf
```

Replace ```<NETWORK>``` with the network you are using. If you have not switched, by default it's MainNet.

Press ```i``` to enable insert mode. Edit the following values:

* ```rpc.address = "0.0.0.0"```
* ```rpc.host = ["AZURE_SERVICE_VM_IP"]```. You can also add ```localhost``` and/or your node's ```DNS.```

Then press ```ESC```  to exit insertion and ```:wq``` to write changes and quit ```vi```. Restart RSK service.

```
sudo service rsk start
```
If needed, change ```cors``` value.

4. Test your connection.

```
curl -s -X POST -H "Content-Type:application/json" -d '{"jsonrpc":"2.0","method":"eth_blockNumber", "params":[],"id":666}' http://<YOUR_IP>:4444 
```

Should return something like:

``` 
{"jsonrpc":"2.0","id":666,"result":"0x70d03"} 
```
<span id="connect"></span>
#### Connect your computer to the node using bash

In a terminal run:

```
ssh user@server
```

To get user and server navigate to RSK virtual machine and go to the Overview window. Open Connect option in the top left corner.
![azure-connect](https://files.readme.io/0df82e8-azure-connect.png)

Copy and paste the text in Ḷogin using VM local account in the console 
![azure-logssh](https://files.readme.io/3d09a04-azure-logssh.png)