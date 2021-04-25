$('#js_scrollTop').on('click', function(){
  $('html, body').animate({
    scrollTop: $('#header').offset().top
  }, 750);
});
