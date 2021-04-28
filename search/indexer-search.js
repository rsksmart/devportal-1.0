var indexJson = '/search/index.json';
var filesJson = '/search/files.json';
var inputTriggerKeys = [13, 16, 20, 37, 38, 39, 40, 91];
var debounceMs = 300;
const maxResultCount = 10;
const searchExtraLetters = 'áéíóúäëïöüàèìòùñ';
const searchExtraLettersConverted = 'aeiouaeiouaeioun';
const searchExcludedWordsList = [
  'the', 'with', 'can', 'all', 'you', 'and', 'here', 'com', 'org',
  'for', 'will', 'not', 'from', 'which', 'should', 'need', 'but',
  'nbsp', 'your', 'png', 'when', 'does', 'doesn', 'this', 'its', 'must',
  'none', 'they', 'that', 'out', 'look', 'get', 'www',
];
const searchExcludedWords = new Map();
searchExcludedWordsList.forEach((excludedWord) => {
    searchExcludedWords.set(excludedWord, true);
});

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

function renderResultsUi(results) {
  resultsContainer.innerHTML = results
    .map(renderHtmlResult)
    .join('');
}

function renderHtmlResult(result) {
  const tags = renderHtmlResultTags(result.tags);
  const { url, title, desc } = result;
  const out = `
<div class="container">
  <br/>
  <div class="row">
    <a href="${url}"><h1>${title}</h1></a>
    </div>${desc}<br/>
${tags}
</div>
  `;
  return out;
}

function renderHtmlResultTags(tags) {
  const out = tags
    .map(
      (tag) => (`
      <a href="${`?q=${tag}&from=%2Fsearch%2F`}">
          <span class="badge badge-secondary p-1">
            ${tag}
          </span>
      <a/>
      `),
    )
    .join('');
  return `    <div class="row">${out}    <div>`;
}

function isInputTriggerKey(keyCode) {
  return (inputTriggerKeys.indexOf(keyCode) === -1);
}

function showSearchInput(visible) {
  searchInput.classList.toggle('hide-element', visible);
}

function updateValueSearchInput(q) {
  searchInput.value = q;
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
  const errs = [];
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
      updateValueSearchInput(q);
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

  const words = q
    .split(/\s+/)
    .map(searchTermNormalise)
    .filter(searchTermFilter);

  let result;
  words.forEach((word) => {
    let subResult;

    for (n in index) {
      if (n.indexOf(word) < 0) {
        continue;
      }

      if (subResult) {
        subResult = searchOr(subResult, index[n]);
      } else {
        subResult = index[n];
      }
    }

    if (!subResult) {
      return;
    }

    if (result) {
      result = searchAnd(result, subResult);
    } else {
      result = subResult;
    }
  });

  const list = searchSort(result);
  const parsedResults = [];
  if (list) {
      const l = Math.min(maxResultCount, list.length);
      for (let k = 0; k < l; k++) {
          const nfile = list[k].i;
          const file = files[nfile];
          const splitD = (file.d || '').split('\n');
          const desc = splitD[0] || '';
          const tags = !splitD[1] ? [] : splitD[1].split(', ');

          const parsedResult = {
            url: file.n,
            title: file.t,
            tags,
            desc,
            score: list[k].v,
          };
          parsedResults.push(parsedResult);
      }
  }
  renderResultsUi(parsedResults);
}

function isLetter(ch) {
  return (ch >= 'a' && ch <= 'z');
}

function isExtraLetter(ch) {
  return (searchExtraLetters.indexOf(ch) >= 0);
}

function normaliseExtraLetter(ch) {
  return searchExtraLettersConverted.charAt(searchExtraLetters.indexOf(ch));
}

function searchTermNormalise(wordMixedCase) {
  const word = wordMixedCase.toLowerCase();
  let out = '';
  for (let i = 0; i < word.length; i += 1) {
    const ch = word.charAt(i);
    if (isLetter(ch)) {
      out += ch;
    } else if (isExtraLetter(ch)) {
      out += normaliseExtraLetter(ch);
    }
    // all other characters are discarded
  }
  return out;
}

function searchTermFilter(word) {
  if (!word
    || word.length < 3
    || searchExcludedWords.has(word)) {
    return false;
  }
  return true;
}

function searchOr(index1, index2) {
  const result = {};

  for (let n in index1) {
    result[n] = index1[n];
  }

  for (let n in index2) {
    if (result[n]) {
      result[n] += index2[n];
    } else {
      result[n] = index2[n];
    }
  }
  return result;
}

function searchAnd(index1, index2) {
  const result = {};

  for (let n in index1) {
      if (index2[n]) {
          result[n] = Math.min(index1[n], index2[n]);
      }
  }
  return result;
}

function searchSort(index) {
  const list = [];

  for (let n in index) {
    list.push({ i: n, v: index[n] });
  }

  list.sort(function(a, b) {
    if (a.v < b.v) {
      return 1;
    }

    if (a.v > b.v) {
      return -1;
    }

    return 0;
  });

  return list;
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
