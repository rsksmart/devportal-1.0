<!doctype html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="canonical" href="https://{{ site.domain }}{{ page.url }}">
  <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700|Roboto:300,400,400i,500,700" rel="stylesheet">
  <script defer src="/dist/scripts/fontawesome.5.0.6.all.js"></script>
  <title>{{ page.title }} - Docs - RSK Name Service</title>
  <link rel="stylesheet" href="/dist/styles/main.css">
  <link rel="stylesheet" href="/dist/styles/main-docs.css">
  <link rel="stylesheet" href="/dist/styles/main-docs-dark.css">
  <link rel="stylesheet" href="/dist/styles/code.css">
  <script src="/dist/scripts/jquery.js"></script>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-127960783-2"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-127960783-2');
  </script>
</head>
<body class="">
<!--[if IE]>
  <div class="alert alert-warning">
    You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.
  </div>
<![endif]-->
<header class="banner" role="banner">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark at-rest" role="navigation">
    <div class="container">
      <a class="navbar-brand" href="https://rsk.co/">
        <img class="logo" src="/dist/images/logo.png" alt="RSK"/>
      </a> 
      <div class="collapse navbar-collapse" id="primary-nav">
        <ul id="menu-primary-nav" class="nav navbar-nav ml-auto">
          <li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-38 nav-item">
            <a title="Github" href="https://github.com/rnsdomains/" class="nav-link">Github</a>
          </li>
          <li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-37 nav-item">
            <a title="Documentation" href="https://docs.rns.rsk.co/" class="nav-link">Documentation</a>
          </li>
          <li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-37 nav-item">
            <a title="RNS Manager" href="https://manager.rns.rsk.co" class="nav-link">Manager</a>
          </li>
        </ul>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#primary-nav" aria-controls="primary-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="toggle-icon"></span>
      </button>
    </div>
  </nav>
</header>

<div class="wrapper" role="document">
  <div class="hero">
    <div class="page-header">
      <div class="circles"></div>
    </div>
  </div>
  <div class="page-wrapper">
    <div class="content-wrap">
      <div class="container">
        {% include nav-breadcrumbs-actions.html %}
        <div id="main-content">
		      <h1 class="page-title">{{ page.title }}</h1>	 
		      <div class="page-metadata">
            <time role="presentation" datetime="{{ page.last_modified_at }}T00:00:00.000Z">{{ page.last_modified_at | date: '%Y-%m-%d' }}</time> | 
            {% assign words = content | number_of_words %}
            {{ words | divided_by:180 }} minutes to read
		      </div>
		      {{ content }}
        </div>
        <div id="main-menu">
		      {% include nav-page-menu.html %}
        </div>
      </div>
    </div>
  </div>
</div>

<footer class="content-info">
  <div class="container">
    <div class="row">
      <div class="col-2 bottom-margin no-mobile">
        <a href=""><img class="logo" src="/dist/images/logo-footer.png" alt="RNS"/></a>
      </div>
      <div class="col-md col-lg-2 bottom-margin">
        <section class="widget nav_menu-2 widget_nav_menu">
          <h4>RNS</h4>
          <ul id="menu-footer-1" class="menu">
            <li class="menu-item menu-solutions"><a href="https://rns.rsk.co/">Home</a></li>
            <li class="menu-item menu-framework"><a href="https://github.com/rnsdomains/">Github</a></li>
            <li class="active menu-item menu-get-started"><a href="https://docs.rsk.co/rsk-name-service-specification-en.pdf">Specification</a></li>
            <li class="menu-item menu-blog"><a href="https://githug.com/rnsdomains/RNSIPs/">Collaborate</a></li>
          </ul>
        </section>
      </div>
      <div class="col-md col-lg-2 bottom-margin">
        <section class="widget nav_menu-3 widget_nav_menu">
          <h4>Resources</h4>
          <ul id="menu-footer-2" class="menu">
            <li class="menu-item menu-about"><a href="https://manager.rns.rsk.co/">Manager</a></li>
            <li class="menu-item menu-contact"><a href="https://docs.rns.rsk.co/">Documentation</a></li>
            <li class="menu-item menu-blog"><a href="https://rsk.co/">RSK Smart</a></li>
          </ul>
        </section>
      </div>
      <div class="col-md col-lg-3 bottom-margin">
        <section class="widget nav_menu-3 widget_nav_menu">
          <h4>Github</h4>
          <ul id="menu-footer-2" class="menu">
            <li class="menu-item menu-about"><a href="https://githug.com/rnsdomains/RNS/">RNS Core</a></li>
            <li class="menu-item menu-contact"><a href="https://githug.com/rnsdomains/RNS-manager/">Manager</a></li>
            <li class="menu-item menu-blog"><a href="https://githug.com/rnsdomains/rnsdomains.github.io/">Documentation</a></li>
          </ul>
        </section>
      </div>
      <div class="col-md col-lg-3 bottom-margin">
        <section class="widget_text widget custom_html-2 widget_custom_html">
          <h4>Copyright</h4>
          <div class="textwidget custom-html-widget">
            <p>&copy; 2018 RSK Labs. All Rights Reserved.</p>
          </div>
        </section>
        <section class="widget_text widget custom_html-3 widget_custom_html">
          <div class="textwidget custom-html-widget">
            <p>
              <a class="soc-link" href="https://twitter.com/RSKsmart" target="_blank"><i class="fab fa-twitter"></i></a>
              <a class="soc-link" href="https://t.me/RSKsmartcontracts" target="_blank"><i class="fab fa-telegram-plane"></i></a>
              <a class="soc-link" href="https://github.com/rnsdomains" target="_blank"><i class="fab fa-github"></i></a>
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</footer>
<script src="/dist/scripts/main.js"></script>
</body>
</html>
