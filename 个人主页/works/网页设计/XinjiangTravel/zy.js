var lang=0;
var bystart;
$(".zyright").click(function(){
	lang+=300;
	bd();
	byshow();
	})
$(".zyleft").click(function(){
	lang-=300;
	bd();
	byshow();
	})
function byst(){
	bystart=setInterval(function(){
		lang+=300;
		bd();
		byshow();
	},2000)
}
byst();
$("#zy").hover(function(){
	clearInterval(bystart);
	},function(){byst();});
function bd(){
	if(lang>900){lang=0;}
	if(lang<0){lang=900;}
}
function byshow(){
		$(".zybox").scrollLeft(lang);
	}