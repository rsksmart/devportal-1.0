---
layout: revamp/rsk
title: Deploy a smart contract at RSK local node using Geth and Remix
toc: true
---

RSK’s virtual machine implementation is compatible with the Ethereum virtual machine (EVM), which enables us to make use of many of Ethereum developer tools.

In this tutorial I will show you step-by-step how to compile a smart contract using Remix and deploy it on a local node using Geth.

## Overwiew

We will do these steps:
<ol class="two_columns">
    <li>Run a RSK local node;</li>
    <li>Connect with a RSK local node using Geth attach;</li>
    <li>Create a smart contract in Remix;</li>
    <li>Compile it;</li>
    <li>Create a Javascript deploy file; Geth attach;</li>
    <li>Deploy the smart contract in the Geth;</li>
    <li>Interact with the smart contract</li>
</ol>


## Requirements

+ Java JDK
+ RSK local node
+ Geth
+ Remix - web tool, online

You will need to complete this tutorial before proceeding:

[Using Geth attach to a RSK local node](https:../geth-attach-local-node/)

<a href="#" target="_blank">This is an external link</a> with some text following.

## Run a RSK local node
To run the node:

<div class="language-shell highlighter-rouge">
    <div class="highlight">
        <pre class="highlight"><code>java <span class="nt">-cp</span> &lt;PATH-TO-THE-RSKJ-JAR&gt; co.rsk.Start <span class="nt">--regtest</span>
</code></pre>
    </div>
</div>

(Replace with your path to the JAR file).

Check the tutorial: [Using Geth attach to a RSK local node](https:../geth-attach-local-node/) for more details on how to do this.

## Connect with RSK local node

<div class="language-shell highlighter-rouge">
    <div class="highlight">
        <pre class="highlight"><code>geth attach http://127.0.0.1:4444
</code></pre>
    </div>
</div>

Check the tutorial: [Using Geth attach to a RSK local node](https:../geth-attach-local-node/) for more details on how to do this.

## Remix

Go to <a href="http://remix.ethereum.org/" rel="external noopener noreferrer" target="_blank">REMIX</a>

In the <code class="highlighter-rouge">home page</code>, choose environment <code class="highlighter-rouge">Solidity</code>

![Solidity-1](/assets/revamp/img/img1.PNG)
![Solidity-2](/assets/revamp/img/img2.PNG)


## Create a smart contract

Create a new file

Click on the second button on the left side - file explorer

![Smart contract 1](/assets/revamp/img/img2.PNG)

Click on the + button to create a new file

--- 

![Smart contract 2](/assets/revamp/img/img3.PNG)

Copy the smart contract from the following gist, or inline below:

**Register.sol gist**

<div class="language-shell highlighter-rouge">
    <div class="highlight">
    <pre class="highlight"><code>
    pragma solidity 0.5.4;

    contract Register {
        string private info;

        function setInfo(string memory _info) public {
            info = _info;
        }

        function getInfo() public view returns (string memory) {
            return info;
        }
    }
    </code></pre>
    </div>
</div>

## Tables
### default, use markdowm

| Header Col 1 | Header Col 2 | Header Col 3 | Header Col 4 |
| - | - | - | - |
| Lorem Ipsum | Lorem Ipsum | Lorem Ipsum | Lorem Ipsum |
| Lorem ipsum dolor sit  <a href="http://remix.ethereum.org/" rel="external noopener noreferrer" target="_blank">REMIX</a> | Lorem Ipsum | Lorem Ipsum | Lorem Ipsum |
| Lorem ipsum  | Lorem Ipsum | [Lorem Ipsum](https:../geth-attach-local-node/) | Lorem ipsum dolor sit amet |
| Lorem Ipsum | Lorem Ipsum | Lorem Ipsum | Lorem Ipsum |

---

### responsive, estilo 1
<table class="table-filled-bg-row">
    <thead>
        <tr>
            <th colspan="4">Long th with 100% width</th>
        </tr>
        <tr class="regular-table-header">
            <th width="40%">Header Col 1</th>
            <th width="20%">Header Col 2</th>
            <th width="20%">Header Col 3</th>
            <th width="20%">Header Col 4</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td data-column="Header Col 1">Lorem Ipsum</td>
            <td data-column="Header Col 2">Lorem Ipsum</td>
            <td data-column="Header Col 3">Lorem Ipsum</td>
            <td data-column="Header Col 4">Lorem Ipsum</td>
        </tr>
        <tr>
            <td data-column="Header Col 1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut <a href="http://remix.ethereum.org/" rel="external noopener noreferrer" target="_blank">REMIX</a>. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo re et dolore magna aliqua.</td>
            <td data-column="Header Col 2">Lorem Ipsum</td>
            <td data-column="Header Col 3">Lorem Ipsum</td>
            <td data-column="Header Col 4">Lorem Ipsum</td>
        </tr>
        <tr>
            <td data-column="Header Col 1">Lorem Ipsum</td>
            <td data-column="Header Col 2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
            <td data-column="Header Col 3">Lorem Ipsum</td>
            <td data-column="Header Col 4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
        </tr>
        <tr>
            <td data-column="Header Col 1">Lorem Ipsum</td>
            <td data-column="Header Col 2">Lorem Ipsum</td>
            <td data-column="Header Col 3">Lorem Ipsum</td>
            <td data-column="Header Col 4">Lorem Ipsum</td>
        </tr>
        <tr>
            <td data-column="Header Col 1">Lorem Ipsum</td>
            <td data-column="Header Col 2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
            <td data-column="Header Col 3">Lorem Ipsum</td>
            <td data-column="Header Col 4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
        </tr>
    </tbody>
</table>

---

### responsive, estilo 2
<table class="table-empty-bg-row">
    <thead>
        <tr>
            <th colspan="4">Long th with 100% width</th>
        </tr>
        <tr class="regular-table-header">
            <th width="25%">Header Col 1</th>
            <th width="25%">Header Col 2</th>
            <th width="25%">Header Col 3</th>
            <th width="25%">Header Col 4</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td data-column="Header Col 1">Lorem Ipsum</td>
            <td data-column="Header Col 2">Lorem Ipsum</td>
            <td data-column="Header Col 3">Lorem Ipsum</td>
            <td data-column="Header Col 4">Lorem Ipsum</td>
        </tr>
        <tr>
            <td data-column="Header Col 1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, <a href="http://remix.ethereum.org/" rel="external noopener noreferrer" target="_blank">REMIX</a> ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo re et dolore magna aliqua.</td>
            <td data-column="Header Col 2">Lorem Ipsum</td>
            <td data-column="Header Col 3">Lorem Ipsum</td>
            <td data-column="Header Col 4">Lorem Ipsum</td>
        </tr>
        <tr>
            <td data-column="Header Col 1">Lorem Ipsum</td>
            <td data-column="Header Col 2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
            <td data-column="Header Col 3">Lorem Ipsum</td>
            <td data-column="Header Col 4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
        </tr>
        <tr>
            <td data-column="Header Col 1">Lorem Ipsum</td>
            <td data-column="Header Col 2">Lorem Ipsum</td>
            <td data-column="Header Col 3">Lorem Ipsum</td>
            <td data-column="Header Col 4">Lorem Ipsum</td>
        </tr>
        <tr>
            <td data-column="Header Col 1">Lorem Ipsum</td>
            <td data-column="Header Col 2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
            <td data-column="Header Col 3">Lorem Ipsum</td>
            <td data-column="Header Col 4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
        </tr>
    </tbody>
</table>


<!-- sliders elements -->
<div id="magnifyCarousel" class="owl-carousel owl-theme">
    <div class="item">
        <a href="https://cobo.com/" target="blank">
            <img src="/assets/revamp/img/logos/cobo.png" alt="Cobo">
            <a class="company-name" href="https://cobo.com/" target="blank">Cobo</a>
        </a>
    </div>
    <div class="item">
        <a href="https://edge.app/" target="blank">
            <img src="/assets/revamp/img/logos/edge.png" alt="Edge">
            <a class="company-name" href="https://edge.app/" target="blank">Edge</a>
        </a>
    </div>
    <div class="item">
        <a href="https://mycrypto.com/account" target="blank">
            <img src="/assets/revamp/img/logos/mycrypto.png" alt="My Crypto">
            <a class="company-name" href="https://mycrypto.com/account" target="blank">My Crypto</a>
        </a>
    </div>
    <div class="item">
        <a href="https://www.portis.io/" target="blank">
            <img src="/assets/revamp/img/logos/portis.png" alt="Portis">
            <a class="company-name" href="https://www.portis.io/" target="blank">Portis</a>
        </a>
    </div>
    <div class="item">
        <a href="https://www.uport.me/" target="blank">
            <img src="/assets/revamp/img/logos/uport.png" alt="U-Port">
            <a class="company-name" href="https://www.uport.me/" target="blank">U-Port</a>
        </a>
    </div>
    <div class="item">
        <a href="https://cobo.com/" target="blank">
            <img src="/assets/revamp/img/logos/cobo.png" alt="Cobo">
            <a class="company-name" href="https://cobo.com/" target="blank">Cobo</a>
        </a>
    </div>
</div>

<!-- full width carousel -->

<div id="fullCarousel" class="owl-carousel owl-theme">
    <div class="item" style="background-image: url(/assets/revamp/img/full-carousel-template-img.jpg);"> 
    </div>
   <div class="item" style="background-image: url(/assets/revamp/img/full-carousel-template-img.jpg);"> 
    </div>
    <div class="item" style="background-image: url(/assets/revamp/img/full-carousel-template-img.jpg);"> 
    </div>
    
</div>

<!-- sliders elements ends -->

---

Copy the smart contract from the following gist, or inline below:
<a href="https://gist.github.com/solangegueiros/6f30100662f8583ea39a49a5fa198b89" rel="noopener noreferrer" target="_blank"><code class="highlighter-rouge">Register.sol</code> gist</a>

<div class="language-shell highlighter-rouge">
    <div class="highlight">
    <pre class="highlight"><code>pragma solidity 0.5.4;

    contract Register {
        string private info;

        function setInfo(string memory _info) public {
            info = _info;
        }

        function getInfo() public view returns (string memory) {
            return info;
        }
    }
    </code></pre>
    </div>
</div>


> For Mac users type <code class="highlighter-rouge">pwd</code> to locate the current path you’re on.

<!-- tips -->
<div class="tips">
    <div class="tips-title">
        Tips:
    </div>
    <div class="tips-content">
        <span class="badge badge-tips"><a href="">--help</a></span> is your best friend
    </div>
</div>
<!-- tips ends-->
<!-- related topics -->
<div class="related-topics">
    <div class="related-topics-title">Related topics</div>
    <a href="#">Programming for the IoT</a> <a href="#">Lorem ipsum dolor sit amet</a> <a href="#">Lorem ipsum</a>
</div>
<!-- related topics ends -->


