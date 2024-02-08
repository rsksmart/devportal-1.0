---
menu_order: 100
menu_title: Create Hardhat Project
layout: rsk
title: 'Create Hardhat Project'
description: 'Learn how to set up your environment for development using Hardhat'
tags: quick-start, getting-started, guide, how-to, bitcoin, rsk, rootstock, blockchain
---
## Creating a Hardhat Project

### Creating a New Directory for Your Project

Before installing Hardhat, create a new directory for your project and navigate into the directory.

```shell
mkdir your_project_name
 cd your_project_name
```

### Initializing a Node.js Project:

This command creates a `package.json file` with default values.

```shell
npm init -y
```

### Installing Hardhat:

This command adds Hardhat as a development dependency in your project.

```shell
npm install --save-dev hardhat@2.19.4
```

### Setting Up the Hardhat Project

After installing, run `npx hardhat` in your project directory. You'll be presented with a few options. Select **"Create an empty hardhat.config.js"** if you want to start from scratch, or choose one of the sample projects to have some boilerplate code to start with.

![Hardhat Installation Success](/assets/img/guides/quickstart/hardhat/install-success.png)

Once setup is complete, you can verify Hardhat is installed correctly by running npx hardhat again. This time, it should display a help message with available tasks, indicating that Hardhat is installed and ready to use.

**Github Commit:** To examine the completed code for this section and compare your work, visit our GitHub repository: [View Commit](https://github.com/jesus-iov/rootstock-quick-start-guide/commit/eee29a35cca5bda9727db761ed4525af391e1a9f). This link directs you to the specific commit with the updates made in this section.
