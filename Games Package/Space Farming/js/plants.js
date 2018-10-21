var plantsObj = function()
{
	this.x = [];
	this.len = [];
}
plantsObj.prototype.num = 50;
plantsObj.prototype.init = function()
{
	for (var i = 0; i < this.num; i++) 
	{
		this.x[i] = i * cw/this.num + Math.random() * 20;
		this.len[i] = 200 + Math.random() * 50;
	}
}
plantsObj.prototype.draw = function()
{
	ctx.save();
	ctx.globalAlpha = 0.6;
	ctx.lineWidth = 20;
	ctx.lineCap = 'round';
	ctx.strokeStyle = 'blue';
	ctx.shadowBlur = 100;
	ctx.shadowColor = 'pink';

	for(var i=0; i<this.num; i++)
	{
		ctx.beginPath();

		ctx.moveTo(this.x[i], ch);
		ctx.lineTo(this.x[i], ch - this.len[i]);

		ctx.stroke();
	}
	ctx.restore();
}