---
layout: rsk
title: Configure Verbosity
---

You can configure the desired log verbosity for your RSK node installation according to your needs.
More information can be found at: [Logback Project](https://logback.qos.ch/index.html).

## Requirements

*  RSK Node Installed
*  SSH Access 
*  SuperUser Access (sudo)


## Log level options

This image describes the log table for your reference.

![Log Levels](https://i.stack.imgur.com/7o9Kk.png)


## Setting your desired verbosity configuration

You need to edit logback.xml file to set your desired level of verbosity. 

```bash
sudo vi /etc/rsk/logback.xml
```

```bash
    <logger name="execute" level="INFO"/>
    <logger name="blockvalidator" level="INFO"/>
    <logger name="blocksyncservice" level="TRACE"/>
    <logger name="blockexecutor" level="INFO"/>
    <logger name="general" level="DEBUG"/>
    <logger name="gaspricetracker" level="ERROR"/>
    <logger name="web3" level="INFO"/>
    <logger name="repository" level="ERROR"/>
    <logger name="VM" level="ERROR"/>
    <logger name="blockqueue" level="ERROR"/>
    <logger name="io.netty" level="ERROR"/>
    <logger name="block" level="ERROR"/>
    <logger name="minerserver" level="INFO"/>
    <logger name="txbuilderex" level="ERROR"/>
    <logger name="pendingstate" level="INFO"/>
    <logger name="hsqldb.db" level="ERROR"/>
    <logger name="TCK-Test" level="ERROR"/>
    <logger name="db" level="ERROR"/>
    <logger name="net" level="ERROR"/>
    <logger name="start" level="ERROR"/>
    <logger name="cli" level="ERROR"/>
    <logger name="txs" level="ERROR"/>
    <logger name="gas" level="ERROR"/>
    <logger name="main" level="ERROR"/>
    <logger name="trie" level="ERROR"/>
    <logger name="org.hibernate" level="ERROR"/>
    <logger name="peermonitor" level="ERROR"/>
    <logger name="bridge" level="ERROR"/>
    <logger name="org.springframework" level="ERROR"/>
    <logger name="rlp" level="ERROR"/>
    <logger name="messagehandler" level="ERROR"/>
    <logger name="syncprocessor" level="TRACE"/>
    <logger name="sync" level="ERROR"/>
    <logger name="BtcToRskClient" level="ERROR"/>
    <logger name="ui" level="ERROR"/>
    <logger name="java.nio" level="ERROR"/>
    <logger name="org.eclipse.jetty" level="ERROR"/>
    <logger name="wire" level="ERROR"/>
    <logger name="BridgeSupport" level="ERROR"/>
    <logger name="jsonrpc" level="ERROR"/>
    <logger name="wallet" level="ERROR"/>
    <logger name="blockchain" level="INFO"/>
    <logger name="blockprocessor" level="ERROR"/>
    <logger name="state" level="INFO"/>
    <logger name="messageProcess" level="INFO"/>

    <root level="DEBUG">
        <appender-ref ref="stdout"/>
        <appender-ref ref="FILE-AUDIT"/>
    </root>
```

* Save your changes
* RSK logback.xml config will watch and apply changes without restarting RSK Node.
(The watcher can take up to 1 hour to notice the changes and reload the logging configuration)
* RSK logs with default installation will rotate on daily basis and/or when the log file reach 100MB

Using this configuration the application will be ONLY log ERROR events.

## Using logback configuration file
A logback configuration example can be downloaded from [here](https://github.com/rsksmart/artifacts/blob/master/rskj-ubuntu-installer/config/logback.xml).

#### Using logback with a installed node
If you're running a node [using the release jar file](install-rskj-using-fat-jar) use the following command:
```bash
java -cp rskj-core-0.6.2-ORCHID-all.jar co.rsk.Start -Dlogback.configurationFile=path/to/logback.xml
```

#### Using logback with a compiled node
If you're running a node [by compiling the code](Compile-and-run-a-RSK-node-locally) on VM Options *add*: 
```
-Dlogback.configurationFile=path/to/logback.xml
```

> Note: path should be written without abbreviations (full path)

### RSK log files can be found in:

Real time log:

```bash
/var/log/rsk/rsk.log
```

Compressed logs:

```bash
/var/log/rsk/rskj-YYYY-MM-DD.N.log.gz
```