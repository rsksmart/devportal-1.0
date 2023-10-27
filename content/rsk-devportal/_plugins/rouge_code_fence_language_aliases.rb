# executed just before the pages rendering
Jekyll::Hooks.register :site, :pre_render do |site|
  require "rouge"
  puts "rouge code fence language aliases..."

  # extend rouge lexers to add custom aliases

  # javascript
  class LanguageAliasesForJavascript < Rouge::Lexers::Javascript
    title 'LanguageAliasesForJavascript'
    aliases 'js', 'nodejs-repl', 'solidity'
  end
end
