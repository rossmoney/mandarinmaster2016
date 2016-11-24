var panel = false;
var currentPanel = 1;

$( document ).ready(function() {
   setInterval(function() {
    if($('.homepage__forbidden_doors').hasClass('homepage__forbidden_doors--pulse')) {
        $('.homepage__forbidden_doors').removeClass('homepage__forbidden_doors--pulse');
    } else {
        $('.homepage__forbidden_doors').addClass('homepage__forbidden_doors--pulse');
    }
   }, 1000);

   setInterval(function() {
    currentPanel++;
    if(currentPanel > 3) currentPanel = 1;
    for(var i = 1; i <= 3; i++) {
        if(i == currentPanel) {
            $('.intro__panel').eq(currentPanel-1).fadeIn();
        } else {
            $('.intro__panel').eq(i-1).fadeOut();
        }
    }
   }, 5000);

 $('.homepage').mousemove(function() {
    panel = true;
    $('.intro').show();
    $('.intro__panel').eq(0).fadeIn();
    $('.homepage__background').css('height', '75vh');
    $('.homepage__forbidden_doors').css('top', '41%');
    $('.homepage__forbidden_doors').css('height', '9.8%');
  });
});

$('.homepage__forbidden_doors').click(function() {
    $('.login').css('display', 'block');
});

$(window).resize(function(){
    if(panel) {
        $('.homepage__background').css('height', '75vh');
        $('.homepage__forbidden_doors').css('top', '41%');
        $('.homepage__forbidden_doors').css('height', '9.8%');
    }
});
 
