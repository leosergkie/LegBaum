$('.menu-icon').click(function(){
    $(".menu-hidden").animate({left: '0'}, 400);
	$(".menu-close img").fadeIn(400);
	$(".menu-icon").fadeOut(400);
});

$('.menu-close, .nav').click(function(){
    $(".menu-hidden").animate({left: '-320px'},400);
	$(".menu-close img").fadeOut(400);
	$(".menu-icon").fadeIn(400);
});
