// var chess = document.getElementById("gameCanvas");
// context = chess.getContext("2d");

var bg = addImg("src/bg/canvas.png");

function drawBg()
{
	context.drawImage(bg, 0, 0, cw, ch);

	context.strokeStyle = "#ab7800";
	context.fillStyle = "#ffffff"

	for (var i = 0; i<30; i++)
	{
		context.moveTo(30 + i*60, 30);
		context.lineTo(30 + i*60, 870);

		context.moveTo(30, 30 + i*60);
		context.lineTo(870, 30 + i*60);
		context.stroke();
	}
	for (var i = 0; i <15; i++)
	{
		chessboard[i] = [];
		for(var j=0; j<15; j++)
		{
			chessboard[i][j] = 0;
		}
	}
}
var PlayChessman = function(i, j, black)
{
	context.beginPath();
	context.arc(30+i*60, 30+j*60, 25, 0, 2*Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(30 + i*60 + 2,30 + j*60 - 2, 30, 30, + i*60 + 2, 30 + j*60 - 2, 0);
	if(black)
	{
		gradient.addColorStop(0, "#0f0f0f");
		gradient.addColorStop(1, "#0f0f0f");
	}
	else
	{
		gradient.addColorStop(0, "#f9f9f9");
		gradient.addColorStop(1, "#f9f9f9");
	}
	context.fillStyle = gradient;
	context.fill();
}

