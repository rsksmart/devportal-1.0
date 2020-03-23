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
});

function renderLocalTimes() {
  console.log('renderLocalTimes');
  $('.eventos').each(function () {
    var timestamp = $(this).data('timestamp');
    if (timestamp) {
      renderLocalTime(this, timestamp);
    }
  });
}

function renderLocalTime(el, timestamp) {
  var timeStampDate = new Date(timestamp);

  var fullDateString = (timeStampDate).toString();
  var tzSplitIndex = nthCharacter(fullDateString, ' ', 5);
  var tzStr = fullDateString.substring(tzSplitIndex + 1);

  var dateStr;
  var timeStr;
  if (typeof timeStampDate.toLocaleTimeString === 'function') {
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

function nthCharacter(string, character, n) {
  var count = 0;
  var i = 0;
  while (count < n && (i = string.indexOf(character, i) + 1)) {
    ++count;
  }
  if (count === n) {
    return i - 1;
  };
  return 0;
}
