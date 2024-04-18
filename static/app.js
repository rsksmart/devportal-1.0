$(document).ready(() => {

  $('.owl-carousel').owlCarousel({
    loop: true,
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
      1000: {
        items: 3
      }
    }
  });

});

function setupFeature(querySelector, featureRenderer) {
  const elemNodeList = document.querySelectorAll(
    querySelector,
  );
  const elems = Array.prototype.slice.call(elemNodeList);
  elems.forEach(featureRenderer);
}

const handleCopy = () => {
  const copyButtonImageOptions = {
    copy: {
      src: '/assets/img/copy-init-icon.svg',
      alt: 'Copy',
      className: 'copy-button-init',
    },
    success: {
      src: '/assets/img/copied-green-icon.svg',
      alt: 'Coppied',
      className: 'copy-button-success',
    },
    fail: {
      src: '/assets/img/failed-red-icon.svg',
      alt: 'Failed',
      className: 'copy-button-fail',
    },
  };

  $('.gatsby-highlight').append(
    '<button class="copy-code">' +
    '<img src="' + copyButtonImageOptions["copy"].src + '" alt="' + copyButtonImageOptions["copy"].alt + '" class="' + copyButtonImageOptions["copy"].className + '">' +
    '</button>'
  );

  $('.gatsby-highlight').on('click', '.copy-code', async (event) => {
    const img = $(event.target).closest('.gatsby-highlight').find('.copy-code img');
    try {
      const text = $(event.target).closest('.gatsby-highlight').find('pre code').text();
      await navigator.clipboard.writeText(text);
      img.attr('src', copyButtonImageOptions["success"].src);
      img.attr('alt', copyButtonImageOptions["success"].alt);
    } catch (e) {
      img.attr('src', copyButtonImageOptions["error"].src);
      img.attr('alt', copyButtonImageOptions["error"].alt);
    } finally {
      setTimeout(() => {
        img.attr('src', copyButtonImageOptions["copy"].src);
        img.attr('alt', copyButtonImageOptions["copy"].alt);
      }, 1000);
    }
  });
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}

const handleTitleLinks = () => {
  function scrollHeadingToPageHeader(heading) {
    const pageHeader = document.getElementsByTagName('nav').item(0);
    const pageHeaderBottom = pageHeader.getBoundingClientRect().bottom;
    const headingTop = heading.getBoundingClientRect().top;
    const scrollDistance = headingTop - pageHeaderBottom;
    window.scrollBy({
      top: scrollDistance,
      behavior: 'smooth',
    });
  }

  function createHeadingIcon(href) {
    const anchor = document.createElement('a');
    anchor.href = href;
    anchor.classList.add('heading-icon-container');
    // anchor.onclick = (e) => e.preventDefault();
    const svg = $('#anchor-icon-template').clone();
    anchor.append(svg[0]);
    return anchor;
  }

  function handleHeadingIconClick(event) {
    if (event.target.classList.contains('heading-icon-container')) {
      const headingIconAnchor = event.target;
      const href = headingIconAnchor.href;
      history.pushState(null, href, href);
      scrollHeadingToPageHeader(headingIconAnchor);
      copyToClipboard(href);
    }
  }

  const addUrlHoverIconsSelector =
    '.page-content h1, .page-content h2, .page-content h3';

  const slugify = str =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');


  function addUrlHoverIcons() {
    const headings = document.querySelectorAll(addUrlHoverIconsSelector);
    for (const heading of headings) {
      heading.classList.add('heading-with-icon');
      heading.id = slugify($(heading).text());
      if (heading.tagName === 'H1') {
        heading.id = slugify('top');
      }
      const icon = createHeadingIcon(`#${heading.id ?? ''}`);
      heading.prepend(icon);
    }
    window.addEventListener('click', handleHeadingIconClick);
  }

  addUrlHoverIcons();
}

const rskTokenBridge = () => {
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

  const renderRskTokenBridgeSupportSetup = () => {
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
    // scriptEl.setAttribute('onload', 'renderRskTokenBridgeSupport();');
    document.body.appendChild(scriptEl);
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

  const renderRskTokenBridgeSupport = () => {
    const checkButton = document.querySelector('#rsk-token-bridge-support-check-button');

    if (checkButton) {
      renderRskTokenBridgeSupportSetup();
      checkButton.addEventListener('click', onRskTokenBridgeSupportCheckButtonClicked);
    }
  }

  renderRskTokenBridgeSupport();
}

const twoWayPegin = () => {
  function render2WayPegVerifierSetup() {
    // <script
    //   defer
    //   src="/assets/js/pegin-address-verifier.umd.js"
    //   onload="render2WayPegVerifier();">
    // </script>
    const scriptEl = document.createElement('script');
    scriptEl.setAttribute('defer', 'defer');
    scriptEl.setAttribute('src', '/assets/vendor/pegin-address-verifier/pegin-address-verifier.umd.js');
    // scriptEl.setAttribute('onload', 'render2WayPegVerifier();');
    document.body.appendChild(scriptEl);
  }

  function render2WayPegVerifier() {
    var originalElem = document.querySelector('a[title="pegin-address-verifier"]');

    if (!originalElem) {return;}
    render2WayPegVerifierSetup();

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

  render2WayPegVerifier();
}

const accordions = () => {
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

    if (li.tagName !== 'LI') return '';

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

  renderCollapsibleSetup();
}

const switches = () => {
  function renderSwitchContainerSetup() {
    setupFeature('a[title="switch-container"]', renderSwitchContainer);
  }

  function renderSwitchLabel(textContent){
    const label = document.createElement("div");
    label.classList.add("switch__label");
    label.textContent = textContent;
    return label
  }

  function renderSwitch(ul) {
    const basicChildren = Array.prototype.slice.call(ul.children[0].children);
    const advancedChildren = Array.prototype.slice.call(ul.children[1].children);
    const switchContainer = document.createElement("div");
    switchContainer.classList.add("switch");

    const switchContent = document.createElement("div");
    switchContent.classList.add("switch__content");
    const basicContent = document.createElement("div");
    basicContent.append(...basicChildren);
    const advancedContent = document.createElement("div");
    advancedContent.classList.add("d-none")
    advancedContent.append(...advancedChildren);
    switchContent.append(...[basicContent, advancedContent]);

    // <label>Basic</label>
    //   <div class="knob"></div>
    //   <label>Advanced</label>
    const switchController = document.createElement("div");
    switchController.classList.add("switch__controller");
    switchController.addEventListener("click", function () {
      this.classList.toggle("switch__controller--on");
      for (let i = 0; i < switchContent.children.length; i++){
        switchContent.children[i].classList.toggle('d-none')
      }
    });
    const basicLabel = renderSwitchLabel("Basic");
    const knob = document.createElement("div");
    knob.classList.add("switch__knob");
    const advancedLabel = renderSwitchLabel("Advanced");
    switchController.append(...[basicLabel, knob, advancedLabel]);

    switchContainer.append(...[switchController, switchContent]);
    return switchContainer;
  }

  function renderSwitchContainer(elem) {
    const ul = elem.parentNode.nextElementSibling;
    if (!ul && ul.tagName !== 'UL') {
      console.warn('Expected an <ul> element:', el);
      return;
    }
    if (!ul.children || ul.children.length !== 2) {
      console.warn('Switch-container features supports exactly 2 children', el);
      return;
    }
    const switchContainer = renderSwitch(ul);

    ul.replaceWith(switchContainer)
    // elem.remove()
  }

  renderSwitchContainerSetup();
}

const customTerminals = () => {
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
    if (['android', 'ios', 'linux', 'mac', 'windows'].indexOf(os) < 0) {
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

  renderCustomTerminalsSetup();
}

const equations = () => {
  function renderEquations() {
    var originalElem = document.querySelector('a[title^="tex-render "]');
    if (!originalElem) {
      return;
    }

    renderEquationsSetup();
  }

  function renderEquationsSetup() {
    // katex for rendering math equations
    // <link
    //   rel="stylesheet"
    //   href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
    //   integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq"
    //   crossorigin="anonymous">
    const linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.setAttribute(
      'href',
      'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css',
    );
    linkEl.setAttribute(
      'integrity',
      'sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq',
    );
    linkEl.setAttribute('crossorigin', 'anonymous');
    document.body.appendChild(linkEl);
    // <script
    //   defer
    //   src="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js"
    //   integrity="sha384-y23I5Q6l+B6vatafAwxRu/0oK/79VlbSz7Q9aiSZUvyWYIYsd+qj+o24G5ZU2zJz"
    //   crossorigin="anonymous"
    //   onload="onKatexScriptLoad();">
    // </script>
    const scriptEl = document.createElement('script');
    scriptEl.setAttribute('defer', 'defer');
    scriptEl.setAttribute(
      'src',
      'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js',
    );
    scriptEl.setAttribute(
      'integrity',
      'sha384-y23I5Q6l+B6vatafAwxRu/0oK/79VlbSz7Q9aiSZUvyWYIYsd+qj+o24G5ZU2zJz',
    );
    scriptEl.setAttribute('crossorigin', 'anonymous');
    scriptEl.onload = onKatexScriptLoad;
    document.body.appendChild(scriptEl);
  }

  function onKatexScriptLoad() {
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

  renderEquations();
}

$(document).ready(function() {
  $('#frm-rns-search').on('submit', (e) => {
    e.preventDefault();
    window.open('https://manager.rns.rifos.org/search?domain=' + $('#txt-rns-name').val(), '_blank');
  });
});

