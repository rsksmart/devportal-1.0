# Used to lock to specific version of ruby, for consistency in CI
# See https://bundler.io/v1.5/gemfile_ruby.html
# Use https://rvm.io/ to manage multiple versions of ruby on your system
ruby "2.6.3"

source "https://rubygems.org"

gem "rouge", "3.11.0"
gem "faraday", "0.17.1"
gem "wdm", "0.1.1" if Gem.win_platform?
gem "html-proofer", "3.15.0"
gem "rake", "13.0.1"

gem "jekyll", "3.8.5"
group :jekyll_plugins do
  gem "jekyll-feed", "0.11"
  gem 'github-pages', "202"
  gem "jekyll-last-modified-at", "1.2.1"
  gem "jekyll-github-metadata", "2.12.1"
  gem "jemoji", "0.10.2"
  gem "jekyll-target-blank", "2.0.0" if ENV["RAKE_BUILD_FOR"] == "prod"
end

