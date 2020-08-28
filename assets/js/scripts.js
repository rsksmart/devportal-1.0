// LEFT NAVIGATION

// add level class to ul
$("ul").addClass(function() {
    var depth = jQuery(this).parents("ul").length;
    return "level level-" + (depth + 1);
});

// add active class to a in inner nav based on url
$(function () {
    var pageUrl = location.href;
    $('a').each(function () {
        $(this).toggleClass('active', this.href === pageUrl);
    });

    // Put it here just in case it's executed before the previous iteration finish.
    $('.active').parentsUntil('.level-1').addClass('deployed green');

    let replace = false;
    let uls = [];
    const actives = $('.active')
    actives.each((a) => {
        const e = actives[a];
        if ($(e.parentElement).is('li')) {
            var li = e.parentElement;
            uls.push(li.parentElement);
            //console.log(li, uls);
            // Only two levels
            //console.log(li.clindNodes);
            li.childNodes.forEach((e1) => {
                //console.log('e1 - ul', e1);
                if ($(e1).is('ul')) {
                    e1.childNodes.forEach((e2) => {
                        //console.log('e2 - li', e2);
                        if ($(e2).is('li')) {
                            e2.childNodes.forEach((e3) => {
                                //console.log('e3 - li', e3);
                                if ($(e3).is('ul'))
                                    replace = true;
                            })
                        }
                    })
                }
            })
        }
    });
    console.log('replace', replace, uls);
    if (replace) {
        const nav = $('#custom-navbar');
        nav.children().hide();
        nav.append(uls[0]);
        console.log(nav);
    }
});

/*
$(document).ready(function () {
 $('.active').parentsUntil('.level-1').addClass('deployed green');
});
*/



  $('a[target="_blank"]').addClass('external');
  $('ul li:has(ul)').addClass('hassub');
  $('.inner-nav-left .external').prepend('<span class="external-icon"><i class="fa fa-external-link" aria-hidden="true"></i></span>');
  $('.inner-nav-left .hassub').prepend('<span class="caret-icon"><i class="fa fa-caret-right" aria-hidden="true"></i></span>');


// find clicked carret to deploy child ul
var curr = $('.caret-icon');
//$('.hassub ul').hide(); 
curr.click(function() {
    $(this).parent().toggleClass("deployed");
    //$(this).parent().find('ul').first().slideToggle();
});

// expand all nav
$(".toggle-nav-column-visibility").click(function() {
    var target = $(this);
    //use a class, since your ID gets mangled
    target.toggleClass("deployed");
    var isDeployed = target.hasClass('deployed');
    var targetText = isDeployed ? 'Collapse All' : 'Expand All';
    // update the text we just clicked on
    target.find('.text').text(targetText);
     // update every item in the collapsible menu
     $('.hassub').each(function () {
        $(this).toggleClass('deployed', isDeployed);
    });
 });

//THEME SWITCH
window.addEventListener('load', function() {
    //switch theme
    var toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    if (currentTheme === null) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleSwitch.checked = false;
    }
    if (currentTheme)
        if (currentTheme === 'light')
            toggleSwitch.checked = true;

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    }
    toggleSwitch.addEventListener('change', switchTheme, false);
});

//SCROLL TO LINK IN THE SAME PAGE
$("a[href^='#']").on("click", function(e) {
    e.preventDefault();
    var offset = $("header").height() + $('.header-inner').height();
    return $("html, body").animate({
        scrollTop: $(this.hash).offset().top - offset - 23 + 'px'
    }, 300);
});

//SHARE ICON
$('.share-redes').click(function() {
    $(".share-buttons-container").toggleClass("share-reveal");
});

// TWITTER ASIDE
function openNav() {
    $('#twitter-sidebar').addClass('sidebar-open');
}
function closeNav() {
    $('#twitter-sidebar').removeClass('sidebar-open');
}

// ADD STICKY TO HEADER
$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {
        $('header').addClass('sticky');
    } else {
        $('header').removeClass('sticky');
    }
});

// ADD STICKY TO META ONLY ON DESKTOP
function myFunction(stickywidth) {
    if (stickywidth.matches) {
        $(window).scroll(function() {
            if ($(this).scrollTop() >= 100) {
                $('#beta_content_container').addClass('sticky');
                $('.header-inner').addClass('sticky');
                $('.page-title').addClass('sticky');
            } else {
                $('#beta_content_container').removeClass('sticky');
                $('.header-inner').removeClass('sticky');
                $('.page-title').removeClass('sticky');
            }
        });
    }
}
var stickywidth = window.matchMedia("(min-width: 992px)")
myFunction(stickywidth) // Call listener function at run time
stickywidth.addListener(myFunction) // Attach listener function on state changes

//SLIDERS
$('#magnifyCarousel').owlCarousel({
    autoplay: true,
    loop: true,
    dots: false,
    nav: true,
    center: true,
    URLhashListener: true,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        991: {
            items: 4
        },
        1350: {
            items: 5
        }
    }
});
$('#fullCarousel').owlCarousel({
    autoplay: false,
    loop: true,
    dots: false,
    nav: true,
    center: true,
    URLhashListener: true,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        991: {
            items: 1
        },
        1350: {
            items: 1
        }
    }
});

// LEFT NAVIGATION



