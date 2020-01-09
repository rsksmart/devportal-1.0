$(document).ready(function () {
  $(".navbar").on("show.bs.collapse", function (e) {
    console.log("open")
    $(".navbar-dark").css("background-color", "rgb(0, 181, 32)");
  });

  $(".navbar").on("hide.bs.collapse", function (e) {
    console.log("close")
    $(".navbar-dark").css("background-color", "transparent");
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

  // collapse mobile nav on click
  $('.navbar-nav>li>a').on('click', function () {
    $('.navbar-collapse').collapse('hide');
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
    var isHeaderScrolled = ($(this).scrollTop() > 10);
    $('.navbar').toggleClass('header-scrolled', isHeaderScrolled);
    $('.logo').toggleClass('header-scrolled', isHeaderScrolled);
    $('.navbar-toggler-icon').toggleClass('header-scrolled', isHeaderScrolled);
    $('.scrollup').toggleClass('header-scrolled', isHeaderScrolled);
    $('.dropdown-menu').toggleClass('header-scrolled', isHeaderScrolled);
  });

  // grant process
  $(".step-block-1").hover(function () {
    $(".step-block-2, .step-block-3, .step-block-4").toggleClass("half_opacity");
  });
  $(".step-block-2").hover(function () {
    $(".step-block-1, .step-block-3, .step-block-4").toggleClass("half_opacity");
  });
  $(".step-block-3").hover(function () {
    $(".step-block-1, .step-block-2, .step-block-4").toggleClass("half_opacity");
  });
  $(".step-block-4").hover(function () {
    $(".step-block-1, .step-block-2, .step-block-3").toggleClass("half_opacity");
  });

  //duplicate input in form
  var maxRows = 5;
  var i = 1;
  $('.wrapper').on('click', '.clone', function () {
    if (i < maxRows) {
      $('.clone').closest('.wrapper').find('.element').first().clone().attr("id", "item_" + i++).appendTo('.results');
    };
    if (i == maxRows) {
      $('.clone').addClass('disabled');
      $(".clone").css("opacity", "0.5");
    }
  });

  // limit characters in textarea
  $.fn.extend({
    limiter: function (counter) {
      var limit = this.attr('maxlength');

      $(this).on("keyup focus", function () {
        setCounter(this, counter);
      });

      function setCounter(source, counter) {
        var chars = source.value.length;
        if (chars > limit) {
          source.value = source.value.substr(0, limit);
          chars = limit;
        }
        counter.html(limit - chars);
      }
      setCounter($(this)[0], counter);
    }
  });

  $(".limited-textarea").each(function () {
    var $textarea = $(this).find('.textarea');
    var $counter = $(this).find('.counter');
    $textarea.limiter($counter);
  });

  // dynamically override the content for the rewards bullet point
  var rewardsUl = $('#rewards .rewards_list').last();
  rewardsUl.empty();
  [
    'Modifying rsk nodes?',
    'Creating a DApp on rsk?',
    'Implementing RIFOS services?',
    'Creating a DApp that uses RIFOS?',
    '&hellip; if so, we would be very happy to hear about it.',
  ].forEach(function (ulText) {
    rewardsUl.append(`<li>${ulText}</li>`);
  });

  // init for wow.js v1.1.2
  new WOW().init();

  // init for owl.carousel.js
  $('.owl-carousel').owlCarousel({
    loop:true,
    nav:true,
    center:true,
    URLhashListener:true,
    autoplayHoverPause:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:3
        }
    }
  });
});
