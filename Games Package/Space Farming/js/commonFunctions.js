function lerpAngle(a, b, t) 
{
	var d = b - a;
	if (d > Math.PI) d = d - 2 * Math.PI;
	if (d < -Math.PI) d = d + 2 * Math.PI;
	return a + d * t;
}

function lerpDistance(aim, cur, ratio) {
	var delta = cur - aim;
	return aim + delta * ratio;
}

function clearScreen()
{
	ctx.clearRect(0, 0, cw, ch);
	ctx.clearRect(0, 0, cw, ch);
}

function addImg(url)
{
	var img = new Image();
	img.src = url;
	return img;
}

function hitTestObject(obj1, obj2)
{
	return hitTestPoint(obj1.x, obj1.y, obj1.image.width, obj1.image.height,obj2.x, obj2.y );
}

function hitTestPoint(x1, y1, w1, h1, x2, y2)
{
	if(x2 >= x1 && x2 <= x1 + w1 && y2 >= y1 && y2 <= y1 + h1)
	{
		return true;
	}
	else return false;
}

function clearScreen()
{
	ctx.clearRect(0, 0, cw, ch);
	ctx.clearRect(0, 0, cw, ch);
}

function addImg(url)
{
	var img = new Image();
	img.src = url;
	return img;
}