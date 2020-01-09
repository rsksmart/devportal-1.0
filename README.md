## Requirements

- ***Windows computers*** Requirements and install instructions: [click here](https://github.com/solangegueiros/rsksmart.github.io/blob/feature/WindowsSetupInstructions/WindowsInstall.md)
 
 &nbsp;

- ***Ruby*** version 2.6.3, including all development headers (ruby version can be checked by running `ruby -v`)
  - [RVM](https://rvm.io/) is recommended to install and switch between multiple Ruby versions.
- ***RubyGems*** (which you can check by running `gem -v`)
- ***GCC and Make*** (in case your system doesn’t have them installed, which you can check by running `gcc -v`,`g++ -v` and `make -v` in your system’s command line interface)


## Set up

Clone this repository, and run the following commands in its directory:

```shell
sudo gem install bundler
bundle update
bundle install
```

Verify your installation:

```shell
ruby -v
bundler -v
bundle exec jekyll -v
```

None of these three commands should error,
and they should all print out their version numbers.

## Usage

### Production build

```bash
rake prod
```

You will now find a site ready for production in `./_site`.

### Development mode

```bash
rake dev
```

You will now find a site located in `./_site`,
and this will be served at [`https://localhost:4000/`](https://localhost:4000/).
Each time you save a file, the site will get regenerated.

### Test build outputs

To run tests that check whether there are any errors in the site:

```bash
rake test
```

This run tests that check whether there are any errors in the site.
Currently runs the following basic checks:

- Detect broken links
- Validate generated JSON file used by search

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
