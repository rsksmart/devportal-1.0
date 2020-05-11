$(document).ready(function () {

  //initial header change background when opened

$(".navbar").on("show.bs.collapse", function(e) {
  console.log("open")
  $(".navbar-dark").css("background-color", "rgb(0, 181, 32)");
});

$(".navbar").on("hide.bs.collapse", function(e) {
  console.log("close")
  $(".navbar-dark").css("background-color", "transparent");
});


  // Add smooth scrolling to all links
  $(".nav-link").on('click', function (event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });


  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.navbar-nav');
  var main_nav_height = $('.navbar').outerHeight();

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();

    nav_sections.each(function () {
      var top = $(this).offset().top - main_nav_height,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        main_nav.find('li').removeClass('active');
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
    });
  });

  // Header scroll class
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.navbar').addClass('header-scrolled');
      $('.logo').addClass('header-scrolled');
      $('.navbar-toggler-icon').addClass('header-scrolled');

    } else {
      $('.navbar').removeClass('header-scrolled');
      $('.logo').removeClass('header-scrolled');
      $('.navbar-toggler-icon').removeClass('header-scrolled');

    }
  });



// init Isotope
var $grid = $('.grid').isotope({
  itemSelector: '.eventos'
});

//no filters applyied by default
var $grid = $('.grid').isotope({
        filter: '.none'
    });

// store filter for each group
var filters = {};

$('.filters').on( 'change', function( event ) {
  var $select = $( event.target );
  // get group key
  var filterGroup = $select.attr('value-group');
  // set filter for group
  filters[ filterGroup ] = event.target.value;
  // combine filters
  var filterValue = concatValues( filters );
  // set filter for Isotope
  $grid.isotope({ filter: filterValue });
});

// flatten object by concatting values
function concatValues( obj ) {
  var value = '';
  for ( var prop in obj ) {
    value += obj[ prop ];
  }
  return value;
}

  renderLocalTimes();
  enablePermalinkCopyToClipboard();
});

// Iterate over all "event" elements and attempt to render their times
// where the timestamp property is present
function renderLocalTimes() {
  $('.eventos').each(function () {
    var timestamp = $(this).data('timestamp');
    if (timestamp) {
      renderLocalTime(this, timestamp);
    }
  });
}

// For a particular "event" element, update its DOM in specific places
// to display the date, time, and time zone specific to the user' locale.
// In older browsers, use a best-effort approach for date-time localisation.
function renderLocalTime(el, timestamp) {
  var timeStampDate = new Date(timestamp);

  // extract full timezone details from Date, for user's locale
  var fullDateString = (timeStampDate).toString();
  var tzSplitIndex = nthCharacter(fullDateString, ' ', 5);
  var tzStr = fullDateString.substring(tzSplitIndex + 1);

  var dateStr;
  var timeStr;
  if (typeof timeStampDate.toLocaleTimeString === 'function') {
    // for modern browsers, extract locale specific date and time strings
    dateStr = timeStampDate.toLocaleDateString(
      undefined,
      {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    );

    timeStr = timeStampDate.toLocaleTimeString(
      undefined,
      {
        hour: 'numeric',
        minute: 'numeric',
      },
    );
  } else {
    // for older browsers, fall back on `Date.prototype.toString` to extract
    // non-locale specific date and time strings
    var timeSplitIndex = nthCharacter(fullDateString, ' ', 4);
    dateStr = fullDateString.substring(0, timeSplitIndex);
    timeStr = fullDateString.substring(timeSplitIndex + 1, tzSplitIndex);
  }

  var dateEl = $(el).find('.display-date');
  var timeEl = $(el).find('.display-time');
  var tzEl = $(el).find('.display-tz');
  dateEl.text(dateStr);
  timeEl.text(timeStr);
  tzEl.text(tzStr);
}

// Returns the index of the `n`th occurrence of `character` within `string`
function nthCharacter(string, character, n) {
  var count = 0;
  var i = 0;
  // repeatedly call `String.prototype.indexOf` until the nth count has been reached
  while (count < n && (i = string.indexOf(character, i) + 1)) {
    ++count;
  }
  if (count === n) {
    return i - 1;
  };
  return 0;
}

function enablePermalinkCopyToClipboard() {
  $('.eventos-past .button-group').on('click', function() {
    console.log('clicked');
    var eventId = $(this).data('eventId');
    var url = new URL(window.location.href);
    url.hash = `event-id-${eventId}`;
    var urlString = url.toString();
    copyStringToClipboard(urlString);
  });
}

function copyStringToClipboard(str) {
  if (!navigator.clipboard) {
    return copyStringToClipboardForOldBrowsers(str);
  }
  navigator.clipboard.writeText(str).then(function () {
    // do nothing
  }, function (err) {
    console.error(err);
  });
}

function copyStringToClipboardForOldBrowsers(str) {
  var textArea = document.createElement("textarea");
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = str;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
  } catch (err) {
    console.error(err);
  }

  document.body.removeChild(textArea);
}
