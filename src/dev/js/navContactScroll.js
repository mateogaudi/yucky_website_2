$('#js_contactMenuClick').on('click', function(){
    $('html, body').animate({
        scrollTop: $('#footer').offset().top
    }, 750);
    $('button.hamburger').removeClass('is-active');
    $('.logo-bar-nav').removeClass('active');
});
