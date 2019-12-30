require 'json'
require 'html-proofer'

Rake::TaskManager.record_task_metadata = true

desc "development mode where site is rebuilt each time a file is saved"
task :dev => [] do |task|
  puts "rake> " + task.name + ": " + task.comment
  sh "bundle exec jekyll serve --trace --config \"_config.yml,_config.localhost.yml\""
end

desc "build site for testing purposes"
task :build_for_test => [] do |task|
  puts "rake> " + task.name + ": " + task.comment
  sh "bundle exec jekyll build --config \"_config.yml,_config.localhost.yml\""
  puts "rake> " + task.name + ": OK!"
end

desc "check if generated search json file is ok"
task :test_search_json => [:build_for_test] do |task|
  puts "rake> " + task.name + ": " + task.comment
  search_json_string = File.read("./_site/search/search.json")
  # JSON.parse throws an error if file is invalid JSON
  JSON.parse(search_json_string)
  puts "rake> " + task.name + ": OK!"
end

desc "check if built html is ok, note that this is slow"
task :test_html_proofer => [:build_for_test] do |task|
  puts "rake> " + task.name + ": " + task.comment
  options = {
    # run checks in parallel to speed up tests
    :parallel => { :in_processes => 8 },

    # check external links no more often than this
    # disabled because of "ArgumentError: invalid byte sequence in UTF-8"
    # :cache => { :timeframe => "1w" },

    # re-enable external checks when we get caching working
    :disable_external => true,

    # redirect links specify the domain,
    # and thus by default get treated as an external links,
    # so override this to treat them as internal links as they should be
    :internal_domains => ["localhost:4000"],

    :allow_hash_href => true,

    :alt_ignore => true,

    :empty_alt_ignore => true,

    # this sie contains "share by email" links,
    # which use "mailto:" without a to-address,
    # thus override this check
    :url_ignore => [/^mailto:\?subject=/]
  }
  HTMLProofer.check_directory("./_site", options).run
  puts "rake> " + task.name + ": OK!"
end

desc "run all tasks related to testing"
task :test => [:test_search_json, :test_html_proofer] do |task|
  puts "rake> " + task.name + ": " + task.comment
  puts "rake> " + task.name + ": OK!"
end
