require 'nokogiri'
require 'pathname'

# executed just after page and document rendering
Jekyll::Hooks.register :pages, :post_render do |page_or_doc|
  customise_links!(page_or_doc)
end
Jekyll::Hooks.register :documents, :post_render do |page_or_doc|
  customise_links!(page_or_doc)
end

def customise_links!(p)
  url = p.url
  dom = Nokogiri::HTML(p.output)
  dom.css('a').each do |a|
    href = a.get_attribute('href')
    if href =~ /\Ahttp(s)?:\/\//i
      # handle external link
      process_link_external!(a, href)
    elsif href =~ /\A\//i
      # handle internal absolute link
      process_link_internal_absolute!(a, href, url)
    end
  end
  p.output = dom.to_s
end

def process_link_external!(a, href)
  # adds additional attributes to external links to that
  # they always open in a new page
  a.set_attribute('rel', 'external noopener noreferrer')
  a.set_attribute('target', '_blank')
end

def process_link_internal_absolute!(a, href, from_url)
  # for example when the current page is at /foo/bar/baz
  # and the link is for /quux/oof
  # this should change the link to ../../quux/oof
  from_path = Pathname.new(from_url.to_s)
  to_path = Pathname.new(href.to_s)
  relative_href = to_path.relative_path_from(from_path).to_s
  a.set_attribute('href', relative_href)
end
