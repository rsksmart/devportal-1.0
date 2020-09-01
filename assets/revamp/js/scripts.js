// LEFT NAVIGATION

// add level class to ul
$(".inner-nav-left ul").addClass(function() {
    var depth = jQuery(this).parents("ul").length;
    return "level level-" + (depth + 1);
});

// add active class to a in inner nav based on url
$(function () {
    const homeButton = $('#back-to-big-navbar');
    homeButton.hide();

    var pageUrl = location.href;
    $('.inner-nav-left a').each(function () {
        $(this).toggleClass('active', this.href === pageUrl);
    });

    // Put it here just in case it's executed before the previous iteration finish.
    $('.inner-nav-left .active').parentsUntil('.level-1').addClass('deployed green');

    active_ul = $('.inner-nav-left .active').parentsUntil('.level-1')
    replace = $(active_ul[active_ul.length-1]).find('.level-3').length > 0;
    if (replace) {
        const homeButton = $('#back-to-big-navbar');
        homeButton.show();
        const nav = $('#custom-navbar');
        nav.children().attr('id', 'custom-navbar-hidden').hide();
        nav.append($('<ul>').attr('id', 'custom-navbar-small').append($(active_ul[active_ul.length-1]).clone()));
    }

});
backToBigNavBar = function() {
  const nav = $('#custom-navbar-hidden');
  nav.show();
  const navSmall = $('#custom-navbar-small');
  if (navSmall) navSmall.hide();
  const homeButton = $('#back-to-big-navbar');
  homeButton.hide();
}



/*
$(document).ready(function () {
 $('.active').parentsUntil('.level-1').addClass('deployed green');
});
*/



  $('.inner-nav-left a[target="_blank"]').addClass('external');
  $('.inner-nav-left ul li:has(ul)').addClass('hassub');
  $('.inner-nav-left .external').prepend('<span class="external-icon"><i class="fa fa-external-link" aria-hidden="true"></i></span>');
  $('.inner-nav-left .hassub').prepend('<span class="caret-icon"><i class="fa fa-caret-right" aria-hidden="true"></i></span>');


// find clicked carret to deploy child ul
var curr = $('.caret-icon');
//$('.hassub ul').hide(); 
curr.click(function() {
    $(this).parent().toggleClass("deployed");
    //$(this).parent().find('ul').first().slideToggle();
});

// expand all nav
$(".toggle-nav-column-visibility").click(function() {
    var target = $(this);
    //use a class, since your ID gets mangled
    target.toggleClass("deployed");
    var isDeployed = target.hasClass('deployed');
    var targetText = isDeployed ? 'Collapse All' : 'Expand All';
    // update the text we just clicked on
    target.find('.text').text(targetText);
     // update every item in the collapsible menu
     $('.hassub').each(function () {
        $(this).toggleClass('deployed', isDeployed);
    });
 });

//THEME SWITCH
window.addEventListener('load', function() {
    //switch theme
    var toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    if (currentTheme === null) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleSwitch.checked = false;
    }
    if (currentTheme)
        if (currentTheme === 'light')
            toggleSwitch.checked = true;

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    }
    toggleSwitch.addEventListener('change', switchTheme, false);
});

//SCROLL TO LINK IN THE SAME PAGE
$("a[href^='#']").on("click", function(e) {
    e.preventDefault();
    var offset = $("header").height() + $('.header-inner').height();
    return $("html, body").animate({
        scrollTop: $(this.hash).offset().top - offset - 23 + 'px'
    }, 300);
});

//SHARE ICON
$('.share-redes').click(function() {
    $(".share-buttons-container").toggleClass("share-reveal");
    $('.twitter-btn, .chat-btn, #_hj_feedback_container').toggleClass('disable');
});

// TWITTER ASIDE
function openNav() {
    $('#twitter-sidebar').addClass('sidebar-open');
}
function closeNav() {
    $('#twitter-sidebar').removeClass('sidebar-open');
}

// ADD STICKY TO HEADER
$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {
        $('header').addClass('sticky');
    } else {
        $('header').removeClass('sticky');
    }
});

// ADD STICKY TO META ONLY ON DESKTOP
function myFunction(stickywidth) {
    if (stickywidth.matches) {
        $(window).scroll(function() {
            if ($(this).scrollTop() >= 100) {
                $('#beta_content_container').addClass('sticky');
                $('.header-inner').addClass('sticky');
                $('.page-title').addClass('sticky');
            } else {
                $('#beta_content_container').removeClass('sticky');
                $('.header-inner').removeClass('sticky');
                $('.page-title').removeClass('sticky');
            }
        });
    }
}
var stickywidth = window.matchMedia("(min-width: 992px)")
myFunction(stickywidth) // Call listener function at run time
stickywidth.addListener(myFunction) // Attach listener function on state changes

//SLIDERS
$('#magnifyCarousel').owlCarousel({
    autoplay: true,
    loop: true,
    dots: false,
    nav: true,
    center: true,
    URLhashListener: true,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        991: {
            items: 4
        },
        1350: {
            items: 5
        }
    }
});
$('#fullCarousel').owlCarousel({
    autoplay: false,
    loop: true,
    dots: false,
    nav: true,
    center: true,
    URLhashListener: true,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        991: {
            items: 1
        },
        1350: {
            items: 1
        }
    }
});

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
  scriptEl.setAttribute('src', '/assets/vendor/pegin-address-verifier/pegin-address-verifier.umd.js');
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
  if (!info) {
    result = `The address ${displayAddress} is not valid.`;
  } else {
    var displayAddressType = `<code>${info.type.toUpperCase()}</code>`;
    var displayNetwork = `<code>${info.network.charAt(0).toUpperCase()}${info.network.slice(1)}</code>`;
    var canPegIn = RskPegInAddressVerifier.canPegIn(info);
    if (canPegIn) {
      if (info.type == 'p2pkh'){
        result = `The address ${displayAddress
          } is a valid ${displayAddressType
          } address, and may peg in on ${displayNetwork}.`;
      }
      else{
        result = `The address ${displayAddress
        } is a valid ${displayAddressType
        } address, however, may not peg in on ${displayNetwork
        }. Please check the compatibility matrix.`;
      }
    } else {
      result = `The address ${displayAddress
        } is a valid ${displayAddressType
        } address, however, will not peg in on ${displayNetwork
        }.<br/><strong>Do not use</strong> this wallet, your BTC will be <strong>lost</strong>. Please check the compatibility matrix.`;
    }
  }
  document.querySelector('.pegin-address-verifier .result').innerHTML = result;
}

// render feature: custom terminals

function insertDomNodeRelativeTo(node, newNode, isAfter) {
  if (isAfter) {
    if (node.nextSibling) {
      // newNode will be after node, and before node's current next node
      node.parentNode.insertBefore(
        newNode,
        node.nextSibling,
      );
    } else {
      // newNode is after node, but node is the last child
      node.parentNode.appendChild(newNode);
    }
  } else {
    // newNode is before node
    node.parentNode.insertBefore(
      newNode,
      node,
    );
  }
}

function removeAllEmptyTextNodes(node) {
  if (!node) {
    return;
  }
  const childNodes = node.childNodes;
  var el;
  for (var i = 0; i < childNodes.length; ++i) {
    el = childNodes[i];
    if (el.nodeType === Node.TEXT_NODE &&
      !el.textContent.trim()) {
      node.removeChild(el);
    }
  }
}

function savedOsSelection(os) {
  if (!localStorage) {
    // older browsers simply skip this feature
    return undefined;
  }
  if (os) {
    // set value
    return localStorage.setItem('multi-terminal-renderer--selected-os', os);
  } else {
    // get value
    return localStorage.getItem('multi-terminal-renderer--selected-os');
  }
}

function renderCustomTerminalsSetup() {
  var elemNodeList = document.querySelectorAll(
    'a[title="multiple-terminals"]',
  );
  var elems = Array.prototype.slice.call(elemNodeList);
  elems.forEach(renderMultipleTerminals);
  renderCustomTerminalsFrames();
}

function renderMultipleTerminals(el) {
  let nextEl = el.parentNode.nextSibling;
  while (nextEl && nextEl.nodeType === Node.TEXT_NODE) {
    nextEl = nextEl.nextSibling;
  }
  if (!nextEl && nextEl.tagName !== 'UL') {
    console.warn('Expected an <ul> element:', el);
    return;
  }
  var ul = nextEl;
  var childNodeList = ul.querySelectorAll('li');
  var children = Array.prototype.slice.call(childNodeList);
  console.log(children);
  if (children.length === 0) {
    console.warn('Expected at least 1 <li> element:', ul);
    return;
  }
  var errorIndices = children.reduce(function(acc, li, liIdx) {
    if (!li.querySelector('code')) {
      acc.push(liIdx);
    }
    return acc;
  }, []);
  if (errorIndices.length > 0) {
    console.error(
      'Cannot render multi-terminal group, no <code> element within <li> at indices:',
      errorIndices,
    );
    return;
  }
  ul.classList.add('multi-terminal-group');
  children.forEach(function (li, liIdx) {
    renderMultipleTerminalsListElem(ul, li, liIdx);
  });
  document.body.addEventListener(
    'click', renderMultipleTerminalsOnClickTabTitle, false);
}

function renderMultipleTerminalsListElem(ul, li, liIdx) {
  // validation
  if (li.childNodes.length < 2 ||
      li.childNodes[0].nodeType !== Node.TEXT_NODE ||
      li.childNodes[1].nodeType !== Node.ELEMENT_NODE) {
    console.warn(
      `Child element #${liIdx} does not contain expected elements.`,
      ul,
      li,
    );
    return;
  }
  var tabText = li.childNodes[0].textContent.trim();
  var oses = tabText.split(', ').map(function (s) { return s.trim(); });
  oses.forEach(function (osText, osIdx) {
    renderMultipleTerminalsListElemOs(osText, osIdx, oses, li, liIdx, ul);
  });
}

function renderMultipleTerminalsListElemOs(osText, osIdx, oses, li, liIdx, ul) {
  var os = (osText.split(' ')[0]).toLowerCase();
  if (['linux', 'mac', 'windows'].indexOf(os) < 0) {
    console.warn(
      `Child element #${liIdx} does not reference a supported OS terminal.`,
      ul,
      li,
    );
    return;
  }
  var isLastOs = (osIdx === oses.length - 1);
  var tab = li;

  // create a tabTitle <span> to replace the text node in <li>,
  // in order to apply classes
  var tabTitle = document.createElement('span');
  tabTitle.textContent = osText;
  tabTitle.classList.add('multi-terminal-tabtitle');
  tabTitle.classList.add(`multi-terminal-tabtitle-${os}`);
  tabTitle.setAttribute('data-os', os);
  if (isLastOs) {
    tab.replaceChild(tabTitle, tab.childNodes[0]);
  } else {
    // we have to create a new list element as well
    var newTab = document.createElement('li');
    newTab.appendChild(tabTitle);
    insertDomNodeRelativeTo(tab, newTab, false);
    tab = newTab;
  }

  // create a new tabContent <div>
  // and move rest of contents of the <li> into this
  var tabContent = document.createElement('div');
  tabContent.classList.add('multi-terminal-tabcontent');
  tabContent.classList.add(`multi-terminal-tabcontent-${os}`);
  tabContent.setAttribute('data-os', os);
  for (let childIdx = 1; childIdx < li.childNodes.length; ++childIdx) {
    if (isLastOs) {
      tabContent.appendChild(li.childNodes[childIdx]);
    } else {
      tabContent.appendChild(li.childNodes[childIdx].cloneNode(true));
    }
  }
  removeAllEmptyTextNodes(tabContent);
  removeAllEmptyTextNodes(tabContent.querySelector('.language-shell'));
  removeAllEmptyTextNodes(tabContent.querySelector('.language-shell > .highlight'));

  // place the tabContent <div> immediately subsequent to the <ul>
  // to which this <li> belongs
  // also set the 1st one among them to be active,
  // otherwise none will be visible by default
  tab.classList.add('multi-terminal-tab');
  tab.classList.add(`multi-terminal-tab-${os}`);
  tab.setAttribute('data-os', os);
  var prevOs = savedOsSelection();
  var isActiveTab = (prevOs === os) ||
    (!prevOs && liIdx === 0 && osIdx === 0);
  tab.classList.toggle('active', isActiveTab);
  tabTitle.classList.toggle('active', isActiveTab);
  tabContent.classList.toggle('active', isActiveTab);
  insertDomNodeRelativeTo(ul, tabContent, true);
}

function renderMultipleTerminalsOnClickTabTitle (e) {
  var tabTitle = e.target;
  if (tabTitle.classList.contains('multi-terminal-tabtitle')) {
    var tab = tabTitle.parentNode;
    var os = tab.getAttribute('data-os');
    var allTabsNodeList =
      document.querySelectorAll('.multi-terminal-tab');
    var allTabs =
      Array.prototype.slice.call(allTabsNodeList);
    allTabs.forEach(function (currTab) {
      currTab.classList.toggle(
        'active',
        (currTab.getAttribute('data-os') === os),
      );
    });
    var allTabsContentNodeList =
      document.querySelectorAll('.multi-terminal-tabcontent');
    var allTabsContent =
      Array.prototype.slice.call(allTabsContentNodeList);
    allTabsContent.forEach(function (currTabContent) {
      currTabContent.classList.toggle(
        'active',
        (currTabContent.getAttribute('data-os') === os),
      );
    });
    savedOsSelection(os);
  }
}

function renderCustomTerminalsFrames() {
  var elemNodeList =
    document.querySelectorAll('.language-windows-command-prompt');
  var elems = Array.prototype.slice.call(elemNodeList);
  elems.forEach(function (el) {
    el.parentNode.classList.add('windows-command-prompt');
  });
}

// render feature: tables with borders

function renderTablesWithBorders() {
  $('table')
    .addClass('table-with-border');
}

// render feature: next elem class

function renderNextElemClassSetup() {
  var elemNodeList = document.querySelectorAll('a[title^="next-elem-class "]');
  var elems = Array.prototype.slice.call(elemNodeList);
  elems.forEach(renderNextElemClass);
}

function renderNextElemClass(el) {
  var classNames = el
    .getAttribute('title')
    .slice('next-elem-class '.length)
    .split(/\s+/);
  let nextEl = el.nextSibling;
  while (true) {
    if (nextEl && nextEl.nodeType === Node.TEXT_NODE) {
      const textContent = nextEl.textContent;
      if (!textContent || !textContent.trim()) {
        // skip empty or whitespace only text nodes
        nextEl = nextEl.nextSibling;
      } else {
        // convert text node to a <span>
        // in order to be able to apply classes to it
        const span = document.createElement('span');
        span.textContent = textContent;
        nextEl.parentNode.replaceChild(span, nextEl);
        nextEl = span;
        break;
      }
    } else {
      break;
    }
  }
  console.log(el, nextEl);
  if (!nextEl) {
    return;
  }
  el.parentNode.replaceChild(nextEl, el);
  classNames.map((className) => {
    nextEl.classList.add(className);
  });
}

$('#newsletter-form').submit(function() {

  var output = jQuery.map($(':checkbox[name=skillscb]:checked'), function (n, i) {
      return n.value;
  }).join(',');

  $("#mce-SKILLS").val(output);

  return true;
});




