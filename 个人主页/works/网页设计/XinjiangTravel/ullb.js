var ulldemo1=document.getElementById("ullbdemo1");
var ullcopy=document.getElementById("ullbcopy");
var ull=document.getElementById("ullb");
ullcopy.innerHTML=ulldemo1.innerHTML;
var ullbstart;
var speed=50;

ullstart();
ull.onmouseover=function(){clearInterval(ullbstart)};
ull.onmouseout=function(){ullstart()};
function ullbbj(){
	if(ull.scrollTop>=ull.offsetHeight){
		ull.scrollTop=0;
		}
}
function ullstart(){
ullbstart=setInterval(function(){
	$(".shuru").val(ull.scrollTop);
	ull.scrollTop++;
	ullbbj();
	},speed);
}
