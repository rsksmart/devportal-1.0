$(function() {
    $('#accordion .content').hide();
    $('#accordion h2:first').addClass('active').next().slideDown('slow');
    $('#accordion h2').click(function() {
        if($(this).next().is(':hidden')) {
            $('#accordion h2').removeClass('active').next().slideUp('slow');
            $(this).toggleClass('active').next().slideDown('slow');
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



