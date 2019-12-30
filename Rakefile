require 'html-proofer'

desc "build site for testing purposes"
task :build_for_test do
  sh "bundle exec jekyll build --config \"_config.yml,_config.localhost.yml\""
end

desc "check if built html is ok, note that this is slow"
task :test_html_proofer do
  options = {
    # run checks in parallel to speed up tests
    :parallel => { :in_processes => 4 },
    # check external links no more often than this
    # disabled because of "ArgumentError: invalid byte sequence in UTF-8"
    # :cache => { :timeframe => "1w" },
    :allow_hash_href => true,
    :alt_ignore => true,
    :empty_alt_ignore => true
  }
  HTMLProofer.check_directory("./_site", options).run
end

desc "run all tasks related to testing"
task :test => [:build_for_test, :test_html_proofer]
