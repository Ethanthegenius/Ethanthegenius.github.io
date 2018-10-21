var fruitObj = function()
{
	this.alive = [];
	this.x = [];
	this.y = [];
	this.l = [];
	this.spd = [];

	this.fruitType = [];

	this.orange = new Image();
	this.blue = new Image();
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function()
{
	for(var i=0; i<this.num; i++)
	{
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.l[i] = 0;
		this.spd[i] = Math.random() * 0.01 + 0.005;

		this.fruitType[i] = "";
		// this.born(i);
	}
	this.orange.src = "src/fruit/planet3.png";
	this.blue.src = "src/fruit/planet2.png";
}
fruitObj.prototype.draw = function()
{
	for(var i=0; i<this.num; i++)
	{
		if(this.alive[i])
		{
			if(this.fruitType[i] == "blue")
			{
				var pic = this.blue;
			}
			else
			{
				var pic = this.orange;
			}
			if(this.l[i] <= 50)		//果实大小
			{
				this.l[i] += this.spd[i] * deltaTime;
			}
			else
			{
				this.y[i] -= this.spd[i] * 7 * deltaTime;
			}
			
			ctx.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
			
		}
	    if(this.y[i] < 10)
		{
			this.alive[i] = false;
		}
		// console.log(this.num);
	}
}
fruitObj.prototype.born = function(i)
{
	var plantsID = Math.floor(Math.random() * plants.num);
	this.x[i] = plants.x[plantsID];
	this.y[i] = ch - plants.len[plantsID];
	this.l[i] = 0;

	this.alive[i] = true;
	var ran = Math.random();
	if(ran < 0.2)
	{
		this.fruitType[i] = "blue";
	}
	else
	{
		this.fruitType[i] = "orange";
	}
}

fruitObj.prototype.dead = function(i)
{
	this.alive[i] = false;
}

function fruitMonitor()
{
	var num = 0;
	for(var i=0; i<fruit.num; i++)
	{
		if(fruit.alive[i])
		{
			num++;
			// console.log(fruit.alive[i]);
		} 
	}
	if(num < 15)
	{
		sendFruit();
		return;
	}
}

function sendFruit()
{
	for(var i=0; i<fruit.num; i++)
	{
		if(!fruit.alive[i])
		{
			fruit.born(i);
			// console.log(i);
			return;
		}
	}
}