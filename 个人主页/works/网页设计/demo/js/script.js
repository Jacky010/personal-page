$("#box2").on('keyup', function(event) {
         var val=$(this).val();
         var len=val.length;
         if (len=296/40&&len<=(296/30)) {
         	$("#box2").css({"font-size":"40px"});
         } else if(len>(296/30)&&len<=296/20){
         	$("#box2").css({"font-size":"30px"});
         }else{
         	$("#box2").css({"font-size":"20px"});
         }
});
     
$('#add_button').click(function(){
	if ($('#content').children('#pic_box').length==2) {
		$('#pic_box').clone(true).appendTo('#content').attr('class','pic_box1');
		$("#main").css('height','1410px');
		$("#content").css('height','820px');
		$("#pic_box").addClass('pic_box1');
		$("#add_button").css('margin-top','-3px');
		$('.footer').css('height','152px')
		$('#dec_btn').show();
	}else if($('#content').children('#pic_box').length==3){
		$('#pic_box').clone(true).appendTo('#content').attr('class','pic_box1');
		$("#main").css('height','1410px');
		$("#content").css('height','820px');
		$("#pic_box").addClass('pic_box1');
		$("#add_button").css('margin-top','-3px');
		$('.footer').css('height','152px')
	}else if ($('#content').children('#pic_box').length==4) {
		$("#add_button").attr("disabled", true);
	}

});

$('#dec_btn').click(function(){
	if ($('#content').children('#pic_box').length==3) {
		$('#pic_box:last-child').remove();
		$("#main").css('height','1000px');
		$("#content").css('height','400px');
		$("#add_button").css('margin-top','-5px');
	} else if($('#content').children('#pic_box').length==4){
		$('#pic_box:last-child').remove();
	} else if($('#content').children('#pic_box').length==2){
		$("#dec_btn").attr("disabled", true);
	}
});


