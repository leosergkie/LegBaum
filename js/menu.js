/*после первого клика по бургеру 
второй клик (в любом месте) закрывает меню*/
let every_second_click = 0;
var delay = 400;
//$(".menu-close").fadeOut(1, 0);
$('.menu-icon').click(function(){
    var lastTime = +localStorage.lastTime;
    var nowTime = +new Date();
    if (lastTime && (lastTime + delay > nowTime)) {
            setTimeout(function f(){}, 400);
            return false;
        } else {
           localStorage.lastTime = nowTime;
        }
     $(".menu-hidden").animate({left: '0'}, 400);
	 //$(".menu-close").fadeIn(300, 1);
    if (every_second_click != 2) {
        every_second_click = 1;
    }
});

$(document).click(function(){
    if (every_second_click == 2) {
        $(".menu-hidden").animate({left: '-350px'},400);
        every_second_click = 0;
		$(".menu-close").fadeOut(300, 0);
    }
    if (every_second_click == 1) {
        every_second_click++;
    }
});