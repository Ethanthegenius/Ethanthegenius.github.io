window.onload = init;
window.onmousemove = mouseMoveHandler;
var cw = 800, ch = 775;
var context;
var bg1, bg2;
var flyingPig;



function init()
{
	alert("The game starts now! Get Ready!")
	var canvas = document.getElementById("gameCanvas");
	context = canvas.getContext("2d");
	
	bg1 = addImg("bg/bg2.png");
	bg2 = addImg("bg/bg2.png");

	addExplosionImgs();
	setInterval(gameLoop, 1000/60);

}


var time = 0;
var mode = 1;
function gameLoop()
{
	time++;
	clearScreen();
	drawGround();
	drawFlyingPig();
	shootMode(mode);
	shoot();
	drawPlayerBullets();
	// createEnemy();
	testBulletEnemy();
	testPlayerEnemy();
	drawExplosion();
	drawBoss();

	drawRune();
	drawPlayerHP();
	drawBossHP();

	console.log("Ethan is genius");
}

var hpn = 6;
// function drawHp()
// {
// 	hpn = flyingPigHP;
// 	if(hpn < 1)hpn = 6;
// 	playerHp = addImg("hp/playerHp (" + hpn +").png")
// 	// context.drawImage(hpImg, cw-100, 0, 100, 50);
// 	context.drawImage(playerHp, cw-150, ch-150, 120, 175);
// }


var bgSpeed = 2;;
var bg1y = 0;
var bg2y = -775;
function drawGround()
{
	bg1y += bgSpeed;
	bg2y += bgSpeed;
	if(bg1y > 775)
	{
		bg1y = 0;	
	}
	if(bg2y > 0)
	{
		bg2y = -775;	
	}
	context.drawImage(bg1, 0, bg1y, cw, ch);
	context.drawImage(bg2, 0, bg2y, cw, ch);
}

var fpn = 1;
var flyingPigX = 0.5 * cw;
var flyingPigY = ch - 200;
var flyingPigWidth = new Array(111, 97, 97, 95, 55, 91, 86, 49, 69, 69, 76);
var flyingPigHeight = 111;
var flyingPigHP = 6;
function drawFlyingPig()
{
	flyingPig = addImg("flyingPig/1/flyingPig (" + fpn + ").png")
	// flyingPigX = 0.5 * cw - 0.5 * flyingPigWidth[fpn-1];

	context.drawImage(flyingPig, flyingPigX, flyingPigY);
	if(time % 5 == 0)
	{
		fpn++;
		if(fpn > 11)
		{
			fpn = 1;
		}
	}
}
var damage = 20;
var playerBullets = [];
function shoot(x, y)
{
	if (time % 1 == 0)
	{
		var bullet = {}
		bullet.img = addImg("bullet/bullet (10).png");
		bullet.x = flyingPigX +14 + x;
		bullet.y = flyingPigY -14 + y;
		bullet.vx = 0;
		bullet.vy = -8;
		bullet.dmg = damage;

		playerBullets.push(bullet);
	}
}

	drawPlayerBullets();
	function drawPlayerBullets()
	{
		for(var i = playerBullets.length - 1; i >= 0; i--)
		{
			var bullet = playerBullets[i];
			bullet.x += bullet.vx;
			bullet.y += bullet.vy;

			if(bullet.y < 20)
			{
				playerBullets.splice(i,1);
			}

			context.drawImage(bullet.img, bullet.x, bullet.y, 50, 50);
		}
	}
	var bn = 1;
	var by = 0;
	var bx = 550;
	var bWidth = 50;
	var bHeight = 50;
	var spdx = 2;
	var spdy = 0;
	var bossHP = 10000;

	var time2 = 0;
	function drawBoss()
	{
		if(time % 100 == 0)
		{
			spdx = 2+Math.floor(10*Math.random());
			spdy = 2+Math.floor(10*Math.random());
		}
		// var bvx = Math.floor(10*Math.random());
		// var bvy = Math.floor(10*Math.random());
		bx += spdx;
		by += spdy;
		// console.log("bx:"+bx);
		// console.log("spdx:"+spdx);
		boss = addImg("boss/boss (" + bn + ").png");
		context.drawImage(boss, bx-0.5 * boss.width, by-0.5 * boss.height);
		if(time % 5 == 0)
		{
			bn++;
			if(bn > 10)
			{
				bn = 1;
			}
		}
		if(bx < 0)
		{
			spdx = -spdx;
		}
		if(by < 0)
		{
			spdy = -spdy;
		}
		if(bx > cw-boss.width/2)
		{
			spdx = -spdx;
			bx = cw-boss.width/2;
		}
		if(by > ch-boss.height/2)
		{
			spdy = -spdy;
			by = ch-boss.height/2;
		}

		testPlayerBoss();
		function testPlayerBoss()
		{
			var hit = hitTest();
			function hitTest()
			{
				return hitTestPoint(bx - flyingPigWidth[fpn], by - flyingPigHeight, bWidth, bHeight + flyingPigHeight,flyingPigX, flyingPigY );				
			}
			// 	// var hit = hitTest(rx - flyingPigWidth[fpn], ry - flyingPigHeight, rWidth , rHeight + flyingPigHeight, flyingPigX, flyingPigY);
			time2++;
			// console.log(time2);
			if(time2>120)//当受到攻击时间隔2s再次检测是否受到攻击
			{
				if(hit)
				{
					bossHP-=100;
					flyingPigHP-=1;
					mode --;
					if(mode < 1)
					{
						mode = 1;
					}
					time2 = 0;
				}
			}
			
		}

		testBulletBoss();
		function testBulletBoss()
		{
			for(var i = playerBullets.length - 1; i >= 0; i--)
			{
				var bullet = playerBullets[i];

				var hit = hitTest();
				function hitTest()
				{
					return hitTestPoint(bx - 50, by - 50, bWidth, bHeight + 50,bullet.x, bullet.y );				
				}
				
				if(hit)
				{
					bossHP -= bullet.dmg;
					explode(bx, by);
					playerBullets.splice(i, 1);
					if(bossHP <= 0)
					{
						// playerBullets.splice(i, 1);
						// explode(bx, by);
					} 
					break;
				}
			}
		}
	}


	function drawPlayerHp()
	{
		var player = addImg("flyingPig/2/flyingPig (1).png");
		var playerHp = addImg("hp/playerHp.png");
		var x = flyingPigHP/6 * playerHp.width;
		context.drawImage(playerHp, 0, 0, x, playerHp.height, cw-playerHp.width/7, 20, x/7, playerHp.height/7);
		context.drawImage(player, cw-playerHp.width/7-60, 0);
	}


function drawPlayerHP()
{
	var player = addImg("flyingPig/2/flyingPig (1).png");
	var playerHp = addImg("hp/playerHp.png");
	var x = flyingPigHP/6 * playerHp.width;
	context.drawImage(playerHp, 0, 0, x, playerHp.height, cw-playerHp.width/7, 20, x/7, playerHp.height/7);
	context.drawImage(player, cw-playerHp.width/7-60, 0);
}


function drawBossHP()
{
	var boss = addImg("boss/boss (1).png");
	var bossHp = addImg("hp/bossHp.png");
	var x = bossHP/10000 * bossHp.width;
	context.drawImage(bossHp, 0, 0, x, bossHp.height, 0, 20, x/7, bossHp.height/7);
	context.drawImage(boss, bossHp.width/7-10, 0, 100, 66);
}


function shootMode(m)
{
	switch(m)
	{
		case 1:shoot(0,0);break;
		case 2:
		shoot(0,0);
		shoot(-15,10);
		shoot(15,10);
		break;
		case 3:
		shoot(0,0);
		shoot(-15,10);
		shoot(15,10);
		shoot(-30,20);
		shoot(30,20);
		break;
		case 4:
		shoot(0,0);
		shoot(-15,10);
		shoot(15,10);
		shoot(-30,20);
		shoot(30,20);
		shoot(-45,20);
		shoot(45,20);
		break;
		case 5:
		shoot(0,0);
		shoot(-15,10);
		shoot(15,10);
		shoot(-30,20);
		shoot(30,20);
		shoot(-45,20);
		shoot(45,20);
		shoot(-100,40);
		shoot(100,40);
		break;
		case 6:
		shoot(0,0);
		shoot(-15,10);
		shoot(15,10);
		shoot(-30,20);
		shoot(30,20);
		shoot(-45,20);
		shoot(45,20);
		shoot(-100,40);
		shoot(100,40);		
		shoot(-150,50);	
		shoot(150,50);
		break;
		case 7:
		shoot(0,0);
		shoot(-15,10);
		shoot(15,10);
		shoot(-30,20);
		shoot(30,20);
		shoot(-45,20);
		shoot(45,20);
		shoot(-100,40);
		shoot(100,40);		
		shoot(-150,50);	
		shoot(150,50);
		shoot(-300,50);
		shoot(300,50);
	}
}


var enemyArr = [];
var enc = 100;

function createEnemy()
{
	if (time % 100 == 0) enc -= 5;
	if(enc<10) enc = 10;
	if(time % enc == 0)
	{
		var enemy = {};
		var i = Math.floor(Math.random() * 5)+1;
		enemy.img = addImg("enemy/E (" + i + ").png");
		enemy.x = (cw -200) * Math.random();
		enemy.y = -250;
		enemy.vx = 0;
		enemy.vy = 2 + 5 * Math.random();
		enemy.hp = 10000;
		enemy.width = enemy.img.width;
		enemy.height = enemy.img.height;

		enemyArr.push(enemy);
	}
	drawEnemy();
	function drawEnemy()
	{
		for(var i = enemyArr.length - 1; i >= 0; i--)
		{
			var enemy = enemyArr[i];

			enemy.x += enemy.vx;
			enemy.y += enemy.vy;

			context.drawImage(enemy.img, enemy.x, enemy.y);
		}
	}
}

function testBulletEnemy()
{
	for(var i = playerBullets.length - 1; i >= 0; i--)
	{
		var bullet = playerBullets[i];
		for(var j = enemyArr.length - 1; j >= 0; j--)
		{
			var enemy = enemyArr[j];
			var hit = hitTestObject(enemy, bullet);
			if(hit)
			{
				playerBullets.splice(i, 1);
				enemy.hp -= bullet.dmg;
				if(enemy.hp <= 0)
				{
					enemyArr.splice(j, 1);
					explode(enemy.x, enemy.y);
				}
				break;
			}
		}
	}
}
function testPlayerEnemy()
{
	
		for(var i = enemyArr.length - 1; i >= 0; i--)
		{
			var enemy = enemyArr[i];
			
			var hit = hitTest();
			function hitTest()
			{
				return hitTestPoint(enemy.x, enemy.y, enemy.width, enemy.height,flyingPigX, flyingPigY );				
			}
			
			if(hit)
			{
				enemyArr.splice(i, 1);
				flyingPigHP -= 1;
				console.log(flyingPigHP);
				explode(flyingPigX, flyingPigY);

				if(flyingPigHP <= 0)
				{
					gameOver = true;

				} 
			}
			
		}
}

function hitTestObject(obj1, obj2)
{
	return hitTestPoint(obj1.x, obj1.y, obj1.img.width, obj1.img.height,obj2.x, obj2.y );
}

function hitTestPoint(x1, y1, w1, h1, x2, y2)
{
	if(x2 >= x1 && x2 <= x1 + w1 && y2 >= y1 && y2 <= y1 + h1)
	{
		return true;
	}
	else return false;
}

var explosionImgs = [];
function addExplosionImgs()
{
	for(var n = 1; n < 8; n++)
	{	
		var img = addImg("./explosion/1/explosion (" + n + ").png");
		explosionImgs.push(img);
	}
}

var explosionArr = [];
function explode(x, y)
{
	var explosion = {x: x, y:y, crtIndex: 1};
	explosionArr.push(explosion);
}

function drawExplosion()
{
	for(var i = explosionArr.length - 1; i >= 0; i--)
	{
		var explosion = explosionArr[i];
		if(explosion.crtIndex >= 7)
		{
			explosionArr.splice(i, 1);
			continue;
		}
		var img = explosionImgs[explosion.crtIndex];
		context.drawImage(img, explosion.x + 100, explosion.y + 100);
		if(time % 3 == 0)explosion.crtIndex++;
	}
}

var rn = 1;
var ry = 0;
var rx = 500;
var rWidth = 50;
var rHeight = 50;
var aliveF = 1;
function drawRune()
{
	ry += 4 * aliveF;
	rune = addImg("rune/rune (" + rn + ").png");
	context.drawImage(rune, rx-0.5 * rune.width, ry);
	if(time % 5 == 0)
	{
		rn++;
		if(rn > 7)
		{
			rn = 1;
		}
	}

	testPlayerRune();
	function testPlayerRune()
	{
		var hit = hitTest();
		function hitTest()
		{
			return hitTestPoint(rx - flyingPigWidth[fpn], ry - flyingPigHeight, rWidth, rHeight + flyingPigHeight,flyingPigX, flyingPigY );				
		}
		// var hit = hitTest(rx - flyingPigWidth[fpn], ry - flyingPigHeight, rWidth , rHeight + flyingPigHeight, flyingPigX, flyingPigY);
		if(hit)
		{
			mode++;

			ry = -Math.floor(Math.random() * 2000);
			rx = Math.floor(50 + Math.random() * (cw-50));
			
			if(mode > 7)
			{
				mode = 1;
			}
		}
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

function mouseMoveHandler(e)
{
	flyingPigX = e.x - flyingPigWidth[fpn-1]/2;
	flyingPigY = e.y - flyingPigHeight/2;
	// console.log(flyingPigX);
}