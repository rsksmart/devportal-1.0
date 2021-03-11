var indexJson = '/search/index.json';
var filesJson = '/search/files.json';
var inputTriggerKeys = [13, 16, 20, 37, 38, 39, 40, 91];
var debounceMs = 300;

var index;
var files;
preLoadData();

var searchInput;
var resultsContainer;
setTimeout(function () {
  setupUi();
}, 0);

function setupUi () {
  searchInput = document.getElementById('search-input');
  resultsContainer = document.getElementById('results-container');

  searchInput.addEventListener('input', function (e) {
    if (isInputTriggerKey(e.which)) {
      clearResultsUi();
      debounce(debounceMs, function () {
        doSearch(e.target.value);
      });
    }
  })
}

function clearResultsUi() {
  resultsContainer.innerHTML = '';
}

function isInputTriggerKey(keyCode) {
  return (inputTriggerKeys.indexOf(keyCode) === -1);
}

function showSearchInput(visible) {
  searchInput.classList.toggle('hide-element', visible);
}

var debounceTimeout;
function debounce (ms, func) {
  clearTimeout(debounceTimeout);
  if (typeof ms === 'number') {
    debounceTimeout = setTimeout(func, ms);
  } else {
    func.call();
  }
}

function preLoadData() {
  let errs = [];
  let okCount = 0;
  getJson(indexJson, (err, data) => {
    if (err) {
      errs.push(err);
    } else {
      index = data;
      okCount += 1;
    }
    preLoadDataTally();
  });
  getJson(filesJson, (err, data) => {
    if (err) {
      errs.push(err);
    } else {
      files = data;
      okCount += 1;
    }
    preLoadDataTally();
  });

  function preLoadDataTally() {
    if (errs.length + okCount < 2) {
      return;
    }
    if (errs.length > 0) {
      throw (errs);
    }
    showSearchInput();
    queryParamsSearch();
  }
}

function isValidSearchQuery(q) {
  return (typeof q !== 'undefined'
    && q !== null
    && q !== '');
}

function queryParamsSearch() {
  try {
    // detect if query parameters are present in URL
    const queryParams = (new URL(document.location)).searchParams;
    const q = queryParams.get('q');
    if (isValidSearchQuery(q)) {
      // use query parameters to perform search automatically
      searchInput.value = q;
      setTimeout(function () {
        doSearch(q);
      }, 0);
    }
  } catch (ex) {
    // do nothing
  }
}

function doSearch(q) {
  if (!isValidSearchQuery(q)){
    return;
  }
  if (!index || !files) {
    throw new Error('Data not yet loaded');
  }
  console.log('Searching:', q);

  // TODO impl search
}

function getJson(url, errback) {
  try {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
          var data = JSON.parse(this.responseText);
          errback(undefined, data);
        } else {
          errback(this.status);
        }
      }
    };

    request.send();
    request = null;
  } catch (ex) {
    errback(ex);
  }
}
