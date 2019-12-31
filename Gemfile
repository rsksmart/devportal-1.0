source "https://rubygems.org"

gem "rouge"
source 'https://rubygems.org'

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem "jekyll", "~> 3.8.5"
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.11"
  gem 'github-pages', "202"
  gem "jekyll-last-modified-at"
  gem "jekyll-github-metadata"
  gem "jemoji"
end

gem 'wdm', '>= 0.1.0' if Gem.win_platform?
gem 'html-proofer'
gem 'rake'
