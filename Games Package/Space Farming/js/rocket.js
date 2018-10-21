var rocketObj = function()
{
	this.x;
	this.y;
}

rocketObj.prototype.init = function()
{
	this.x = (cw - 200)*Math.random();
	this.y = 0;
}

rocketObj.prototype.draw = function()
{
	this.image = addImg("src/rocket.png");
	ctx.drawImage(this.image, this.x, this.y);
	this.y += 10;
	this.x += 5;
	if(this.y > ch)
	{
		rocket.init();
	}
}