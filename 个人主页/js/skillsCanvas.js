//x,y 坐标,radius 半径,process 百分比,backColor 中心颜色, proColor 进度颜色, fontColor 中心文字颜色\
var arr=['HTML5','CSS3','Javascript','JQuery','Canvas','Bootstrap','MySQL','PHP'];
function DrowProcess(x,y,radius,process,backColor,proColor,fontColor){
	
	var canvas = document.getElementById('myCanvas');

	if (canvas.getContext) {
		var cts = canvas.getContext('2d');
	}else{
		return;
	}
	
	cts.beginPath();  
	// 坐标移动到圆心  
	cts.moveTo(x, y);  
	// 画圆,圆心是x,y,半径r,从角度0开始,画到2PI结束,最后一个参数是方向顺时针还是逆时针  
	cts.arc(x, y, radius, 0, Math.PI * 2, true);  
	cts.closePath();  
	// 填充颜色  
	cts.fillStyle = backColor;  
	cts.fill();

	cts.beginPath();  
	// 画扇形的时候这步很重要,画笔不在圆心画出来的不是扇形  
	cts.moveTo(x, y);  
	// 跟上面的圆唯一的区别在这里,不画满圆,画个扇形  
	cts.arc(x, y, radius, Math.PI * 1.5, Math.PI * 1.5 -  Math.PI * 2 * process / 100, true);  
	cts.closePath();  
	cts.fillStyle = proColor;  
	cts.fill(); 
	
	//填充背景白色
	cts.beginPath();  
	cts.moveTo(x, y); 
	cts.arc(x, y, radius - (radius * 0.26), 0, Math.PI * 2, true);  
	cts.closePath();
	cts.fillStyle = 'rgba(255,255,255,1)';
	cts.fill(); 

	// 画一条线  
	cts.beginPath();  
	cts.arc(x, y, radius-(radius*0.30), 0, Math.PI * 2, true);  
	cts.closePath();  
	// 与画实心圆的区别,fill是填充,stroke是画线  
	cts.strokeStyle = backColor;  
	cts.stroke();  
	  
	//在中间写字 
	cts.font = "bold 9pt Arial";  
	cts.fillStyle = fontColor;  
	cts.textAlign = 'center';  
	cts.textBaseline = 'middle';  
	cts.moveTo(x, y); 
	cts.fillText(process+"%", x, y-10); 
}
bfb = 0;
time=0;
function Start(){
	DrowProcess(90,70,60,95,'#ddd','#a23400','#a23400');
	DrowProcess(343,70,60,90,'#ddd','#ff7575','#ff7575');
	DrowProcess(600,70,60,85,'#ddd','#32CD32','#32CD32');
	DrowProcess(90,210,60,78,'#ddd','#afaf61','#afaf61');
	DrowProcess(343,210,60,75,'#ddd','#707038','#707038');
	DrowProcess(600,210,60,89,'#ddd','#e74c3c','#e74c3c');

	
	
}

function Create(){
	
	DrowProcess(840,70,60,70,'#ddd','#bb5e00','#bb5e00');
	DrowProcess(840,210,60,60,'#ddd','#ffa042','#ffa042');
}

Start();
Create();

var canvas=document.getElementById("myCanvas");
var cxt=canvas.getContext("2d");
	cxt.font = "bold 9pt Arial";  
	cxt.fillStyle = '#f00';  
	cxt.textAlign = 'center';  
	cxt.textBaseline = 'middle';   
	cxt.fillText("HTML5", 90, 80);
	cxt.fillText("CSS3", 343, 80);
	cxt.fillText("Javascript", 600, 80);
	cxt.fillText("JQurey", 840, 80);
	cxt.fillText("Canvas", 90, 220);
	cxt.fillText("Bootstrap", 343, 220);
	cxt.fillText("MySQL", 600, 220);
	cxt.fillText("PHP", 840, 220);