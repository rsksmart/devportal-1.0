---
layout: revamp/rsk
title: Deploy a smart contract at RSK local node using Geth and Remix
page_index:  [ { 'name': 'Overview', 'href': '#overview' }, { 'name': 'Requirements', 'href': '#requirements' }, { 'name': 'Run a RSK local node', 'href': '#run-a-rsk-local-node' }, { 'name': 'Connect with a RSK local node using geth attach', 'href': '#connect-with-rsk-local-node' }, { 'name': 'Remix', 'href': '#remix' }, { 'name': 'Create a smart contract', 'href': '#create-a-smart-contract' } ]
---

<p>RSK’s virtual machine implementation is compatible with the Ethereum virtual machine (EVM), which enables us to make use of many of Ethereum developer tools.</p>
<p>In this tutorial I will show you step-by-step how to compile a smart contract using Remix and deploy it on a local node using
    Geth.</p>
<h3 id="overview">OVERVIEW</h3>
<p>We will do these steps:</p>
<ol class="two_columns">
    <li>Run a RSK local node;</li>
    <li>Connect with a RSK local node using Geth attach;</li>
    <li>Create a smart contract in Remix;</li>
    <li>Compile it;</li>
    <li>Create a Javascript deploy file; Geth attach;</li>
    <li>Deploy the smart contract in the Geth;</li>
    <li>Interact with the smart contract</li>
</ol>
<div class="big_separator">
</div>
<h3 id="requirements">REQUIREMENTS</h3>
<ul>
    <li>
        Java JDK
    </li>
    <li>
        RSK local node
    </li>
    <li>
        Geth
    </li>
    <li>
        Remix - web tool, online
    </li>
</ul>
<p>You will need to complete this tutorial before proceeding:</p>
<p><a href="../geth-attach-local-node/">Using Geth attach to a RSK local node</a></p>
<p><a href="#" target="_blank">This is an external link</a> with some text following.</p>
<div class="big_separator"></div>
<h3 id="run-a-rsk-local-node">RUN A RSK LOCAL NODE</h3>
<p>To run the node:</p>
<div class="language-shell highlighter-rouge">
    <div class="highlight">
        <pre class="highlight"><code>java <span class="nt">-cp</span> &lt;PATH-TO-THE-RSKJ-JAR&gt; co.rsk.Start <span class="nt">--regtest</span>
</code></pre>
    </div>
</div>
<p>(Replace with your path to the JAR file).</p>
<p>Check the tutorial: <a href="../geth-attach-local-node/">Using Geth attach to a RSK local node</a></p>
<p>for more details on how to do this.</p>
<div class="big_separator">
</div>
<h3 id="connect-with-rsk-local-node">CONNECT WITH A RSK LOCAL NODE USING GETH ATTACH</h3>
<div class="language-shell highlighter-rouge">
    <div class="highlight">
        <pre class="highlight"><code>geth attach http://127.0.0.1:4444
</code></pre>
    </div>
</div>
<p>Check the tutorial: <a href="../geth-attach-local-node/">Using Geth attach to a RSK local node</a> for more details on how to do this.</p>
<div class="big_separator">
</div>
<h3 id="remix">REMIX</h3>
<p>Go to <a href="http://remix.ethereum.org/" rel="external noopener noreferrer" target="_blank">REMIX</a> </p>
<p>In the <code class="highlighter-rouge">home page</code>, choose environment <code class="highlighter-rouge">Solidity</code></p>
<img class="img-fluid" src="/assets/revamp/img/img1.PNG" alt="">
<img class="img-fluid" src="/assets/revamp/img/img2.PNG" alt="">
<div class="big_separator">
</div>
<h3 id="connect-with-rsk-local-node">CREATE A SMART CONTRACT</h3>
<p>Create a new file</p>
<p>Click on the second button on the left side - file explorer</p>
<img class="img-fluid" src="/assets/revamp/img/img2.PNG" alt="">
<p>Click on the + button to create a new file</p>
<div class="small_separator">
</div>
<img class="img-fluid" src="/assets/revamp/img/img3.PNG" alt="">
<p>Copy the smart contract from the following gist, or inline below:</p>
<p><b>Register.sol gist</b></p>
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
<div class="small_separator">
</div>
<!-- table elements -->
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
<!-- table elements ends -->
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
<div class="small_separator"></div>
<p>Copy the smart contract from the following gist, or inline below:</p>
<p><a href="https://gist.github.com/solangegueiros/6f30100662f8583ea39a49a5fa198b89" rel="external noopener noreferrer" target="_blank"><code class="highlighter-rouge">Register.sol</code> gist</a></p>
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
<blockquote>
    <p>For Mac users type <code class="highlighter-rouge">pwd</code> to locate the current path you’re on.</p>
</blockquote>
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
    <h4>Related topics</h4>
    <a href="#">Programming for the IoT</a> <a href="#">Lorem ipsum dolor sit amet</a> <a href="#">Lorem ipsum</a>
</div>
<!-- related topics ends -->
