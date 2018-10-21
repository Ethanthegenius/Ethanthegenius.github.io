window.onload = init;

var cw = 1024, ch = 768;
var cvs;
var context;
var Harvestor;
var plants;
var fruit;

var chessboard = [];

function init() 
{
	var canvas = document.getElementById("gameCanvas");
	context = canvas.getContext("2d");

	// setInterval(gameLoop, 1000/60);
		clearScreen();
		drawBg();
	// PlayChessman(3, 3, true);
	// PlayChessman(4, 7, false);

	var black = true;
	canvas.onclick = function(e)
	{
		var x = e.offsetX;
		var y = e.offsetY;
		var i = Math.floor(x/60);
		var j = Math.floor(y/60);
		PlayChessman(i, j, black);
		// if(chessboard[i][j] == [0])
		// {
		// 	playChessman(i, j, black);
		// 	if(black)
		// 	{
		// 		chessBoard[i][j] = 1;
		// 	}
		// 	else
		// 	{
		// 		chessBoard[i][j] = 2;
		// 	}
		
			black = !black;
		}
	}

var time = 0;
// function gameLoop()
// {
// 	clearScreen();
// 	drawBg();
// 	PlayChessman(3, 3, true);
// 	PlayChessman(4, 7, false);
// }

function clearScreen()
{
	context.clearRect(0, 0, cw, ch);
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