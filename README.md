## Requirements
- ***Ruby*** version 2.4.0 or above, including all development headers (ruby version can be checked by running ruby -v)
- ***RubyGems*** (which you can check by running gem -v)
- ***GCC and Make*** (in case your system doesn’t have them installed, which you can check by running gcc -v,g++ -v and make -v in your system’s command line interface)

## Install Jekyll
#### On Mojave (10.14)
```shell
sudo gem install bundler
sudo gem install -n /usr/local/bin/ jekyll
```
#### Before Mojave (<10.14)
```shell
sudo gem install bundler jekyll
```
## Host in local

Run the cmd below in the root
```shell
bundle exec jekyll serve
```
You can browse to http://127.0.0.1:4000.


