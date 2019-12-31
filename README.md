## Requirements

- ***Ruby*** version 2.4.0 or above, including all development headers (ruby version can be checked by running `ruby -v`)
- ***RubyGems*** (which you can check by running `gem -v`)
- ***GCC and Make*** (in case your system doesn’t have them installed, which you can check by running `gcc -v`,`g++ -v` and `make -v` in your system’s command line interface)

## Install Jekyll

#### On MacOS Mojave (10.14)

```shell
sudo gem install bundler
sudo gem install -n /usr/local/bin/ jekyll
```
#### Before MacOS Mojave (<10.14)

```shell
sudo gem install bundler jekyll
```

#### Ubuntu

```shell
sudo gem install bundler
sudo gem install jekyll
```

## Usage

To create a production build:

```bash
rake prod
```

You will now find a site ready for production in `./_site`.

To run in development mode:

```bash
rake dev
```

You will now find a site located in `./_site`,
and this will be served at [`https://localhost:4000/`](https://localhost:4000/).
Each time you save a file, the site will get regenerated.

To run tests that check whether there are any errors in the site:

```bash
rake test
```

This currently runs the following basic checks:

- Detect broken links
- Validate generated JSON file used by search
