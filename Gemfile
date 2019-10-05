source "https://rubygems.org"

gem "jekyll", "~> 3.8.3"
gem "rouge"
gem "jekyll-last-modified-at"
gem "jekyll-github-metadata"
source 'https://rubygems.org'

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'github-pages', versions['github-pages']
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
end

gem 'wdm', '>= 0.1.0' if Gem.win_platform?