var excalibur=0;
$(function(){
	$(".kjc").eq(excalibur).show().siblings().hide();
	$(".kjann").hover(function(){
		excalibur=$(this).index();
		$(".kjc").eq(excalibur).show().siblings().hide();
		$(".kjann").eq(excalibur).addClass("chcol").siblings().removeClass("chcol");
		})
	})