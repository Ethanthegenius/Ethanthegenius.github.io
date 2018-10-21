window.onload = init;
window.onmousemove = MouseMoveHandler ;
var cw = 1024, ch = 768;
var context;
var bg;
var lightsaber;
var lightsaberx = 0;
var lightsabery = 680;

var ball;
var ballx = 400;
var bally = 480;

var vx = 15;
var vy = 15;

var bricks = [];
var brickWidth = 138;
var brickHeight = 40;
var brickPosizitionx = 20;
var brickPosizitiony = 0;

var Door1;
var Door2;
var Doorframe;
var Cloud1;
var Cloud2;

var gameOver = false

var musicTime = 0

function init()
{
	var canvas = document.getElementById("gameCanvas");
	context = canvas.getContext("2d");
	
	bg = addImg("th.jpeg");
	lightsaber = addImg("lightsaber.png");
	ball = addImg("littleball.png");
	bgMusic = loadAudio("BGM_PVP.mp3");
	clearMusic = loadAudio("clear.mp3")
	emitMusic = loadAudio("bubble (2).wav");
	Door1 = addImg("door2.png");
	Door2 = addImg("door1.png");
	Doorframe = addImg("doorframe.png");
	Cloud1 = addImg("cloud1.png");
	Cloud2 = addImg("cloud2.png");
	winner = addImg("Win.png");
	loser = addImg("Lose.png");
	winMusic = loadAudio("Win.mp3");
	loseMusic = loadAudio("lose.mp3");

	createBricks();

	setInterval(gameLoop, 1000/60);
} 

var num = 0;
function lose()
{
	if(num == 0)
	{
		context.globalAlpha = 0.5;
		num++;		
	}
	else
	{
		drawLose();
	}
}

function drawLose()
{
	context.globalAlpha += 0.005;
	context.drawImage(loser, 0, 0, cw, ch);
}

function drawWin()
{
	context.drawImage(winner, cw/4, ch/4, cw/2, ch/2);
}

function win()
{
	closeDoor();
	if(cx == 512)
	{
		drawWin();
	}

}

var cx = 0;
function closeDoor()
{
	cx += 2;
	if(cx >= 512)
	{
		cx = 512;
	}
	context.drawImage(Door1, cx-512, 0, DoorW, DoorH);
	context.drawImage(Door2, 1024-cx, 0, DoorW, DoorH);

}


function drawBg()
	{
		context.drawImage(bg, 0, 0, 1024, 768);
		context.drawImage(lightsaber, lightsaberx, lightsabery);
	}

function drawCloud()
{
	context.drawImage(Cloud1, 0, 0, DoorW, DoorH)
	context.drawImage(Cloud2, 512, 0, DoorW, DoorH);
}

var DoorW = 512;
var DoorH = 768;

function openDoor()
{
	context.drawImage(Door1, x, 0, DoorW, DoorH);
	context.drawImage(Door2, 512-x, 0, DoorW, DoorH);
}

function openDoorframe()
{
	context.drawImage(Doorframe, x, 0, DoorW, DoorH);
	context.drawImage(Doorframe, 512-x, 0, DoorW, DoorH);
}

function openCloud()
{
	context.drawImage(Cloud1, x2, 0, DoorW, DoorH);
	context.drawImage(Cloud2, 512-x2, 0, DoorW, DoorH);
}

function testBallBrick()
{
	for(var i = bricks.length - 1; i >= 0; i--)
	{
		var item = bricks[i];
		var hit = hitTest(item.x - ball.width, item.y - ball.height, brickWidth + ball.width, brickHeight + ball.height, ballx, bally);
		if(hit)
		{
			bricks.splice(i, 1);
			vy = -vy;
			console.log("No Bug");
			clearMusic.load();
			clearMusic.play();
		}
	}
}

function updateBricks()
{
	for(var i=0; i<bricks.length; i++)
	{
		var item = bricks[i];
		context.drawImage(item.item, item.x, item.y);

	}
}

function createBricks()
{
	for(var i=0; i<7; i++)
	{
		for (var j=0; j<9; j++)
		{
			var item = addImg("bricks/brick"+rnd(0,7)+".png");
			bricks.push({item:item, x: brickPosizitionx + brickWidth*i, y:brickPosizitiony + brickHeight*j});
		}
	}
}

function testballlightsaber()
{
	var hit = hitTest(lightsaberx - ball.width, lightsabery - ball.height, lightsaber.width + ball.width, lightsaber.height + ball.height, ballx, bally)
	if(hit)
	{
		bally = lightsabery - ball.height;
		vy = -vy;
		emitMusic.load();
		emitMusic.play();
	}
}

function hitTest(x1, y1, w1, h1, x2, y2)
{
	if(x2 >= x1 && x2 <= x1 + w1 && y2 >= y1 && y2 <= y1 + h1)
	{
		return true;
	}
	else return false;
}

function updateBall()
{
	ballx += vx;
	bally += vy;

	if(ballx<0)
	{
		ballx = 0;
		vx = -vx;
	}
	else if(ballx > cw-ball.width)
	{
		ballx = cw-ball.width;
		vx = -vx;
	}
	else if(bally<0)
	{
		bally = 0;
		vy = -vy;
	}
	else if(bally > ch-ball.height)
	{
		gameOver = true;
	}
	context.drawImage(ball, ballx, bally)
}

function MouseMoveHandler(e)
{
	lightsaberx = e.x - lightsaber.width/2;
}

var x = 0;
var x2 = 0;
var bgT = 0;
function gameLoop()
{
	clearScreen();
	drawBg();
	if( bgT == 0)
	{
		bgMusic.play();
	}

	if(gameOver == false)
	{
		if(bricks.length > 0)
		{
			
			x-=2;
			if(x > -512)
			{
				openDoor();
				openCloud();	
				if(x < -200)
				{
					x2-=2;
				}
				openDoorframe();	
			}
			else if(x> -712)
			{
				openCloud();
				x2-=2;
			}
			else
			{
				context.drawImage(bg, 0, 0, 1024, 768);
				context.drawImage(lightsaber, lightsaberx, lightsabery);

				updateBall();
				testballlightsaber();

				updateBricks();
				testBallBrick();
			}
		}
		else
		{
			win();
			bgT++;
			if(musicTime == 0)
			{
				bgMusic.pause();
				winMusic.play();
			}
			musicTime++;
		}
		
	}
	else
	{
		lose();
		bgT++;
		if(musicTime == 0)
		{
			bgMusic.pause();
			loseMusic.play();
		}
		musicTime++;
		
	}

}

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

function rnd(min, max)
{
	var result = min + (max - min) * Math.random();
	return Math.floor(result);
}

function loadAudio(url)
{
	var au = new Audio();
	au.src = url;
	return au;
}