# Windows computers instructions

## Requirements

- ***Ruby*** - including all development headers (ruby version can be checked by running `ruby -v`)
- ***RubyGems*** - it is installed with Ruby (which you can check by running `gem -v`)
- ***GCC and Make*** (install MSYS2 which is included with Ruby installer)
- ***Jekyll*** (version can be checked by running `jekyll -v`)


## Installing the requirements

### Ruby
Check the correct version to install [here](https://github.com/rsksmart/rsksmart.github.io/blob/master/Gemfile)<br/>
file: https://github.com/rsksmart/rsksmart.github.io/blob/master/Gemfile

```
ruby "2.6.3"
```

- Installers for windows: [https://rubyinstaller.org/](https://rubyinstaller.org/)

The version 2.6.3 is not the latest, so you need to go here to find it:
- Old versions: [https://rubyinstaller.org/downloads/archives/](https://rubyinstaller.org/downloads/archives/)

 &nbsp;

![Ruby install path](https://github.com/rsksmart/rsksmart.github.io/blob/master/assets/img/windowsInstall/windowsInstall-01.png)

*Do not install in Program files, as your system will be unable to find it if you do so.*

&nbsp;

![Check MSYS2](https://github.com/rsksmart/rsksmart.github.io/blob/master/assets/img/windowsInstall/windowsInstall-02.png)

*You need to install MSYS2 which is included with Ruby installer.*

&nbsp;

![Run ridk install](https://github.com/rsksmart/rsksmart.github.io/blob/master/assets/img/windowsInstall/windowsInstall-03.png)

*MSYS2 setup will run start automatically, at the end of Ruby installer.*

If it doesn't start automatically, at the end of Ruby installer, run `ridk install` to setup MSYS2 and development toolchain.

&nbsp;

At terminal, choose option **1**

![At terminal, choose option **1**](https://github.com/rsksmart/rsksmart.github.io/blob/master/assets/img/windowsInstall/windowsInstall-04.png)

&nbsp;

When you finished, at terminal, you can check if all is ok:

```shell
ruby -v
gem -v
```

&nbsp;

### Jekyll

At terminal:

```shell
gem install bundler jekyll
gem -v
```

Verify your installation:

```shell
bundler -v
jekyll -v
```

&nbsp;

## Set up

Clone this repository, and run the following commands in its directory:

```shell
bundle install
```

If you get an error similar to this:

```
Your Ruby version is 2.6.5, but your Gemfile specified 2.6.3
```

You must install the correct Ruby version, look [here](https://github.com/solangegueiros/test/blob/test/windowsInstall.md#ruby).

Verify your installation:

```shell
ruby -v
bundler -v
bundle exec jekyll -v
```

None of these three commands should error,
and they should all print out their version numbers.
