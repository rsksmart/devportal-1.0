// store dark /light theme

$(document).ready(function() {
  // Check local storage and set theme
  if(localStorage.theme) {
    $('html').addClass( localStorage.theme );
  } else {
    $('html').addClass('light'); // set default theme. No need to set via php now
  }

  if ($('html').hasClass('dark')) {
    $('#logo').attr('src','/assets/img/rsk_logo_reverse.svg');
    $('#theme-toggler').text('Light');
  } else {
   $('#logo').attr('src','/assets/img/rsk_logo.svg');
   $('#theme-toggler').text('Dark');
  }


  //Switch theme and store in local storage ...
  $("#theme-toggler").click(function() {
    if ($('html').hasClass( 'light')){
      $('html').removeClass('light').addClass('dark');
      $('#theme-toggler').text('Light');
      $('#logo').attr("src", "/assets/img/rsk_logo_reverse.svg");
      localStorage.theme = 'dark';
    } else {
      $('html').removeClass('dark').addClass('light');
      $('#theme-toggler').text('Dark');
      $('#logo').attr("src", "/assets/img/rsk_logo.svg");
      localStorage.theme = 'light';
    }
  });

  $('#frm-rns-search').on('submit', (e) => {
    e.preventDefault();
    window.open('https://manager.rns.rifos.org/search?domain=' + $('#txt-rns-name').val(), '_blank');
  });
});

// smooth scroll to anchor links with offset
$(document).ready(function() {
var hash= window.location.hash
if ( hash == '' || hash == '#' || hash == undefined ) return false;
      var target = $(hash);
      headerHeight = 80;
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').stop().animate({
          scrollTop: target.offset().top - 80 //offsets for fixed header
        }, 'linear');
      }
});


$(document).ready(function () {
  setUpMainSearch();
  const renderFeatures = $('.render-features')
    .data('features')
    .split(/\s+/);
  renderFeatures.forEach((feature) => {
    switch (feature) {
      case '':
        // do nothing when render features list is empty
        return;
      case 'tables-with-borders':
        renderTablesWithBorders();
        return;
      case 'custom-terminals':
        renderCustomTerminals();
        return;
      case 'equations':
        renderEquationsSetup();
        return;
      case '2-way-peg-verifier':
        render2WayPegVerifierSetup();
        return;
      default:
        console.error('Unsupported render feature:', feature);
    }
  });
});

// add active class to a in inner nav based on url
$(function () {
  var pageUrl = location.href;
  $('a').each(function () {
    $(this).toggleClass('active', this.href === pageUrl);
	});
});

$(document).ready(function () {
  $('ul li:has(ul)', '.menu-container').addClass('subnav');
  $('.desktop_accordion .subnav > a').click(function (event) {
    event.preventDefault();
    $(this).parent().toggleClass('rotate-chevron');
    $(this).next('ul').toggleClass('subnav-reveal');
  });
});

$('a[href^="#"]').on('click', function (event) {
  var target = $(this.getAttribute('href'));
  if (target.length) {
    event.preventDefault();
    $('html, body').stop().animate({
      scrollTop: target.offset().top - 100
    }, 1000);
  }
});

$(document).ready(function () {
  // set all links within the collapsible menu to not have `current`,
  // except for the one link that points to the current page
  var pageUrl = location.href;
  $('.desktop_accordion ul li a').each(function () {
    $(this).toggleClass('current', this.href === pageUrl);
  });

  // traverse up the list of parents until we get to the top,
  // building up the links to them along the way for use as breadcrumbs,
  // plus setting them to `current` as well, so that they appear expanded
  var crumbs = $('.current').parentsUntil('.exclude-doc-from-breadcrumbs')
    .prev('a').add('.current')
    .map(function () {
      var link = $(this).attr('href');
      var link_text = $(this).text();
      var title = $(this).attr('title');
      var bc = '<li><a href='+link+' title='+''+'>'+link_text+'</a></li>';
      return bc;
    }).get().join('  ');
  $('.breadcrumb').html(crumbs);
});

$(document).ready(function () {
  var liText = '', liList = $('.breadcrumb li'), listForRemove = [];
  $(liList).each(function () {
    var text = $(this).text();
    if (liText.indexOf('|'+ text + '|') == -1) {
      liText += '|'+ text + '|';
    } else {
      listForRemove.push($(this));
    }
  });
  $(listForRemove).each(function () { $(this).remove(); });
});

$(document).ready(function () {
 $('.current').parentsUntil('.first_level').addClass('subnav-reveal rotate-chevron');
 $('.current').parents().addClass('rotate-chevron current');
 $('.toggle-nav-column-visibility').on('click', toggleNavColumnVisibility);
});

// Header scroll class
$(window).scroll(function () {
  if ($(this).scrollTop() > 10) {
    $('.navbar').addClass('header-scrolled');
    $('.logo').addClass('header-scrolled');
    $('.navbar-toggler-icon').addClass('header-scrolled');
    $('.navbar_bottom_shape').addClass('header-scrolled');
  } else {
    $('.navbar').removeClass('header-scrolled');
    $('.logo').removeClass('header-scrolled');
    $('.navbar-toggler-icon').removeClass('header-scrolled');
    $('.navbar_bottom_shape').removeClass('header-scrolled');
  }
});


// toggle between expand all and collapse all
function toggleNavColumnVisibility (e) {
  // work out whether we are expanding or collapsing
  var target = $(this);
  target.toggleClass('collapsed');
  var isCollapsed = target.hasClass('collapsed');
  var targetText = isCollapsed ? 'Expand All' : 'Collapse All';

  // update the text we just clicked on
  target.find('.text').text(targetText);
  target.toggleClass('rotate-chevron', !isCollapsed);

  // update every item in the collapsible menu
  $('.desktop_accordion .subnav > a').each(function () {
    $(this).parent().toggleClass('rotate-chevron', !isCollapsed);
    $(this).next('ul').toggleClass('subnav-reveal', !isCollapsed);
  });

  return false;
}

// search

function setUpMainSearch () {
  if (document.location.pathname.indexOf('/search/') !== 0) {
    // only relevant on the search page
    return;
  }
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('results-container');
  const searchResultTemplate =
    `<div class="container"><br/><div class="row"><a href="{url}"><h1>{title}</h1></a></div>{desc}<br/>{tags}</div>`;

  const defaultTruncateWordNum = 20;

  function truncateWords(str, numWords = defaultTruncateWordNum) {
    return str.split(' ').splice(0, numWords).join(' ');
  }

  function templateMiddleware (prop, text) {
    $('.page-title').text(() => `Search results for "${searchInput.value}"`);

    if (prop === 'desc') {
      const searchInputValue = searchInput.value.toLowerCase();
      const matchValueAndSiblings =
        new RegExp('.(' + searchInputValue + ')\\b.*.', 'ig');
      const decodedText = decodeURIComponent(text);

      const result = [...decodedText.matchAll(matchValueAndSiblings)];

      if (!result || result.length < 1) {
        // No match found, so we cannot skip ahead to that.
        // Instead we simply return the text from the start.
        const truncatedDesc = truncateWords(text);
        const truncatedResult =
          `<div class="row"><div class="col p-0">${truncatedDesc}</div></div>`;
        return truncatedResult;
      }

      //only shows the first result and its first few words
      const resultString = truncateWords(result[0][0]);
      const isUniqueResult = (result[0].length == 1);
      const otherResults =
        `<div class="row pt-0 pl-3" style="font-style: italic;">(multiple matches found)</div>`;
      const uniqueAndMaybeOtherResults =
        isUniqueResult ? resultString : resultString + otherResults;
      const parsedResult =
        `<div class="row"><div class="col p-0">${uniqueAndMaybeOtherResults}</div></div>`;

      return parsedResult;
    } else if (prop === 'tags') {
      if (text === '') {
        return `<span class="badge badge-secondary p-1">(no tags)</span>`;
      }
      const badges = text
        .split(', ')
        .map(
          (tag) => (`<a href="${`?q=${tag}&from=%2Fsearch%2F`}"><span class="badge badge-secondary p-1">${tag}</span><a/>`),
        )
        .join('');

      return `<div class="row">${badges}<div>`;
    }
  }

  $.getJSON('/search/search.json', function (searchJson) {
    // defer initialisation of search feature until *after*
    // we have loaded the search JSON manually,
    // because search feature does not provide event or callback
    // to signal completion of asynchronous load of data
    const search = SimpleJekyllSearch({
      searchInput,
      resultsContainer,
      json: searchJson,
      searchResultTemplate,
      limit: 10,
      fuzzy: false,
      templateMiddleware,
    });
    try {
      // if quick search has been used, use query parameters in URL to
      // perform search immediately
      const queryParams = (new URL(document.location)).searchParams;
      const q = queryParams.get('q');
      if (typeof q !== 'undefined') {
        searchInput.value = q;
        setTimeout(function () {
          search.search(q);
        }, 0);
      }
    } catch (ex) {
      // do nothing
    }
  });
}

// render feature: equations

function renderEquationsSetup() {
  // katex for rendering math equations
  // <link
  //   rel="stylesheet"
  //   href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
  //   integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq"
  //   crossorigin="anonymous">
  const linkEl = document.createElement('link');
  linkEl.setAttribute('rel', 'stylesheet');
  linkEl.setAttribute('href', 'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css');
  linkEl.setAttribute('integrity', 'sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq');
  linkEl.setAttribute('crossorigin', 'anonymous');
  document.body.appendChild(linkEl);
  // <script
  //   defer
  //   src="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js"
  //   integrity="sha384-y23I5Q6l+B6vatafAwxRu/0oK/79VlbSz7Q9aiSZUvyWYIYsd+qj+o24G5ZU2zJz"
  //   crossorigin="anonymous"
  //   onload="renderEquations();">
  // </script>
  const scriptEl = document.createElement('script');
  scriptEl.setAttribute('defer', 'defer');
  scriptEl.setAttribute('src', 'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js');
  scriptEl.setAttribute('integrity', 'sha384-y23I5Q6l+B6vatafAwxRu/0oK/79VlbSz7Q9aiSZUvyWYIYsd+qj+o24G5ZU2zJz');
  scriptEl.setAttribute('crossorigin', 'anonymous');
  scriptEl.setAttribute('onload', 'renderEquations();');
  document.body.appendChild(scriptEl);
}

function renderEquations() {
  var elemNodeList = document.querySelectorAll('a[title^="tex-render "]');
  var elems = Array.prototype.slice.call(elemNodeList);
  elems.forEach(renderEquation);
}

function renderEquation(el) {
  var equation = el.getAttribute('title').slice('tex-render '.length);
  var equationEl = document.createElement('span');
  katex.render(equation, equationEl, {
    throwOnError: false,
  });
  equationEl.setAttribute('title', equation);
  equationEl.classList.add('tex-rendered');
  el.replaceWith(equationEl);
}

// render feature: 2-way peg verifier

function render2WayPegVerifierSetup() {
  // <script
  //   defer
  //   src="/assets/js/pegin-address-verifier.umd.js"
  //   onload="render2WayPegVerifier();">
  // </script>
  const scriptEl = document.createElement('script');
  scriptEl.setAttribute('defer', 'defer');
  scriptEl.setAttribute('src', '/assets/js/pegin-address-verifier.umd.js');
  scriptEl.setAttribute('onload', 'render2WayPegVerifier();');
  document.body.appendChild(scriptEl);
}

function render2WayPegVerifier() {
  var originalElem = document.querySelector('a[title="pegin-address-verifier"]');
  var newElem = document.createElement('div');
  newElem.innerHTML = `
    <div class="pegin-address-verifier">
      <input type="text" class="address">
      <button class="check green-button">Check</button>
      <div class="result"></div>
    </div>
  `;
  originalElem.parentNode.replaceChild(newElem, originalElem);
  document.querySelector('.pegin-address-verifier .check').addEventListener('click', render2WayPegVerifierCheck);
}

function render2WayPegVerifierCheck() {
  var result;
  var address = document.querySelector('.pegin-address-verifier .address').value;
  var info = RskPegInAddressVerifier.getAddressInformation(address);
  // e.g. {"network":"testnet","type":"p2pkh"}
  var displayAddress = `<code>${address}</code>`;
  var displayAddressType = `<code>${info.type.toUpperCase()}</code>`;
  var displayNetwork = `<code>${info.network.charAt(0).toUpperCase()}${info.network.slice(1)}</code>`;
  if (!info) {
    result = `The address ${displayAddress} is not valid.`;
  } else {
    var canPegIn = RskPegInAddressVerifier.canPegIn(info);
    if (canPegIn) {
      result = `The address ${displayAddress
        } is a valid ${displayAddressType
        } address, and may peg in on ${displayNetwork}.`;
    } else {
      result = `The address ${displayAddress
        } is a valid ${displayAddressType
        } address, however, may not peg in on ${displayNetwork
        }. Please check the compatibility matrix.`;
    }
  }
  document.querySelector('.pegin-address-verifier .result').innerHTML = result;
}

// render feature: custom terminals

function renderCustomTerminals() {
  $('.language-windows-command-prompt')
    .parent()
    .addClass('windows-command-prompt')
}

// render feature: tables with borders

function renderTablesWithBorders() {
  $('table')
    .addClass('table-with-border');
}

$('#newsletter-form').submit(function() {

  var output = jQuery.map($(':checkbox[name=skillscb]:checked'), function (n, i) {
      return n.value;
  }).join(',');

  $("#mce-SKILLS").val(output);

  return true;
});