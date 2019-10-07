---
layout: rsk
title: Install
---

<style>
  img.node-setup-img{
    height:25px;
  }
</style>
### Install RSK Node and Join the RSK Orchid Mainnet Beta

> Minimum Requirement
Make sure your system meet the [Minimum Requirement](https://github.com/rsksmart/rskj/wiki/Node-Minimum-Requirements) before installing the RSK nodes on it.  

RSK node can be installed on all major platforms, including Linux, Windows, and Mac. Here we provide step-by-step instructions for all supported platforms. Depending on your network performance, it usually takes 10 to 15 mins to setup a working node on mainnet.

#### Supported Systems and Methods

<table class="table">
  <thead>
    <tr>
      <th scope="col">Type</th>
      <th scope="col">Platform</th>
      <th scope="col">Supported Methods</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td scope="row">Local</td>
      <td scope="row">Linux</td>
      <td>
        <a href="/rsk/node/install/ubuntu">Ubuntu Package</a>, 
        <a href="/rsk/node/install/centos">CentOS</a>, 
        <a href="/rsk/node/install/java">Fat JAR</a>, 
        <a href="/rsk/node/install/docker">Docker</a> 
      </td>
    </tr>
    <tr>
      <td scope="row">Local</td>
      <td scope="row">Mac</td>
      <td>
        <a href="/rsk/node/install/java">Fat JAR</a>, 
        <a href="/rsk/node/install/docker">Docker</a>
      </td>
    </tr>
    <tr>
      <td scope="row">Local</td>
      <td scope="row">Windows</td>
      <td>
        <a href="/rsk/node/install/java">Fat JAR</a>, 
        <a href="/rsk/node/install/docker">Docker</a>
      </td>
    </tr>
    <tr>
      <td scope="row">Cloud</td>
      <td scope="row">AWS</td>
      <td>
        <a href="/rsk/node/install/aws">AWS AMI</a>, 
        <a href="/rsk/node/install/ubuntu">Ubuntu Package</a>, 
        <a href="/rsk/node/install/docker">Docker</a> 
      </td>
    </tr>
    <tr>
      <td scope="row">Cloud</td>
      <td scope="row">Azure</td>
      <td>
        <a href="/rsk/node/install/azure">Azure VM Image</a>,
        <a href="/rsk/node/install/ubuntu">Ubuntu Package</a>,
        <a href="/rsk/node/install/docker">Docker</a> 
      </td>
    </tr>
    <tr>
      <td scope="row">Cloud</td>
      <td scope="row">Google</td>
      <td>
        <a href="/rsk/node/install/ubuntu">Ubuntu Package</a>, 
        <a href="/rsk/node/install/java">Fat JAR</a>, 
        <a href="/rsk/node/install/docker">Docker</a> 
      </td>
    </tr>
  </tbody>
</table>

#### Using Ubuntu Package
<img class="node-setup-img" src="https://assets.ubuntu.com/v1/29985a98-ubuntu-logo32.png" alt="ubuntu logo"/>

Visit [Setup Node on Ubuntu](./ubuntu) for instructions on installing RSK Node on ubuntu systems


#### Using Fat(or Uber) JAR
<img class="node-setup-img" src="https://www.pngkey.com/png/detail/264-2646582_logo-transparent-background-java.png" alt="java logo"/>

Visit [Setup Node through JAR](./java) for instructions on installing RSK Node on any system with Fat JAR or Uber JAR.


#### Using Docker Container
<img class="node-setup-img" height="25px" src="https://goto.docker.com/rs/929-FJL-178/images/Docker%20Horizontal%20Large.png" alt="docker logo"/>

Visit [Setup Node through Docker](./docker) for instructions on installing RSK Node as a docker container on any system.


#### Using AWS AMI
<img class="node-setup-img" height="25px" src="https://kopano.com/wp-content/uploads/2018/04/AWSCloud.png" alt="aws logo"/>

Visit [Setup Node through AWS AMI](./aws) for instructions on installing RSK Node on a AWS instance through marketplace AMI.


#### Using Azure
<img class="node-setup-img" height="25px" src="https://scaidata.com/assets/img/scaidata_business_intelligence_azure_marketplace_azure_cloud1.png.png" alt="azure logo"/>

Visit [Setup Node through Azure](./azure) for instructions on installing RSK Node on a Azure instance through marketplace image resource.