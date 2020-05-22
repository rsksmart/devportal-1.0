require 'nokogiri'
require 'pathname'

# executed just after page/document/post rendering, but before being written to disk
Jekyll::Hooks.register [ :pages, :posts, :documents ], :post_render do |p|
  customise_links!(p)
end

def customise_links!(p)
  site_url = p.site.config['url']
  domain_url = p.site.config['domain']
  site_redirect_base = p.site.config['redirect_base']
  from_url = p.url.to_s
  if (p.output_ext != '.html' && p.output_ext != '.htm')
    return
  end
  if (p.permalink&.end_with?('.html', '.htm'))
    # need to indent one extra level for the purposes of
    # relative URL comparison
    from_url = Pathname.new(from_url).parent.to_s
  end
  dom = Nokogiri::HTML(p.output)
  dom.css('a').each do |elem|
    href = elem.get_attribute('href')
    if (href =~ /\Ahttp(s)?:\/\//i || href =~ /\A\/\//i)
      # handle external link
      process_link_external!(elem)
    elsif href =~ /\A\//i
      # handle internal absolute link
      process_link_internal_absolute!(from_url, elem, 'href')
    end
  end
  dom.css('img, script').each do |elem|
    src = elem.get_attribute('src')
    if (src =~ /\A\//i && !(src =~ /\A\/\//i))
      # handle internal absolute link
      process_link_internal_absolute!(from_url, elem, 'src')
    end
  end
  dom.css('link').each do |elem|
    href = elem.get_attribute('href')
    if (href =~ /\A\//i && !(href =~ /\A\/\//i))
      # handle internal absolute link
      process_link_internal_absolute!(from_url, elem, 'href')
    end
  end
  dom.css('meta[http-equiv="refresh"]').each do |elem|
    process_meta_refresh_internal_absolute!(from_url, elem)
  end
  p.output = dom.to_s
end

def process_link_external!(a)
  # adds additional attributes to external links to that
  # they always open in a new page
  a.set_attribute('rel', 'external noopener noreferrer')
  a.set_attribute('target', '_blank')
end

def process_link_internal_absolute!(from_url, elem, attr_name)
  # for example when the current page is at /foo/bar/baz
  # and the link is for /quux/oof
  # this should change the link to ../../quux/oof
  from_path = Pathname.new(from_url)
  to_path = Pathname.new(elem.get_attribute(attr_name))
  relative_path = get_relative_path(from_path, to_path)
  elem.set_attribute(attr_name, relative_path)
end

def process_meta_refresh_internal_absolute!(from_url, elem)
  # special handling for redirects via a meta tag
  # requires `data-time` and `data-url` to be set
  from_path = Pathname.new(from_url)
  redirect_time = elem.get_attribute('data-time')
  redirect_url = elem.get_attribute('data-url')
  if (redirect_url.nil? || redirect_url.empty? || redirect_url =~ /\Ahttp(s)?:\/\//i)
    return
  end
  if (redirect_time.nil? || redirect_time.empty?)
    redirect_time = 0;
  end
  to_path = Pathname.new(redirect_url)
  relative_path = get_relative_path(from_path, to_path)
  elem.set_attribute('content', "#{redirect_time}; URL=#{relative_path}")
end

def get_relative_path(from_path, to_path)
  relative_path = to_path.relative_path_from(from_path).to_s
  if (
    !to_path.to_s.include?('#') &&
    !relative_path&.end_with?(
      '.js', '.css', '.png', '.svg', '.jpeg', '.jpg', '.html', '.htm'
    )
  )
    relative_path = relative_path + '/'
  end
  return relative_path.to_s
end
