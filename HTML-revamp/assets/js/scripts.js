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