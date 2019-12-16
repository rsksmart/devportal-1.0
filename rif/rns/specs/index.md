---
layout: rsk
title: RNS Specs
description: "RNS specifications, and name mapping convention"
---

The domain name space is a tree structure. Each node and leaf on the tree corresponds to a resource set (which may be empty). The domain system makes no distinctions between the uses of the interior nodes and leaves, and this memo uses the term "node" to refer to both.

The domain name of a node is the list of the labels on the path from the node to the root of the tree.  By convention, the labels that compose a domain name are printed or read left to right, from the most specific (lowest, farthest from the root) to the least specific (highest, closest to the root).

When a user needs to type a domain name, the length of each label is omitted and the labels are separated by dots (".").  Since a complete domain name ends with the root label, this leads to a printed form which ends in a dot, that is omitted. For example, a valid domain name is `wallet.alice.rsk`.

### Name mapping convention

Each domain name has a node identifier in the RNS Registry, that is obtained via `namehash` functions, that is as follows:

```py
def namehash(name):
  if name == '':
    return '\0' * 32
  else:
    label, _, remainder = name.partition('.')
    return sha3(namehash(remainder) + sha3(label))
```

Given a `node`, a `subnode` can be identified by using its label: `sha3(namehash(node) + sha3(label))`

Further reading:
- [Registry specs](registry)
- [Resolver specs](resolvers)
