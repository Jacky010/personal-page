var zzz=0;
zzzs=setInterval(function(){
	$(".zztjj").eq(zzz).show().siblings().hide();
	zzz++;
	if(zzz>1)
	{zzz=0;}
	},500)