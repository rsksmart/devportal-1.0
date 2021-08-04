---
layout: rsk
tags: rlogin, rif, rif-identity, beta, build, libraries, DID, infrastructure, mobile, protocols, mvp, design, rbtc, defi, decentralized, develop, git, quick-start, guides, tutorial, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

# RIF Identity Git approach

Strongly based on the [branching model](https://nvie.com/posts/a-successful-git-branching-model/) proposed by Vincent Driessen. Also named Gitflow in [this article](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

It is a strict branching model that refers to two main branches: `master` (or _main_) and `develop` (or _dev_).

**Quick summary**

- **Pull requests should point to `develop` by default - other cases are explained bellow**
- `master` (or `main`) has latest release - deployment or package distribution
- `develop` has latest approved feature - feature was reviewed and approved, but not yet released as final (they may have been released as `beta` versions)

Thanks for collaborating and contributing!

## Main branches 

All the code that is in `master` (or `main`) is code that is productive code: it means it is deployed or published as an NPM package. In our case, sometimes the release gets delayed due to some external dependencies, so we can assume that if the code is in `master`, it is ready to be delivered.
The code present in `develop` is part of the current work and, in most of the cases, is the immediate release, so it may be deployed or published as a _beta_ version. Neither `master` nor `develop` are personal branches, they are public branches and the code present there should compile and be ready to use/test. These branches are protected and are updated only through PRs.

`master` is updated through PRs from `develop` (normal case), `hotfix` branches or `release` branches. That PR should be merged using the _“Create a merge commit”_ option. We want to also identify the new versions with merge commits. After the PR is merged and everything deployed, a release tag is created.

**Important**

Every pull request to `develop` should be merged through a **rebase** or a **squash** commit.
Every pull request to `master` should be merged through a **merge** commit.

![Main branches](../assets/img/main-branches.png)

## Feature branches

These are personal branches and are always created from `develop`. They have a well defined lifecycle: they are created once the feature/bug/patch development starts and they are deleted once the PR gets approved and merged.

### How to create a feature branch?
```
git fetch origin
git checkout origin/develop
git checkout -b my-new-branch
```

Once you finish your work, don´t forget to push your `feature` branch and create a PR against `develop`.

NOTE: This pull request should be merged using the _“Rebase and merge”_ or _“Squash and merge”_ options. We prefer to not generate merge commits because then the project history will be full of empty merge commits and is difficult to find specific revisions.

**`feature` BRANCHES PRs NEVER GO DIRECTLY TO `master`**

![Feature branches](../assets/img/feature-branches.png)

## Release branches

If there is something in `develop` that is ready to be released but is waiting for another stuff and that code should be frozen until that, we should create a `release` branch. Why? Because `develop` will continue growing and we don’t want those new things to be included in the immediate release. `release` branches are created from `develop` the same way we created `feature` branches. We can also create `release` branches from a specific commit in `develop` if needed. These branches have to be named as _release-version_. Once a `release` branch is created, it becomes a public branch.

If the blocking stuff is code related and we are ready to address that, then a new `feature` branch will be created, but in this case, instead of creating it from `develop`, we create it from the `release` branch we’ve created before. This code is going to be merged into the `release` branch using the same strategy we used to merge into `develop`.
Once the `release` branch is ready, a PR is created to merge that code into `master` and then be released, but it should be also merged into `develop` because there could be code that has been added after the `release` branch has been created. 

Depending on the case, the PR to merge back into `develop` could be simple or not, sometimes it can throw unexpected conflicts, in those cases, the best option could be an auxiliary branch and use the cherry-pick command in order to pick the desired commits, and then create a PR to `develop` from that auxiliary branch.

**Important**

Every pull request to a `release` branch should be merged through _“Rebase and merge”_ or _“Squash and merge”_ options.

### How to create a release branch?

```
git fetch origin
git checkout origin/develop
git checkout -b release-version
git push origin release-version
```

### How to create a feature branch from the release branch?

```
git fetch origin
git checkout origin/release-version
git checkout -b my-feature-branch
```

Once you finish your work, don´t forget to push your `feature` branch and create a PR against the `release` branch, and once it is merged, create another PR against `develop`.

![Release branches](../assets/img/release-branches.png)
