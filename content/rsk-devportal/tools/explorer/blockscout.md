---
menu_order: 201
menu_title: Blockscout
layout: Rootstock
title: Overview of Blockscout
tags: overview, explorer, rootstock, Blockscout, search, blocks, transactions, mainnet, tools
---

Blockscout is an open-source Ethereum-compatible blockchain explorer. When using it with Rootstock, a smart contract platform that is connected to the Bitcoin network, you can:

1. **Explore Rootstock Blocks and Transactions**: View real-time data on blocks, transactions, gas used, etc.

2. **Interact with Smart Contracts**: Read data from and write to smart contracts deployed on the Rootstock network.

3. **Track Rootstock Tokens**: View ERC-20 and ERC-721 token transfers and balances.

4. **Use API for Automation**: Automate data retrieval from the Rootstock blockchain using Blockscout's API.

To use Blockscout with Rootstock, you need to access the Rootstock version of Blockscout and then you can start exploring or interacting with the network. Here’s a basic example on how to use Blockscout with Rootstock in Python to get the latest block number:

```python
import requests

response = requests.get("https://blockscout.com/rsk/mainnet/api?module=block&action=eth_block_number")
latest_block = int(response.json()['result'], 16)  # Converts hex to integer
print(f"Latest RSK Block Number: {latest_block}")
```

This Python script uses the Blockscout API to fetch the latest block number on the Rootstock mainnet. You need to have Python and the `requests` library installed to run this script.

## More info
- [Hardhat Documentation](https://docs.blockscout.com)
- [Github Repo](https://github.com/blockscout/blockscout)