// JavaScript Document
$(function(){
	var index = 0;
	$('div.btn ul li').hover(function(){
	var index = $(this).index();
	$(this).addClass('on').siblings().removeClass('on');
	$('div.pic img').eq(index).stop(true).fadeIn().siblings().stop(true).fadeOut();
	},function(){});
				
		var play = setInterval(auto,2000);
		$('#content' ).hover(function(){
			clearInterval( play );
		},function(){
			play = setInterval(auto,2000);
		});
	function auto(){
		index++;
		index %=4;
		$('div.btn ul li').eq(index).addClass('on').siblings().removeClass('on');
		$('div.pic img').eq(index).stop(true).fadeIn().siblings().stop(true).fadeOut();
	}
});