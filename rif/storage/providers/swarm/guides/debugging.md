---
menu_order: 400
menu_title: Debugging
layout: rsk
title: Debugging Swarm
tags: rif, rif-storage, ipfs, swarm, storage, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rootstock, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

## 1. Open the `swarm` project
Load the entire [Swarm project](https://github.com/ethersphere/swarm) into your favorite IDE.

The default location should be `$GOPATH/src/github.com/ethersphere/swarm`.

## 2. Alter the `main` function
Locate the `main()` function, under `swarm/cmd/swarm/main.go`. 

This function is called when starting Swarm through the `swarm` terminal command, therefore its arguments must be injected, like so:

```go
func main() {
	// injection of swarm arguments
	options := []string{
		"--bzzaccount=0x2f1cd699b0bf461dcfbf0098ad8f5587b038f0f1",
		"--password=/home/usr/password.txt",
		// other CLI arguments here...
	}
	args := append(os.Args, options...)
	if err := app.Run(args); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
```

Each of the elements in the `options` array holds a `swarm` command option and its value, in the `--option=value` form.

Replace the example with your own values, and add or remove any flag as needed.

For a full list of the available command line options for `swarm`, see [here](https://swarm-guide.readthedocs.io/en/latest/node_operator.html#general-configuration-parameters).

## 3. Start debugging!
You can place a breakpoint before the `app.Run(args)` call is made and _step over_ the code to see if the system is started successfully with the hard-coded arguments, or if there's an error.

Then, any other breakpoints created in the project should work if the code can reach them from the `main` function.

Once the breakpoints are set, run the `main` function with your favorite debugger.

After successfully starting up Swarm, the local web server endpoint should be accessible through your browser, by default at `http://localhost:8500`.