window.onload = init; window.onkeydown = onKeyDown;
var cw = 1024, ch = 768;
var context;
var bg11, bg12, bg21, bg22;
var terrain
var alive = true;

var catWidth = 120;
var catHeight = 128; 
function init()
{
	var canvas = document.getElementById('gameCanvas');
	context = canvas.getContext("2d");

	bg11 = addImg("bg1.png");
	bg12 = addImg("bg1.png");
	bg21 = addImg("bg2.png");
	bg22 = addImg("bg2.png");

	terrain1 = addImg("terrain/1.png");
	terrain2 = addImg("terrain/2.png");
	terrain3 = addImg("terrain/3.png");	
	terrain4 = addImg("terrain/4.png");
	terrain5 = addImg("terrain/5.png");

	destination = addImg("destination/2.png");
	createTerrain();
	createGold();
	setInterval(gameLoop, 1000/60);
}
var time = 0;
var caty = 500;
var f;
var m = 0;
function gameLoop()
{
	time ++;
	clearScreen();
	drawSky();
	drawGround();
	drawTerrain();
	drawTerrain45();
	// console.log(caty);
	testCatTerrain();
	// console.log("jnum" + jnum);
	drawRuneSpeed();
	drawRuneFlight();
	drawGold();
	drawTrap();
	if(alive == false)
	{
		drawCatOver();
		lose();
	}
	else
	{
		drawCatJump();
		drawCatFly();
		drawDestination(); 
		if(caty>=500)
		{
			drawcat();
			m=0;
			jnum = 0;
		}
	}
	if(catx > terrain_3[terrain_3.length-1].x + 100)
	{
		alive = false;
	}
}
var gNum = 0;

var trapn = 2;
var trapx = 1000;
var trapy = 550;
var trapHeight = 60;
var trapWidth = 132;
var aliveT = 1;
var traps = [];

function drawTrap()
{
var trap = addImg("trap/trap (" + trapn + ").png");
	for(var i=0; i<terrain_2.length; i++)
	{
		
		if(i%5==0)
		{
			trapx = terrain_2[i].x;


			context.drawImage(trap, trapx, trapy);
			trapx -= 15 * aliveT;
			var hit = hitTest(trapx - catWidth+70, trapy - catHeight, trapWidth , trapHeight + catHeight, catx, caty);
			if(hit)
			{
				alive = false;
				// score++;
			}
		}
	}

}

var gn = 1;
var gx = 300;
var gy = 500;
var gHeight = 90;
var gWidth = 60;
var aliveG = 1;
var golds = [];
var score = 0;
function testCatGold()
{
	for(var i = 0;i<golds.length ; i+=7)
	{
		var item = golds[i];
		var hit = hitTest(item.x - catWidth, item.y - catHeight, gWidth , gHeight + catHeight, catx, caty);
		if(hit)
		{
			golds.splice(i, 7);
			score++;

		}
	}
}

var goldWidth = new Array(46, 32, 53, 53, 32, 46, 59);
function createGold()
{
	for(var i=0; i<200; i++)
	{
		for(var gn=1; gn<=7; gn++)
		{
			var item = addImg("gold/gold (" + gn + ").png");
			
			golds.push({item:item, x: gx + 100 * i - 0.5 * goldWidth[gn-1], y:gy});	
			
		}

	}
}

var gdn = 0;
function drawGold()
{
	var item = new Image();
	for(var i=0; i<golds.length; i+=7)
	{
		 item = golds[i+gdn];
		context.drawImage(item.item, item.x, item.y);
		item.y = 500
	}

	for(var i=0; i<golds.length; i++)
	{
		item = golds[i];
		item.x -= 15 * aliveG;
	}
	
	if(time % 5 == 0)
	{
		gdn++;
		if(gdn > 6)
		{
			gdn = 0;
		}
	}

	context.fillStyle = "white";
	context.font = "20px Verdana";
	context.fillText("score:"+score, 900, 50);
	testCatGold();
	
	
}

var rfn = 1;
var rfy = 350;
var rfx = 5500;
var rfWidth = 50;
var rfHeight = 50;
var aliveF = 1;


var rfn = 1;
var rfy = 350;
var rfx = 5500;
var rfWidth = 50;
var rfHeight = 50;
var aliveF = 1;
function drawRuneFlight()
{
	rfx -= 15 * aliveF;
	runeFlight = addImg("rune/runeflight (" + rfn + ").png");
	// context.drawImage(runeFlight, rfx, rfy);
	context.drawImage(runeFlight, rfx-0.5 * runeFlight.width, rfy);
	if(time % 5 == 0)
	{
		rfn++;
		if(rfn > 7)
		{
			rfn = 1;
		}
	}
	testCatRuneFlight();
	function testCatRuneFlight()
	{
		var hit = hitTest(rfx - catWidth, rfy - catHeight, rfWidth , rfHeight + catHeight, catx, caty);
		if(hit)
		{
			tool = 1;
			rfx = 120;
			rfy = 10;
			aliveF = 0;
		}
	}
}


var rsn = 1;
var rsy = 550;
var rsx = 2500;
var rsWidth = 50;
var rsHeight = 50;
var alive1 = 1;
function drawRuneSpeed()
{
	rsx -=15 * alive1;
	runeSpeed = addImg("rune/runespeed (" + rsn + ").png");
	context.drawImage(runeSpeed, rsx-0.5 * runeSpeed.width, rsy);
	if(time % 5 == 0)
	{
		rsn++;
		if(rsn > 7)
		{
			rsn = 1;
		}
	}

	testCatRuneSpeed();
	function testCatRuneSpeed()
	{
		var hit = hitTest(rsx - catWidth, rsy - catHeight, rsWidth , rsHeight + catHeight, catx, caty);
		if(hit)
		{
			tSpd = 8;
			bg1Speed = -2;
			bg2Speed = -8;
			rsx = 50;
			rsy = 10;
			alive1 = 0;
			aliveF = 2;
			// congratulations();
		}
	}
	
}

function lose()
{
	if(gNum == 0)
	{
		context.globalAlpha = 0.5;
		gNum++;		
	}
	else
	{
		drawLose();
		// console.log("gNum:"+gNum);
	}
}
function drawLose()
{
	
	context.globalAlpha += 0.005;
	context.fillStyle = "black";
	context.fillRect(0, 0, 1366, 768);
	context.save();

	// context.font = "200px 仿宋";
	context.font = "100px Verdana";
	context.textAlign = "center";
	context.shadowBlur = 40;
	context.shadowColor = "white";
	context.fillStyle = "white";

	context.fillStyle = "rgba(255, 255, 255," + context.globalAlpha +")";
	context.fillText("GAME OVER", cw * 0.5, ch * 0.5);

	// console.log(context.globalAlpha);
	
	context.restore();
}

function drawDestination()
{
	// destination = addImg("run/run0.png");
	var dx = terrain_3[terrain_3.length-1].x;
	var dy = 450;
	context.drawImage(destination, dx-250, dy);
	// console.log("dx:"+dx);
	// console.log("dy:"+dy);
	context.fillText(dx, 50, 50);
	var desWidth = 120;
	var desHeight = 128;
	testCatDestination();
	function testCatDestination()
	{
		var hit = hitTest(dx - catWidth, dy - catHeight, desWidth , desHeight + catHeight, catx, caty);
		if(hit)
		{
			tSpd = 0;
			bg1Speed = 0;
			bg2Speed = 0;
			congratulations();
		}
	}
}

var fwn = 1;
var ranx = 300;
var rany = 300;
function congratulations()
{
	tSpd = 0;
	bg1Speed = 0;
	bg2Speed = 0;

	context.save();
	context.font = "80px Verdana";
	context.textAlign = "center";
	context.shadowBlur = 20;
	context.shadowColor = "white";
	context.fillStyle = "orange";

	// context.fillStyle = "rgba(255, 255, 255," + context.globalAlpha +")";
	context.fillText("CONGRATULATIONS!", cw * 0.5, ch * 0.5);
	context.restore();

	fireworks = addImg("fireworks/fireworks3 (" + fwn + ").png");
	context.drawImage(fireworks, ranx, rany, 150, 150);
	context.drawImage(fireworks, ranx + 500, rany + 500, 250, 250);
	context.drawImage(fireworks, ranx - 500, rany + 500, 170, 170);
	// console.log("ranx:"+ranx);
	// console.log("rany:"+rany);
	if(time % 10 == 0)
	{
		fwn++;
		if(fwn > 5)
		{
			fwn = 1;
			ranx = 102 * Math.floor(10 * Math.random());
			rany = 76 * Math.floor(10 * Math.random());
		}
 }


}

function testCatTerrain()
{
	for(var i=0; i<terrain_3.length; i++)
	{
		var item3 = terrain_3[i];
		var item3width = 82;
		var disx = item3.x+item3width;
		var disy = item3.y;
		
		var disWidth = 50 * rand[i+1] + 50;
		var disHeight = 168;

		var catWidth = 120;
		var catHeight = 128;

		cat = addImg("run/" + 0 + ".png");
		// var hit = hitTest(boardx - 60, boardy - 62, 242 + 60, 18 + 62, ballx, bally);
		// var hit = hitTest(disx - cat.width, disy - catHeight, disWidth + catWidth, disHeight + catHeight, catx, caty);
		var hit = hitTest(disx - 30, disy - catHeight, disWidth + 10, disHeight + catHeight, catx, caty);
		if(hit)
		{
			alive = false;
			tSpd = 0;
			bg1Speed = 0;
			bg2Speed = 0;
		}

		// e.log("disx:"+disx);
		// console.consollog("cat.height:"+ cat.height);
		// console.log("catx:"+ catx);
		// console.log("disWidth:"+ disWidth);

	}
	// console.log(" ");
}

function hitTest(x1, y1, w1, h1, x2, y2)
{
	if(x2 >= x1 && x2 <= x1 + w1 && y2 >= y1 && y2 <= y1 + h1)
	{
		return true;
	}
	else return false;
}

var on = 1;
function drawCatOver()
{
	t=0;
	m=0;
	tool = 0; 

	cat = addImg("over/" + on + ".png");
	context.drawImage(cat, catx, caty);
	if(time % 6 == 0)
	{
		on++;
		if(on > 3)
		{
			on = 3;
		}
		
	}
	catx+=2;
	caty+=10;
}

var tx=500,ty=600;
var tSpd = 10;

var oldTx = 0;

var terrain_1 = [];
var terrain_2 = [];
var terrain_3 = [];



var t4x = 500;
function drawTerrain45()
{
	context.drawImage(terrain4, t4x-=tSpd, 400, 518/2, 126/2);
	if(t4x < -518/2)
	{
		t4x = cw;
	}
}

var tx=500, ty=600
var tSpd = 15;

var oldTx = 0;

var terrain_1 = [];
var terrain_2 = [];
var terrain_3 = [];

function drawTerrain()
{

	for(var i=0; i<terrain_1.length; i++)
	{
		var item1 = terrain_1[i];
		context.drawImage(item1.item1, item1.x, item1.y);
		item1.x -= tSpd;
	}
	// console.log("terrain_2.length:"+terrain_2.length);
	for(var i=0; i<terrain_2.length; i++)
	{
		var item2 = terrain_2[i];
		for(var k=0; k<num;k++)
		{
			for(var tn=1;tn<=rand[k];tn++)
			{
				context.drawImage(item2.item2, item2.x, item2.y);
			}
		}
		item2.x -= tSpd;
	}
	
	for(var i=0; i<terrain_3.length; i++)
	{
		var item3 = terrain_3[i];
		context.drawImage(item3.item3, item3.x, item3.y);
		item3.x -= tSpd;
	}
	
	
}


var rand = [];
var num = 15;
var currentTx = 100;
var ran = 0
function createTerrain()
{
	terrain2.onload = function()
	{
		for(var i=0; i<num; i++)
		{
			rand.push(ran);
			distance = 50*ran + 50;

			var item1 = addImg("terrain/1.png");
			var item2 = addImg("terrain/2.png");
			var item3 = addImg("terrain/3.png");

			var long = terrain1.width + ran*terrain2.width + terrain3.width;
			currentTx = oldTx+long+distance;
			oldTx = currentTx;

			ran = Math.floor(4*Math.random());


			terrain_1.push({item1:item1, x: currentTx-terrain1.width, y:ty});

			// console.log("item1:"+(currentTx-terrain1.width));

			for(var tn=1;tn<=ran;tn++)
			{
				terrain_2.push({item2:item2, x: (tn-1)*terrain2.width + currentTx, y:ty});
				// console.log("item2:"+((tn-1)*terrain2.width + currentTx));
			}

			terrain_3.push({item3:item3, x: (tn-1)*terrain2.width + currentTx, y:ty});

			// console.log("item3:"+((tn-1)*terrain2.width + currentTx));

			// console.log("ran:"+ran);
			// console.log("long+50:"+(long+50));
		}
	}
}


var catx=500;
var caty=500;
var n = 0;
function drawcat()
{
	cat = addImg("cat" + n + ".png");
	context.drawImage(cat, catx, caty);
	if(time % 6 == 0)
	{
		if(n == 0)
		{
			n = 1;
		}
		else n=0;
	}
}

var jn = 0;
var t;
var m=0;
function drawCatJump()
{
	if(t>0)
	{
		m=1;
		t--;
		caty-=10;
		cat = addImg("jump/" + jn + ".png");
		context.drawImage(cat, catx, caty);
		if(time % 5 == 0)
		{
			jn++;
			if(jn>2) jn=2;
		}
	}
	else if(m>0 && caty<500)
	{
		caty+=15;
		cat = addImg("jump/" + 3 + ".png");
		context.drawImage(cat, catx, caty);
	}
}
var fn = 1;
var flyTime = 100;
var tool = 0;
var n = 0;
function drawCatFly()
{
	if(tool == 1)
	{
		t=0;
		m=0;

		flyTime--;
		if(flyTime > 0)
		{
			caty=300;
			cat = addImg("fly/" + fn + ".png");
			context.drawImage(cat, catx, caty);
			if(time % 5 == 0)
			{
				fn++;
				if(fn>2)fn=1;
				// console.log(flyTime);
			}
		}
		else if(caty<500) 
		{
			caty+=8;
			cat = addImg("jump/" + 3 + ".png");
			context.drawImage(cat, catx, caty);

			// console.log(caty);
		}
		else
		{
			tool=0;
			flyTime=100;
		}	
	}
}

var bg1Speed = -1;
var bg11x = 0;
var bg12x = 1024;
function drawSky()
{
	bg11x += bg1Speed;
	bg12x += bg1Speed;
	if(bg11x < -1024)
	{
		bg11x = 0;	
		bg12x = 1024;	
	}
	context.drawImage(bg11, bg11x, 0, 1024, 500);
	context.drawImage(bg12, bg12x, 0, 1024, 500);
}

var bg2Speed = -4;
var bg21x = 0;
var bg22x = 1024;
function drawGround()
{
	bg21x += bg2Speed;
	bg22x += bg2Speed;
	if(bg21x < -1024)
	{
		bg21x = 0;	
		bg22x = 1024;	
	}
	context.drawImage(bg21, bg21x, 270, 1024, 500);
	context.drawImage(bg22, bg22x, 270, 1024, 500);
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

var jnum = 0;
function onKeyDown(e)
{
	switch(e.keyCode)
	{
		case 32:jump();
		break;

		case 70:tool = 1
		break;

		case 65:catx-=10;
		break;

		case 68: catx+=10;
		break;
	}

	function jump()
	{
		jnum++;
		if(jnum<=2)
		{
			t=50;
		}
	}
}
