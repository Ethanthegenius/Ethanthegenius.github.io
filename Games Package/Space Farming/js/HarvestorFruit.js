function harvestorFruitHitTest()
{
	for(var i=0; i<fruit.num; i++)
	{
		if(fruit.alive[i])
		{
			var hit = hitTestPoint(Harvestor.x, Harvestor.y, Harvestor.image.width, Harvestor.image.height, fruit.x[i], fruit.y[i]);
		}
		if(hit)
		{
			fruit.dead(i)
			break;
		}
	}
}