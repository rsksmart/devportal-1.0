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
  if (p.output_ext != '.html' || p.permalink&.end_with?('/'))
    return
  end
  url = p.url.to_s
  if (p.permalink&.end_with?('.html'))
    # need to indent one extra level for the purposes of
    # relative URL comparison
    url = Pathname.new(url).parent.to_s
  end
  dom = Nokogiri::HTML(p.output)
  dom.css('a').each do |a|
    href = a.get_attribute('href')
    if href =~ /\Ahttp(s)?:\/\//i
      # handle external link
      process_link_external!(a)
    elsif href =~ /\A\//i
      # handle internal absolute link
      process_link_internal_absolute!(a, href.to_s, 'href', url)
    end
  end
  dom.css('img, script').each do |img|
    src = img.get_attribute('src')
    if src =~ /\A\//i
      # handle internal absolute link
      process_link_internal_absolute!(img, src.to_s, 'src', url)
    end
  end
  dom.css('link').each do |link|
    href = link.get_attribute('href')
    if href =~ /\A\//i
      # handle internal absolute link
      process_link_internal_absolute!(link, href.to_s, 'href', url)
    end
  end
  p.output = dom.to_s
end

def process_link_external!(a)
  # adds additional attributes to external links to that
  # they always open in a new page
  a.set_attribute('rel', 'external noopener noreferrer')
  a.set_attribute('target', '_blank')
end

def process_link_internal_absolute!(elem, href, attr_name, from_url)
  # for example when the current page is at /foo/bar/baz
  # and the link is for /quux/oof
  # this should change the link to ../../quux/oof
  from_path = Pathname.new(from_url)
  to_path = Pathname.new(href)
  relative_path = to_path.relative_path_from(from_path).to_s
  elem.set_attribute(attr_name, relative_path)
end
