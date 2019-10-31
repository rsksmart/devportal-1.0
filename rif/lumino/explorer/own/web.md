---
layout: rsk
title: Lumino Explorer WEB
---

## Pre requisites

1. Lumino Explorer Api Running
2. Yarn (Latest Version)

## Build RIF Lumino Explorer WEB from code

1. Get the [RELEASE.NUMBER] code from [GITHUB.URL]
2. Go to the path you downloaded or cloned Lumino's code (lets call this path `$RIF_LUMINO_EXPLORER_WEB_PATH`)

```bash
yarn install
```

## Start your RIF Lumino Explorer WEB

1. Go to `$RIF_LUMINO_EXPLORER_WEB_PATH`
2. Run the following command:

```
RIF_LUMINO_EXPLORER_WEB_PATH=$YOUR_LUIMNO_API_HOST_AND_PORT yarn start
```

<table class="table">
  <thead>
    <tr>
      <th scope="col">FIELD</th>
      <th scope="col">DESCRIPTION</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td scope="row">$YOUR_LUIMNO_API_HOST_AND_PORT</td>
      <td>
        If this parameter is not present, the value that the application will take to invoke services to the api explorer will be http://localhost:8080
      </td>
    </tr>
  </tbody>
</table>

After you run yarn command, you will be presented with the following message:

```bash
yarn run $YOUR_YARN_VERSION
$ react-scripts start
Starting the development server...
Compiled successfully!

You can now view RIF-Lumino in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://$YOUR_PUBLIC_IP_MACHINE:3000/

Note that the development build is not optimized.
To create a production build, use yarn build.
```


## Additional help

The following sections are created using an Ubuntu 18.04.2 LTS


### Install Yarn

Download: [https://yarnpkg.com/en/docs/install#debian-stable](https://yarnpkg.com/en/docs/install#debian-stable))

You will first need to configure the repository:

``` curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - ```
```bash
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

Update your local APT repository:

```sudo apt-get update```

Install Yarn:

``````bash
sudo apt-get install --no-install-recommends yarn
``````

Test that Yarn is installed by running:

```bash
yarn --version
```

## Useful Links

* [RIF Lumino Network](https://www.rifos.org/rif-lumino-network/)
* [RIF Lumino Explorer](http://explorer.lumino.rifos.org/)
