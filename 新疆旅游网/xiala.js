var i=0;
$(function(){
	$(".an").siblings().addClass("dis");
	$("#lbx").hover(function(){
		$(".an").removeClass("abs").siblings().removeClass("abs dis");
		$(".up").hide();
		},function(){
			$(".an").addClass("abs").siblings().addClass("abs dis");
			$(".up").show();
			})
	})
