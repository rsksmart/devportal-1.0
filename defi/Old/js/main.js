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
    if ($(this).scrollTop() > 10) {
      $('.navbar').addClass('header-scrolled');
      $('.logo').addClass('header-scrolled');
      $('.navbar-toggler-icon').addClass('header-scrolled');
      $('.scrollup').addClass('header-scrolled');
      $('.dropdown-item').addClass('header-scrolled');

    } else {
      $('.navbar').removeClass('header-scrolled');
      $('.logo').removeClass('header-scrolled');
      $('.navbar-toggler-icon').removeClass('header-scrolled');
      $('.scrollup').removeClass('header-scrolled');
      $('.dropdown-item').removeClass('header-scrolled');
    }
  });

// owl carousel
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