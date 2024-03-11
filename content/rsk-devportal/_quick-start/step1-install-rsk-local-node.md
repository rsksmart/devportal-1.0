---
layout: rsk
title: Quick Start - Step 1
tags: quick-start, rskj
description: 'quick start - install RSK local node - prep environment, verify and install RSKj'
collection_order: 10
render_custom_terminals: true
render_features: 'custom-terminals'
---

# Step 1 : Install RSK local node

RSK node can be installed on all major platforms,
including Linux, Windows, and Mac.
The RSK local node is known as RegTest,
the same name as bitcoin's local node.

In this step, we provide step-by-step instructions
for running an RSK RegTest node.

## Prepare the Environment

> Note: This step is only necessary for Mac OSX Developers.

Please ensure you are running xcode directly,
and not the command line instance:

```shell
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer

```

## cURL

This is a system command that is likely already installed on your system.

If `curl --version` displays an error,
[download curl](https://curl.haxx.se/download.html).

## Install Java on Windows

Go to the official
[Java download page](https://www.java.com/en/download/),
and download and run the installer from there.

![Java Download](/assets/img/tutorials/setup-truffle-oz/image-02.png)

## Install Java on Mac OSX and Linux

There are a variety of ways to do this, and
[SDKman](https://get.sdkman.io/)
is one which allows you to install and
switch between multiple versions as needed:

```shell
curl -s "https://get.sdkman.io/" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
# to get a filtered list of available java versions
sdk list java  | grep "8\." # copy a selection for use below

# install the version of java copied above
# (replace accordingly, at writing time this is 292)
sdk install java 8.0.292.j9-adpt

# show installed versions, and switch to the selected one
# (replace accordingly)
sdk list java | grep installed
sdk use java 8.0.292.j9-adpt
java -version

```

# RSKj

RSKj is the software for running RSK nodes.

There are [several ways](/rsk/node/install/)
to set up an RSK node.
Here, we will download a JAR file,
and run it using the Java SDK that has been installed.

## Download RSKj

Go to the [releases page](https://github.com/rsksmart/rskj/releases),
and click on the most recent one to download it.

You need to click on the JAR file,
in the end of the post about the latest release.
Its name should be `rskj-core-*.jar`:

![Download latest RSK release](/assets/img/tutorials/setup-truffle-oz/image-07.png)

## Verify authenticity of RSKj

When installing and running the RSKj node,
it is always good practice to verify that your copy is legitimate.

Let's compute the checksum using the following command:

```shell
sha256sum rskj-core-rskj-core-5.2.0-FINGERROOT-all.jar
```

For this version, the output should look like this:

```shell
70ae5209720ad6477c1c32d8a8d94e29ebb0db25d57e9903546519d614eddf9f  rskj-core-5.2.0-FINGERROOT-all.jar
```

On Windows, use this command instead:

```windows-command-prompt
C:\>certutil -hashfile rskj-core-5.2.0-FINGERROOT-all.jar SHA256

```

For this version, the output on windows should look like this:

```windows-command-prompt
SHA256 hash of rskj-core-5.2.0-FINGERROOT-all.jar:
70ae5209720ad6477c1c32d8a8d94e29ebb0db25d57e9903546519d614eddf9f
CertUtil: -hashfile command completed successfully.

```

The output checksum should match the checksum seen on the releases page.

For more information about verifying that your copy is legitimate,
including signature verification, check out the
[full instructions](/rsk/node/security-chain/ 'Verify authenticity of RSKj source code and its binary dependencies')
on how to do this.

### Run

To run the node:

```shell
java -classpath <PATH-TO-THE-RSKJ-JAR> -Drpc.providers.web.cors=* -Drpc.providers.web.ws.enabled=true co.rsk.Start --regtest
```

(Replace `<PATH-TO-THE-RSKJ-JAR>` with your path to the JAR file).

> Example:
>
> ```windows-command-prompt
> C:\>java -classpath C:\RSK\node\rskj-core-5.2.0-FINGERROOT-all.jar -Drpc.providers.web.cors=* -Drpc.providers.web.ws.enabled=true co.rsk.Start --regtest
>
> ```

If you see no output - that is a good thing:
Its output is directed to a log file.

> Note: The flag provided above, `-Drpc.providers.web.cors=*`,
> This disables cross origin resource sharing protection,
> effectively allowing any web page to access it.
> As we want to make JSON-RPC requests from a browser,
> such as a DApp, we need this flag.

Do **not** close this terminal.
If closed, the RSKj node will stop running.
Run the following commands in a new terminal.

### Connect over HTTP

RSKj allows you to connect over HTTP,
and is currently listening on port `4444`.
Let us verify that this works.
Open a new terminal window.

Issue a JSON-RPC request to the RSKj over HTTP.
For example:

```shell
curl http://localhost:4444/ \
  -s \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'

```

For Windows:

```windows-command-prompt
C:\>curl http://localhost:4444/ -s -X POST -H "Content-Type: application/json" --data "{\"jsonrpc\":\"2.0\",\"method\":\"eth_blockNumber\",\"params\":[],\"id\":1}"

```

The response should look similar to this:

```json
{ "jsonrpc": "2.0", "id": 1, "result": "0x2991b" }
```

The `result` property is the number of the latest block that has been synced. Note that this value (`0x2991b`) is the block number in hexadecimal (base 16), so the output above indicates that the current block number is `170267` in decimal (base 10).

- To get more information about this process:
  Check out
  [set up RSKj with Java](/rsk/node/install/java/).
- If you encounter any problems, check if your system meets the
  [minimum requirements](/rsk/node/install/requirements/).
- There are other ways to install an RSK node,
  on other supported platforms:
  Check out [installing RSKj](/rsk/node/install/).

> Note: You can enter any other valid JSON-RPC commands as the `POST` body.

### Connect over Websockets

RSKj also allows you to connect over websockets,
and is currently listening on port `4445`.
Let's verify that this works too.

> Note: This step is optional,
> the HTTP connection above is sufficient.

> Note: You will need NodeJs and npm
> installed on your system for this.

```bash
npx wscat -c ws://localhost:4445/websocket

```

If you have not installed
[`wscat`](https://www.npmjs.com/package/wscat) globally before,
wait for it to do so,
and then it will load up its own shell.

```text
Connected (press CTRL+C to quit)
>
```

Again, you can enter any valid JSON-RPC command in the prompt.
Be sure to check that you receive a valid and expected response.

For example, enter the following request:

```json
> {"jsonrpc":"2.0","method":"eth_blockNumber", "params": [], "id":1}
```

This should return a response similar to the following:

```json
< {"jsonrpc":"2.0","id":1,"result":"0x299d3"}
```

## Next

Now that we have an RSK Regtest node running,
we're ready to begin the next step,
where we will connect to this.
