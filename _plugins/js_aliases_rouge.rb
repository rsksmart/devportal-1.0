# This "hook" is executed right before the site's pages are rendered
Jekyll::Hooks.register :site, :pre_render do |site|
  puts "Adding more JavaScript Markdown aliases..."
  require "rouge"

  # This class defines the PDL lexer which is used to highlight "pdl" code snippets during render-time
  class MoreJSLexer < Rouge::Lexers::Javascript
    title 'MoreJS'
    aliases 'js', 'nodejs-repl', 'solidity'
  end
end

# Ref: https://stackoverflow.com/a/61882301/194982
