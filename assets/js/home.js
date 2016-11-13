var panel = false;

$( document ).ready(function() {
   setInterval(function() {
    if($('.homepage__forbidden_doors').hasClass('homepage__forbidden_doors--pulse')) {
        $('.homepage__forbidden_doors').removeClass('homepage__forbidden_doors--pulse');
    } else {
        $('.homepage__forbidden_doors').addClass('homepage__forbidden_doors--pulse');
    }
   }, 1000);

 $('.homepage').mousemove(function() {
    panel = true;
    $('.intro').show();
    $('.intro__panel').eq(1).fadeIn();
    $('.homepage__background').css('height', '75vh');
    $('.homepage__forbidden_doors').css('top', '41%');
    $('.homepage__forbidden_doors').css('height', '9.8%');
  });

 $('.homepage__forbidden_doors').click(function() {
    window.location = '#/login';
 });
});

$(window).resize(function(){
    if(panel) {
        $('.homepage__background').css('height', '75vh');
        $('.homepage__forbidden_doors').css('top', '41%');
        $('.homepage__forbidden_doors').css('height', '9.8%');
    }
});
 
