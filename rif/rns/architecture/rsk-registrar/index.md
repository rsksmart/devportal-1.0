---
layout: rsk
title: .rsk Registrar
---

The registrar is separated into several components for simplicity, modularity, and privilege minimization. [RSK Owner](rskowner) is the owner of rsk top level domain, so it is the only contract that can invoke `setSubdomainOwner` in [RNS Registry](../registry#setsubnodeowner). It grants access to other contracts for registering new domains and/or renewing domain's expiration time. Currently we've enabled a [first-in first-served registrar](registrars/fifs) contract and a [simple renewer](renewers/renewer) contract that enable minimal actions to provide basic functionality for domain creation and administration.
