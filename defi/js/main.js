$(".navbar").on("show.bs.collapse", function(e) {
    console.log("open")
    $(".navbar-dark").css("background-color", "rgb(0, 181, 32)");
});
$(".navbar").on("hide.bs.collapse", function(e) {
    console.log("close")
    $(".navbar-dark").css("background-color", "transparent");
});
$('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top - 100
        }, 1000);
    }
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


  /* Filtering solutions */
 // init Isotope
var $grid = $('.table-like').isotope({
  itemSelector: '.table-like__item',
  layoutMode: 'vertical'
});


// bind filter button click
$('#filters').on( 'click', 'button', function() {
  var filterValue = $( this ).attr('data-filter'); 
  $grid.isotope({ filter: filterValue });
  $('.table-like__item').not(':hidden').last().addClass("remove-bottom-border");
});

// change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});




    




  


