---
menu_order: 700
menu_title: Testnet
layout: rsk
title: RIF Gateways Chainlink Testnet
tags: rif, gateways, chainlink, testnet
---

## Smart contracts

### RIF/BTC Price Reference Aggregator

[`0xd793fd691dF2934B412e250460bEd76d807f05eb`](https://explorer.testnet.rsk.co/address/0xd793fd691dF2934B412e250460bEd76d807f05eb)

To join as a Node Operator:

- Configure a job in Chainlink to get RIF/USD price from Liquid.com.
- Login to the Chainlink Operator WebUI and add the following job.
- Replace *RSK_INITIATOR_NAME*, *ORACLE_CONTRACT_ADDRESS* and *RSKTX_ADAPTER_NAME* with your values. 
- For the purpose of adding the node to the testnet Reference Aggregator, configure the tasks to fetch last traded price of RIF/BTC pair on Liquid.com exchange. 
- Once this step is done, provide the JobID and Oracle contract address to the Aggregator owners to be included.

```
{
 "initiators": [
    {
      "type": "external",
	  "params": {
	    "name": "RSK_INITIATOR_NAME",
	    "body": {
	      "address": "ORACLE_CONTRACT_ADDRESS"
	    }
  	  }
    }
  ],
  "tasks": [
    {
      "type": "httpget",
	  "params": {
	    "get": "https://api.liquid.com/products/580"
	  }
    },
	{
      "type": "jsonparse",
      "params": {
	    "path": "last_traded_price"
      }
    },
    {
      "type": "multiply",
	  "params": {
	    "times": 100000000
	  }
	},
	{
	  "type": "ethuint256"
	},
	{
	  "type": "RSKTX_ADAPTER_NAME"
	}
  ]
}
```


## Token Bridge 
[testnet.tokenbridge.rsk.co/](https://testnet.tokenbridge.rsk.co/)

