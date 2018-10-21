window.onload = init;

var cw = 1024, ch = 768;
var cvs;
var ctx;
var Harvestor;
var plants;
var fruit;

function init() 
{
	cvs = document.getElementById("gameCanvas");
	ctx = cvs.getContext("2d");
	plants = new plantsObj();
	plants.init();

	cvs.addEventListener("mousemove", onMouseMove, false);
	
	fruit = new fruitObj();
	fruit.init();

	Harvestor = new HarvestorObj();
	Harvestor.init();

	lastTime = Date.now();
	deltaTime = 0;

	rocket = new rocketObj();
	rocket.init();

	setInterval(gameLoop, 1000/60);
} 
var time = 0;
function gameLoop()
{
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;

	clearScreen();
	drawBg();
	plants.draw();
	fruitMonitor();
	fruit.draw();
	Harvestor.draw();
	rocket.draw();
	console.log(mx);
	harvestorFruitHitTest();
}

function clearScreen()
{
	ctx.clearRect(0, 0, cw, ch);
}

function addImg(url)
{
	var img = new Image();
	img.src = url;
	return img;
}
function newGame()
{
	window.location.reload();
}