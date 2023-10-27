# Used to lock to specific version of ruby, for consistency in CI
# See https://bundler.io/v1.5/gemfile_ruby.html
# Use https://rvm.io/ to manage multiple versions of ruby on your system
ruby "2.6.3"

source "https://rubygems.org"

gem "kramdown", "2.3.1"
gem "rouge", "3.19.0"
gem "faraday", "0.17.1"
gem "wdm", "0.1.1" if Gem.win_platform?
gem "html-proofer", "3.15.3"
gem "rake", "13.0.1"
gem "mdl", "0.9.0"

gem "jekyll", "4.0.1"
group :jekyll_plugins do
  gem "jekyll-feed", "0.13.0"
  gem "jekyll-sitemap", "1.4.0"
  gem "jekyll-last-modified-at", "1.3.0"
  gem "jemoji", "0.12.0"
end
