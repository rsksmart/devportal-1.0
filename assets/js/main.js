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
        renderCustomTerminalsSetup();
        return;
      case 'equations':
        renderEquationsSetup();
        return;
      case '2-way-peg-verifier':
        render2WayPegVerifierSetup();
        return;
      case 'next-elem-class':
        renderNextElemClassSetup();
        return;
      case 'rsk-token-bridge-support':
        renderRskTokenBridgeSupportSetup();
        return;
      case 'collapsible':
        renderCollapsibleSetup();
        return
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
  setupFeature('a[title^="tex-render "]', renderEquation);
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

// render feature: Rsk Token Bridge Support

function renderRskTokenBridgeSupportSetup() {
  // <script src="https://cdn.jsdelivr.net/npm/markdown-it@12.0.6/dist/markdown-it.js" integrity="sha256-/MFRLGofgwznc7HHZUDrZc092i65/yOFgHEdGI7qCDQ=" crossorigin="anonymous"></script>
  const scriptEl2 = document.createElement('script');
  scriptEl2.setAttribute('defer', 'defer');
  scriptEl2.setAttribute('integrity', 'sha256-/MFRLGofgwznc7HHZUDrZc092i65/yOFgHEdGI7qCDQ=');
  scriptEl2.setAttribute('crossorigin', 'anonymous');
  scriptEl2.setAttribute('src', 'https://cdn.jsdelivr.net/npm/markdown-it@12.0.6/dist/markdown-it.js');
  document.body.appendChild(scriptEl2);
  // <script src="https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js" integrity="sha256-JLmknTdUZeZZ267LP9qB+/DT7tvxOOKctSKeUC2KT6E=" crossorigin="anonymous"></script>
  const scriptEl = document.createElement('script');
  scriptEl.setAttribute('defer', 'defer');
  scriptEl.setAttribute('integrity', 'sha256-JLmknTdUZeZZ267LP9qB+/DT7tvxOOKctSKeUC2KT6E=');
  scriptEl.setAttribute('crossorigin', 'anonymous');
  scriptEl.setAttribute('src', 'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js');
  scriptEl.setAttribute('onload', 'renderRskTokenBridgeSupport();');
  document.body.appendChild(scriptEl);
}

function renderRskTokenBridgeSupport() {
  const checkButton = document.querySelector('#rsk-token-bridge-support-check-button');
  checkButton.addEventListener('click', onRskTokenBridgeSupportCheckButtonClicked);
}

function onRskTokenBridgeSupportCheckButtonClicked() {
  const selfServiceSupportBaseUrl = 'https://self-service.rsk.co';
  const txHash = document.querySelector('#rsk-token-bridge-support-txHash').value;
  const fromNetwork = document.querySelector('#rsk-token-bridge-support-fromNetwork').value;
  const walletName = document.querySelector('#rsk-token-bridge-support-walletName').value;
  const outputArea = document.querySelector('.rsk-token-bridge-support-output-area');
  const url =
    `${selfServiceSupportBaseUrl}/api/v1/rsk-token-bridge/options?fromNetwork=${fromNetwork}&txHash=${txHash}&walletName=${walletName}`;
  const reqOptions = {
    url,
    method: 'get',
    headers: {
      'Accept': 'application/json',
    },
    timeout: 2000,
    responseType: 'html',
  };
  axios
    .request(reqOptions)
    .then((response) => {
      console.log(response);
      removeSubsequentElems('.main-central-col', '.rsk-token-bridge-support', 'p');
      const responseDataOptions = (response && response.data && response.data.options);
      if (!responseDataOptions) {
        outputArea.innerText = `Error\n\nUnable to render fetched response\n\n`;
      } else {
        const outputHtml = renderSelfServiceSupportOptionsToHtml(responseDataOptions);
        outputArea.innerHTML = `<h2>Result</h2><br>${outputHtml}`;
      }
    })
    .catch((error) => {
      console.error(error);
      const errorResponseData = (error && error.response && error.response.data);
      if (errorResponseData) {
        outputArea.innerText = `Error\n\n${errorResponseData.error}\n\n${errorResponseData.value.join('\n\n')}\n\n`;
      } else {
        outputArea.innerText = `Error\n\n${error.message}\n\n`;
      }
    });
}

function removeSubsequentElems(parentSelector, childSelector, subsequentChildSelector) {
  const parentNode = document.querySelector(parentSelector);
  const subsequentElems = Array.from(
    parentNode.querySelectorAll(`${childSelector} ~ ${subsequentChildSelector}`),
  );
  subsequentElems.forEach(function(el) {
    parentNode.removeChild(el);
  });
  return subsequentElems;
}

function renderSelfServiceSupportOptionsToHtml(options) {
  const markdownItInstance = window.markdownit();
  const html = options
    .map((option) => {
      const { id, question, answer } = option;
      const questionHtml = markdownItInstance.render(question);
      const answerHtml = markdownItInstance.render(answer);
      return `
      <div class="question-and-answer">
        <h3 id="question--${id}" class="question">${questionHtml}</h3>
        <span class="answer">${answerHtml}</span>
      </div>
      `;
    })
    .join('\n\n');
  return html;
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
  setupFeature('a[title="multiple-terminals"]', renderMultipleTerminals)
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
  setupFeature('a[title^="next-elem-class "]', renderNextElemClass);
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


function setupFeature(querySelector, featureRenderer) {
  const elemNodeList = document.querySelectorAll(
    querySelector,
  );
  const elems = Array.prototype.slice.call(elemNodeList);
  elems.forEach(featureRenderer);
}

// render features: 'collapsible'

function renderCollapsibleSetup() {
  setupFeature('a[title="collapsible"]', renderCollapsible);
}

function renderAccordionHeader(li, headerId, bodyId, isOpen) {
  if (!li.firstChild) {
    console.warn('Missing li child used as accordion header')
    return
  }
  const headerContainer = document.createElement('div');
  headerContainer.setAttribute("id", headerId);
  headerContainer.classList.add("card-header");
  const a = document.createElement("a");
  a.classList.add("btn");
  
  a.setAttribute("data-toggle", "collapse");
  a.setAttribute("data-target", `#${bodyId}`);
  if (isOpen) {
    a.setAttribute("aria-expanded", "true");
  } else {
    a.classList.add("collapsed");
  }
  a.textContent = li.firstChild.textContent;
  const hint = document.createElement("span")
  hint.classList.add("hint");
  a.appendChild(hint)
  headerContainer.appendChild(a)
  return headerContainer
}

function renderAccordionBody(li, headerId, bodyId, isOpen) {
  if (!li.children) {
    // we don't return here, we render the empty body 
    console.warn("Accordion body empty")
  }
  const bodyContainer = document.createElement('div');
  bodyContainer.setAttribute("id", bodyId);
  bodyContainer.classList.add("collapse");
  if (isOpen) {
    bodyContainer.classList.add("show");
  }
  bodyContainer.setAttribute("aria-labelledby", headerId);
  const body = document.createElement('div');
  body.append(...li.children)
  body.classList.add("card-body");
  bodyContainer.appendChild(body);
  return bodyContainer;
}

function renderAccordionItem(li, liIndex, collapsibleIndex, isOpen) {
  const headerId = `collapsible-${collapsibleIndex}-header-${liIndex}`;
  const bodyId = `collapsible-${collapsibleIndex}-body-${liIndex}`;

  const headerContainer = renderAccordionHeader(li, headerId, bodyId, isOpen);
  const bodyContainer = renderAccordionBody(li, headerId, bodyId, isOpen);
  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("accordion__rsk");
  card.appendChild(headerContainer);
  card.appendChild(bodyContainer);
  return card
}

function renderCollapsible(elem, collapsibleIndex) {
  const ul = elem.parentNode.nextElementSibling;
  if (!ul && ul.tagName !== 'UL') {
    console.warn('Expected an <ul> element:', el);
    return;
  }
  // use the class 'open' to set the initial status of the accordion
  const isOpen = elem.classList.contains('open');
  const children = Array.prototype.slice.call(ul.children);
  if (children.length === 0) {
    console.warn('Expected at least 1 <li> element:', ul);
    return;
  }
  const accordionItems = children.map((li, liIndex) => renderAccordionItem(li, liIndex, collapsibleIndex, isOpen));
  const accordion = document.createElement("div");
  accordion.classList.add("accordion");
  accordion.append(...accordionItems);
  ul.replaceWith(accordion);
  elem.remove()
}