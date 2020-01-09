# Windows computers instructions

## Requirements

- ***Ruby*** - including all development headers (ruby version can be checked by running `ruby -v`)
  - [RVM](https://rvm.io/) is recommended to install and switch between multiple Ruby versions.
- ***RubyGems*** - it is installed with Ruby (which you can check by running `gem -v`)
- ***GCC and Make*** (install MSYS2 which is included with Ruby installer)
- ***Jekyll*** (version can be checked by running `jekyll -v`)


## Installing the requirements

### Ruby
Check the correct version to install [here](https://github.com/solangegueiros/rsksmart.github.io/blob/master/Gemfile)<br/>
file: https://github.com/rsksmart/rsksmart.github.io/blob/master/Gemfile

```ruby version
ruby "2.6.3"
```

- Installers for windows: [https://rubyinstaller.org/](https://rubyinstaller.org/)

The version 2.6.3 is not the last, so you nedd to go here to find it:
- Old versions: [https://rubyinstaller.org/downloads/archives/](https://rubyinstaller.org/downloads/archives/)


 &nbsp;

![Ruby install path](https://github.com/solangegueiros/rsksmart.github.io/blob/feature/WindowsSetupInstructions/assets/img/windowsInstall/windowsInstall-01.png)

*Do not install in Program files, if you do it, after it not works because it do not find it.*

&nbsp;

![Check MSYS2](https://github.com/solangegueiros/rsksmart.github.io/blob/feature/WindowsSetupInstructions/assets/img/windowsInstall/windowsInstall-02.png)

*You need to install MSYS2 which is included with Ruby installer.*

&nbsp;

![Run ridk install](https://github.com/solangegueiros/rsksmart.github.io/blob/feature/WindowsSetupInstructions/assets/img/windowsInstall/windowsInstall-03.png)

*MSYS2 setup will run start automatically, at the end of Ruby installer.*

If it don't start automatically, at the end of Ruby installer, run `ridk install` to setup MSYS2 and development toolchain. 

&nbsp;

At terminal, choose option **1**

![At terminal, choose option **1**](https://github.com/solangegueiros/rsksmart.github.io/blob/feature/WindowsSetupInstructions/assets/img/windowsInstall/windowsInstall-04.png)


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

If you had this error:
Your Ruby version is 2.6.5, but your Gemfile specified 2.6.3
You must install the correct Ruby version, look [here](https://github.com/solangegueiros/test/blob/feature/WindowsSetupInstructions/windowsInstall.md#ruby).


Verify your installation:

```shell
ruby -v
bundler -v
bundle exec jekyll -v
```

None of these three commands should error,
and they should all print out their version numbers.

## Usage

### Development mode

```bash
bundle exec jekyll serve
```
You will now find a site located in `./_site` .
Each time you save a file, the site will get regenerated.

Open in the browser: [`https://localhost:4000/`](https://localhost:4000/).

&nbsp;

## Contributing

### Issues

When you open an issue, you should be given the option to choose a category.
Choose the most appropriate one.

Next, the description should be automatically populated from a template.
Fill it in accordingly. Note that **What** and **Why** sections are compulsory, and the **Refs** section is optional.

### Pull Requests

When you open a pull request, the description should be automatically populated
from a template. Fill it in accordingly. Note that **What** and **Why** sections are compulsory, and the **Refs** section is optional.

Please run `rake test` to test the build output of your branch prior to
creating a new pull request, or pushing more commits to an existing one.
Don't introduce any regressions!
