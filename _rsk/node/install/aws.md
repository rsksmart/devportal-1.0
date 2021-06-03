---
layout: rsk
title: Setup node on AWS
tags: aws, console, VVM, marketplace, launch, desktop, install, rsk, rskj, node, how-to, network, requirements, mainnet
collection_order: 2332
---

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube-nocookie.com/embed/6H5qWkx9Tcs?cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Step 1:

Navigate to the AWS Console site: [https://console.aws.amazon.com](https://console.aws.amazon.com)

## Step 2:

On the AWS services dashboard, click on EC2 (Virtual Machines), then on “launch instance” button.

## Step 3:

Click on AWS Marketplace, search for “rsk”, and select the “RSK Node Bamboo v0.x.x MainNet”; Review the prices and select “Continue”.

## Step 4:

Select the instance type. The once disabled doesn’t reach the minimum hardware requirements. Then, click on “Next: configure instance details”

## Step 5:

Optionally change the default values on this screen, and continue clicking on “Next: Add Storage”

## Step 6:

In the Storage section, increase the size to any size that is 50GB or higher, the minimum recommended to run the node, then click on “Next: Add Tags”

## Step 7:

Optionally add a tag to identify the instance, then, click on “Next: Configure Security Group”

## Step 8:

Now create a new rule with the TCP 22 port, and select a source to open the SSH port and be able to connect to the node remotely, then click on “Review and Launch”

## Step 9:

Review the info and click on “Launch” to start the VM deployment

## Step 10:

After AWS deploys the VM, enter the VM details and use the IP or DNS to connect to the node.