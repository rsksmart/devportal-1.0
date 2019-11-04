
// add active class to a in inner nav based on url
$(function () {
var pageUrl = location.href;
$('a').each(function () {
$(this).toggleClass('active', this.href === pageUrl);
	});
})





$(document).ready(function(){
 $('ul li:has(ul)').addClass('subnav');
 //$(".subnav > a").click(function(event){
   $(".desktop_accordion .subnav > a").click(function(event){
   event.preventDefault();
   $(this).parent().toggleClass("rotate-chevron");
   $(this).next('ul').toggleClass("subnav-reveal");
});
});










 $(document).ready(function() {
    //var path = location.href;
    //if (path) {$('li a[href$="' + path + '"]:first').attr('class', 'current');}
    //var crumbs = $(".current").parents("ul")
var pageUrl = location.href;
$('.desktop_accordion ul li a').each(function () {
$(this).toggleClass('current', this.href === pageUrl);
	});

    var crumbs = $(".current").parentsUntil(".exclude-doc-from-breadcrumbs")
        .prev("a").add(".current")
    .map(function() {
        link = $(this).attr('href');
        link_text = $(this).text();
        title = $(this).attr('title');
        bc = "<li><a href="+link+" title="+''+">"+link_text+"</a></li>";    
        return bc; 
    }).get().join("  ");
    $(".breadcrumb").html(crumbs);
});

 $(document).ready(function() {
var liText = '', liList = $('.breadcrumb li'), listForRemove = [];
$(liList).each(function () {    
  var text = $(this).text();
  if (liText.indexOf('|'+ text + '|') == -1)
    liText += '|'+ text + '|';
  else
    listForRemove.push($(this));    
});   
$(listForRemove).each(function () { $(this).remove(); });
});


$(document).ready(function(){
 $(".current").parentsUntil(".first_level").addClass("subnav-reveal rotate-chevron");
 $(".current").parents().addClass("rotate-chevron current");
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

