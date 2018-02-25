var i=0;
var stlb;
$(function(){
	$(".imgbox").eq(i).show().siblings().hide();
	ks();
	msshowtime();
	})
function showtime(){
		$(".imgbox").eq(i).show().siblings().hide();
		$(".reann").eq(i).addClass("abbx").siblings().removeClass("abbx");
	}
function msshowtime(){
	$(".reann").hover(function(){
		i=$(this).index();
		showtime();
		clearInterval(stlb);
		},function(){
			ks();
			})
	}
function ks(){
		stlb=setInterval(function(){
		i++;
		if(i==6){i=0;}				
		showtime();
	},1500)	
	}