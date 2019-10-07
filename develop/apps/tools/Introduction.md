---
layout: rsk
title: Libraries & Tools
---
Introduction
============

Overview
========

``RSKJs`` is the **JavaScript** Library within the **RSK 
Foundation**. Work is mainly done within the following GitHub organization:

- https://github.com/rsksmart

There are currently over 20 active repositories, most (with some exceptions like
`keythereum <https://github.com/ethereumjs/keythereum>`_ or  
`ethrpc <https://github.com/ethereumjs/ethrpc>`_) managed by the EF team.
Some central libraries are an implementation of the Ethereum 
`Virtual Machine <https://github.com/ethereumjs/ethereumjs-vm>`_, our
`Client <https://github.com/ethereumjs/ethereumjs-client>`_ project and
implementations of the `Merkle Patricia Tree <https://github.com/ethereumjs/merkle-patricia-tree>`_
data structure or the `devp2p <https://github.com/ethereumjs/ethereumjs-devp2p>`_
networking stack.

Have a look at the overview page linked above to get an impression what
is currently being worked on as well as other libraries available.

Focus and related Projects
==========================

Main focus of ``EthereumJS`` is to provide high-quality and robust implementations
of *core Ethereum infrastructure technologies* (virtual machine), *protocols* (devp2p)
and *data structures* (merkle tree).

Other related projects you might want to check out as well are e.g.:

- `web3.js <https://github.com/ethereum/web3.js/>`_ (Ethereum JavaScript API)
- `ethers.js <https://github.com/ethers-io/ethers.js>`_ (Ethereum Wallet implementation and library)
- `Truffle <https://github.com/trufflesuite>`_  (Development Framework)
- `embark <https://github.com/embark-framework/embark>`_ (dApp Framework)
- `Remix <https://github.com/ethereum/remix>`_ (https://github.com/ethereum/remix)

Most of the projects above also make use of some of our base-layer libraries.
``EthereumJS`` libraries are also used by various other actors within the ecosystem
like MetaMask, 0x or Augur.

.. _contact:

Team and Contact
================

``EthereumJS`` is a strongly community-driven project and the active team is 
regarded as the sum of people actively contributing to the 
libraries. Some people are also hired by the Ethereum Foundation to
provide a somewhat more solid ground on ongoing development and having people
with in-depth knowledge as steady contact persons for the libraries.

For technical questions as well as getting in touch you can use our ``Gitter`` 
channel:

- https://gitter.im/ethereum/ethereumjs

Organizational questions are centered and discussed on the ``organization`` repo:

- https://github.com/ethereumjs/organization

.. _ongoing_work_tasks:

Ongoing Work Tasks
==================

The following is an overview on ongoing work tasks to get an idea on the current
focus of work. This is also serving internal accounting purposes.

.. note::
   This list is focussing on reoccuring work tasks, for an overview on 
   dedicated new projects have a look at the :ref:`roadmap` section.


W1 - Virtual Machine Development
--------------------------------

One strong emphasis of ``EthereumJS`` work is on maintaining and further developing
a robust and up-to-date JavaScript virtual machine 
implementation (`ethereumjs-vm <https://github.com/ethereumjs/ethereumjs-vm>`_).

Main tasks around this are:

- Updating the VM on new hardforks
- Targeting compliance with the latest `consensus test suite <https://github.com/ethereum/tests>`_ releases
- Implementing feature requests from the community (Truffle, Remix, others), e.g. to provide better debugging functionalities
- Ongoing refactoring work to open up new use cases

W2 - Library Modernization
--------------------------

``EthereumJS`` libraries provide robust and solid implementations surving the
dedicated purposes, but code and API on many libraries lacks a bit behind
regarding modern, well-to-read and easy to use JavaScript features.

There is an ongoing effort to modernize the libraries, this nevertheless takes
time to not introduce new bugs or break existing APIs.

Currently there is a focus on (you are very much invited to help :-)):

- Using ``ES6`` classes for structuring library components
- JavaScript ``Promise`` based interfaces (in contrast to ``callback`` logic)
- Updating on security improving language features (block-scoped variables,...)
- Improving on code readability (destructuring of objects,...)

.. note::
   Complementary to this work is the task of establishing a robust transpilation
   process with tools like ``babel`` and others to make sure that our libraries
   are usable in environments where modern JS language features are not yet available

W3 - Bug Fixes and Maintenance
------------------------------

``EthereumJS`` libraries are widely used in production - often in security-sensitive
contexts - and there is an ongoing effort to keep libraries up-to-date and secure.

Main tasks around this:

- Fix bugs reported by the community in a timely fashion
- Keep library dependencies up-to-date
- Adopt libraries to various user work environments and build pipelines (browser, React,...)
- Be responsive to feature requests from the community

W4 - Testing and CI
-------------------

To provide a high level of reliable we target a high test coverage on all of our
libraries and writing new tests and integrate these in the everyday work process
(CI) is an ongoing effort.

Efforts include:

- Improve test coverage for library APIs
- Add and maintain integration tests (with a focus on browser testing)
- Integrate test runs / coverage reports into CI process
- Benchmark libraries, performance improvements for both library execution and tests


W5 - Community Work
-------------------

There is a high level of engagement from the community with the different 
``EthereumJS`` libraries and there are countless examples for both evolutionary
updates as well as high-quality and broadly scoped feature contributions from
the community.

We are determined to put substantial ressources here to further support
exchange with and engagement from the community.

Related tasks are:

- Help onboard new contributors, give introductory guidance
- Review of Pull Requests
- Accompany community development work
- Management and structuring of issues and PRs
- Responsiveness on communication channels

W6 - Accessibility
------------------

Very much related to the community efforts (W5) is the goal of making libraries
generally as easily approachable as possible and so to lower the barrier to 
engage and minimize the need to to do one-to-one explanations on how things work.

Tasks include:

- Provide up-to-date and consistent ``API`` documentation
- Instructions on environment setup and installation, developer docs
- Easy to recreate and up-to-date examples in ``README``
- Common standards and standard documentation (these docs :-)) whenever possible
- Easy to understand, modular and documented source code
