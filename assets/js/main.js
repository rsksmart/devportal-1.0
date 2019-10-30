//Breadcrumbs based on URL location
if ($('#siteBreadcrumb ol.breadcrumb')) {
	var here = location.href.replace(/(\?.*)$/, '').split('/').slice(3);
	var parts = [{
		"text": 'Home',
		"link": '/'
	}];

	for (var j = 0; j < here.length; j++) {
		var part = here[j];
		var pageName = part.toLowerCase();
		pageName = part.charAt(0).toUpperCase() + part.slice(1);
		var link = '/' + here.slice(0, j + 1).join('/');
		$('#siteBreadcrumb ol.breadcrumb').append('<li><a href="' + link + '">' + pageName.replace(/\.(htm[l]?|asp[x]?|php|jsp)$/, '') + '</a></li>');
		parts.push({
			"text": pageName,
			"link": link
		});
	}
}
$("<span>/</span>").insertAfter(".breadcrumb li");

// collapse all ul from inner nav
$('#accordion ul').addClass('collapse');


// add active class to li in inner nav based on url
//uncollapse parents and child of active li
$(function () {
	var pageUrl = location.href;
	$('a').each(function () {
		$(this).parent().toggleClass('active', this.href === pageUrl);
		$('.active').parentsUntil('#accordion').addClass('show');
		$('.active').parents().addClass('active-parent');
		$('.active').children().addClass('show');
	});
})


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

function ChangeTheme(e){
	if($(e).text() ==='Dark'){
		$(e).text('Light'); 
		$('link[href="/assets/css/styles_dark.css"]').prop('disabled', false);
	}else{
		$(e).text('Dark'); 
		$('link[href="/assets/css/styles_dark.css"]').prop('disabled', true);
	}
	return false;
}

