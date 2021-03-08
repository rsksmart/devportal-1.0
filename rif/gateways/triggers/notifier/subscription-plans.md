---
layout: rsk
title: RIF Notifier - Setup Subscription Plan
tags: rif, notifier, setup, subscription plan
---

This page provides a guide for developers to set up the subscription plans offered by provider for the RIF Notifier project.

### Contents:
 1. [Create Subscription Plans](#create-subscription-plans)
 2. [Update Subscription Plans](#update-subscription-plans)
 3. [Enable or Disable Subscription Plans](#enable-or-disable-subscription-plans)

#### **Create Subscription Plans**
1. One or more subscription plans can be created by modifying subscription-plan.json under resources folder with your own plan details.
2. All the json attributes are required. The notificationPreferences should only contain preferences that are enabled in application.yml
3. ```currency``` field in subscriptionPrice should be one of those currencies specified in rif.notifier.subscription.currencies property of application.yml 
4. Run bin/subscriptionplans.sh from the home directory of this project
5. If the json is correct, the plans will be created in the database.
6. A sample json structure is given below

```
[
  {
    "name": "RIF-10k",
    "notificationQuantity": 10000,
    "validity": 100,
    "notificationPreferences": "API,EMAIL",
    "status": true,
    "subscriptionPriceList": [
      {
        "price": "10",
        "currency": {
          "name":"RBTC",
          "address": "0xD9F3C552704B716EB2b825F20178181aB28F9eD8"
        }
      },
      {
        "price": "20",
        "currency": {
          "name":"RIF",
          "address": "0x2C51B7bed742689D13F8DFb74487410cFa0ccAF4"
        }
      }
    ]
  },
  {
    "name": "RIF-20k",
    "notificationQuantity": 20000,
    "validity": 100,
    "notificationPreferences": "API,EMAIL",
    "status": true,
    "subscriptionPriceList": [
      {
        "price": "20",
        "currency": {
          "name":"RBTC",
          "address": "0xD9F3C552704B716EB2b825F20178181aB28F9eD8"
        }
      },
      {
        "price": "40",
        "currency": {
          "name":"RIF",
          "address": "0x2C51B7bed742689D13F8DFb74487410cFa0ccAF4"
        }
      }
    ]
  }
]
```

#### **Update Subscription Plans**
1. A subscription plan that already exists can be updated. In order to update, the "id" attribute must be specified as part of the subscription-plan.json for the plan to be updated. 
2. All json attributes are required as given in subscription-plan.json. The notificationPreferences should only contain enabled preferences in application.yml
2. Modify subscription-plan.json under resources folder with your own plan details.
5. ```currency``` field in subscriptionPrice should be one of those currencies specified in rif.notifier.subscription.currencies property of application.yml 
6. Run bin/subscriptionplans.sh from the home directory of this project
7. If the json is correct, the plans will be created in the database.
8. A sample json structure for update operation is given below

```
[
  {
    "id":1,
    "name": "RIF-10k",
    "notificationQuantity": 10000,
    "validity": 150,
    "notificationPreferences": "API,EMAIL",
    "status": true,
    "subscriptionPriceList": [
      {
        "price": "10",
        "currency": {
          "name":"RBTC",
          "address": "0xD9F3C552704B716EB2b825F20178181aB28F9eD8"
        }
      },
      {
        "price": "20",
        "currency": {
          "name":"RIF",
          "address": "0x2C51B7bed742689D13F8DFb74487410cFa0ccAF4"
        }
      }
    ]
  },
  {
    "id":"2"
    "name": "RIF-20k",
    "notificationQuantity": 20000,
    "validity": 200,
    "notificationPreferences": "API,EMAIL",
    "status": true,
    "subscriptionPriceList": [
      {
        "price": "20",
        "currency": {
          "name":"RBTC",
          "address": "0xD9F3C552704B716EB2b825F20178181aB28F9eD8"
        }
      },
      {
        "price": "40",
        "currency": {
          "name":"RIF",
          "address": "0x2C51B7bed742689D13F8DFb74487410cFa0ccAF4"
        }
      }
    ]
  }
]

```

#### Enable or disable subscription plans
A subscription plan can be enabled or disabled by setting the "status" property to true or false in subscription-plan.json
