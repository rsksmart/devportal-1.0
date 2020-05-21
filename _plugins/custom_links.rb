require 'nokogiri'
require 'uri'

# executed just after page and document rendering
Jekyll::Hooks.register :pages, :post_render do |page_or_doc|
  customise_links!(page_or_doc)
end
Jekyll::Hooks.register :documents, :post_render do |page_or_doc|
  customise_links!(page_or_doc)
end

def customise_links!(p)
  dom = Nokogiri::HTML(p.output)
  dom.css('a').each do |a|
    href = a.get_attribute('href')
    if href =~ /\Ahttp(s)?:\/\//i
      # handle external link
      process_link_external!(a, href)
    end
  end
  p.output = dom.to_s
end

def process_link_external!(a, href)
  a.set_attribute('rel', 'external noopener noreferrer')
  a.set_attribute('target', '_blank')
  puts a.to_s
end
