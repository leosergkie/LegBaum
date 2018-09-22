/*после первого клика по бургеру 
второй клик (в любом месте) закрывает меню*/
let every_second_click = 0;
var delay = 500;
$('.menu-icon').click(function(){
	var lastTime = +localStorage.lastTime;
	var nowTime = +new Date();
	if (lastTime && (lastTime + delay > nowTime)) {
            setTimeout(function f(){}, 500);
            return false;
        } else {
           localStorage.lastTime = nowTime;
        }
  	$(".menu-hidden").fadeIn("slow");
  	if (every_second_click != 2) {
  		every_second_click = 1;
  	}
});

$(document).click(function(){
	if (every_second_click == 2) {
		$(".menu-hidden").fadeOut("slow");
		every_second_click = 0;
	}
	if (every_second_click == 1) {
		every_second_click++;
	}
});