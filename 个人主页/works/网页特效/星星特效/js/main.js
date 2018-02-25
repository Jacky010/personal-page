var can;
var ctx;

var w;
var h;

var padLeft = 100;
var padTop = 100;

var skyWidth = 600;
var skyHeight = 300;

var deltaTime;
var lastTime;

var skyPic = new Image();
var starPic = new Image();

var stars = [];
var num = 80;

var alive = 0;

var switchy = false;

function init() {
	can = document.getElementById("canvas");
	ctx = can.getContext("2d");

	w = can.width;
	h = can.height;

	document.addEventListener('mousemove', mousemove, false);

	skyPic.src = "src/sky.jpg";
	starPic.src = "src/star.png";

	for (var i = 0; i < num; i++) {
		stars[i] = new starObj();
		stars[i].init();
	}

	lastTime = Date.now();
	gameLoop();
}

function gameLoop() {
	window.requestAnimFrame(gameLoop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;

	fillCanvas();
	drawSky();

	drawStars();

	aliveUpdate();
}

function fillCanvas() {
	ctx.fillStyle = "#393550";
	ctx.fillRect(0, 0, w, h);
}

function drawSky() {
	ctx.drawImage(skyPic, padLeft, padTop, skyWidth, skyHeight);
}

function mousemove(e) {
	if (e.offsetX || e.layerX) {

		var px = e.offsetX == undefined ? e.layerX : e.offsetX;
		var py = e.offsetY == undefined ? e.layerY : e.offsetY;

		if (px > padLeft && px < (padLeft + skyWidth) && py > padTop && py < (padTop + skyHeight)) {
			switchy = true;
		} else {
			switchy = false;
		}
	}
}