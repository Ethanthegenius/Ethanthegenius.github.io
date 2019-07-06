from math import pi
left = input('what is on the left side of your equation?')
right = input('what is on the right side of your equation?')
realsx = None
def solve(x,accuracy):
    global left,right,realx
    bestx = x
    x -= accuracy*6
    
    
    smallest = abs(eval(left)-eval(right))
    for i in range(-1,11):
        x += accuracy
        difference = abs(eval(left)-eval(right))
        if difference == 0:
            
            
            
            realx = x
            return 0
        elif difference < smallest:
            smallest = difference
            bestx = x
    if accuracy < 0.00001:
        
        
        realx = x
        return 0
    
    
    
   
    solve(bestx,accuracy/10)
solve(0,10)
realx = round(realx,14)
print('the answer is:', realx)
