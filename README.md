## Requirements
- ***Ruby*** version 2.4.0 or above, including all development headers (ruby version can be checked by running ruby -v)
- ***RubyGems*** (which you can check by running gem -v)
- ***GCC and Make*** (in case your system doesn’t have them installed, which you can check by running gcc -v,g++ -v and make -v in your system’s command line interface)

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

## Host in local

Run the following cmds in the root.

If running for the first time, or dependencies have changed:
```shell
bundle install
```
To start the server:
```shell
bundle exec jekyll serve
```
You can browse to http://127.0.0.1:4000.