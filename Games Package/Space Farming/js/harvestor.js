// window.onmousemove = mouseMoveHandler;
var hn = 1;
var mx = cw * 0.5;
var my = ch *0.5;
// var HarvestorX = 0.5 * cw;
// var HarvestorY = ch - 200;
var HarvestorWidth = new Array(50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50);

var HarvestorObj = function()
{
	this.x;
	this.y;	
	this.angle;
}
HarvestorObj.prototype.init = function()
{
	this.x = cw * 0.5;
	this.y = ch * 0.5;
	this.angle = 0;
}
HarvestorObj.prototype.draw = function()
{
	// ctx.save();
	// ctx.translate(this.x, this.y);
	
	// ctx.drawImage(harvestor, harvestorX, harvestorY);
	this.image = addImg("src/Harvestor/" + hn + ".png");
	// this.x = 0.5 * cw - 0.5 * harvestorWidth[hn-1];
	// this.y = ch * 0.5;

	// console.log("this.y: " + this.y);
	// console.log("my: " + my);
	this.x = lerpDistance(mx, this.x, 0.99);
	this.y = lerpDistance(my, this.y, 0.99);

	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;
// console.log(this.beta);
	// ctx.drawImage(harvestor.image, this.x, this.y);

	this.angle = lerpAngle(beta, this.angle, 0.6);
	// console.log(this.angle);
	// console.log(mx);
	ctx.save();
	
	ctx.translate(this.x, this.y);
	ctx.rotate(this.angle);

	ctx.drawImage(this.image, -this.image.width*0.5, -this.image.height*0.5);

	
	ctx.restore();

	if(time % 5 == 0)
	{
		hn++;
		if(hn > 12)
		{
			hn = 1;
		}
	}
	// ctx.restore();
}

function onMouseMove(e)
{
		mx = e.layerX;
		my = e.layerY;
}
