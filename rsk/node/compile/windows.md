---
layout: rsk
title: Windows
---

## Compiling and running the node
After opening IDEA we need to load the RskJ project, this can be done by using the *Import project* option in IDEA.

To do that follow the next steps:

- Go to *File* -> *New* -> *Project from Existing Sources...*
- Browse in the RskJ downloaded code the file `rskj\build.gradle` and select it.
- Within the dialog select *Use default gradle wrapper* and then press *Finish*.

![img](https://github.com/rsksmart/rskj/wiki/img/howToInstallAndRun/IdeaRskJWelcome.png)


### IDEA Build/Run configuration

We need to create a new configuration profile to run the node from IDEA.
That can be done by clicking on *Run* -> *Edit Configurations* or as shown in the following picture:

![img](https://github.com/rsksmart/rskj/wiki/img/howToInstallAndRun/EditConfigs.png)

Then set the options as shown below:

![img](https://github.com/rsksmart/rskj/wiki/img/howToInstallAndRun/AddNewConfig.png)

- Main Class: `co.rsk.Start`
- Working directory: `/path/to/code/rskJ`
- Use classpath of module: `rskj-core_main`
- JRE need to be set as: `Default (1.8 - SDK of 'rsk-core_main' module)`

*Note:*
- If it isn't configured the default JDK, you have to set it in: *File -> Project Structure*.
- If the IDE doesn't recognize the configuration options, open `rskj/rskj-core/build.gradle` and sync it from `Gradle` tab.

### Running the node

We are ready to run the node using IDEA, just press the *Start* button at the right of the configuration we've just created.

![img](https://github.com/rsksmart/rskj/wiki/img/howToInstallAndRun/Run.png)

If everything is OK you should see the debug information like that:

![img](https://github.com/rsksmart/rskj/wiki/img/howToInstallAndRun/Running.png)

And yes! Congratulations! Now you're running a local RSK node :)

You're joined to MainNet by default. 

If you want to switch the network, add:
- For TestNet: `--testnet`
- For RegTest: `--regtest`

Inside the field `Program Arguments` in your run configuration.

## Any problems?
We hope our [troubleshooting section](/rsk/troubleshooting) can help you!