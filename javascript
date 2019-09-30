pathWidth = 10;
wall = 2;
outerWall = 2;
width = 25;
height = 25;
delay = 1;
x = Math.round(Math.random()*width)|0;
y = Math.round(Math.random()*height)|0;
startX = x;
startY = y;
seed = Math.random()*100000|0;
colors = ['1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
wallColor = 'black';
pathColor = 'white';
startColor = '#333333';
endColor = '#888888';
randomGen = function(seed){
if(seed===undefined)var seed=performace.now();
return function(){
seed = (seed * 9301 + 49297) % 233280;
return seed/233280;
}
}
init = function(){
offset = pathWidth/2+outerWall;
map = [];
canvas = document.querySelector('canvas');
ctx = canvas.getContext('2d');
canvas.width = outerWall*2+width*(pathWidth+wall)-wall;
canvas.height = outerWall*2+height*(pathWidth+wall)-wall;
ctx.fillStyle = wallColor;
ctx.fillRect(0,0,canvas.width,canvas.height);
random = randomGen(seed);
ctx.strokeStyle = pathColor;
ctx.lineCap = 'square';
ctx.lineWidth = pathWidth;
ctx.beginPath();
for(var i=0;i<height*2;i++){
map[i] = [];
for(var j=0;j<width*2;j++){
map[i][j] = false;
}
}
map[y*2][x*2] = true;
route = [[x,y]];
ctx.moveTo(x*(pathWidth+wall)+offset,
y*(pathWidth+wall)+offset);
}
init();
inputWidth = document.getElementById('width');
inputHeight = document.getElementById('height');
inputPathWidth = document.getElementById('pathwidth');
inputWallWidth = document.getElementById('wallwidth');
inputOuterWidth = document.getElementById('outerwidth');
inputPathColor = document.getElementById('pathcolor');
inputWallColor = document.getElementById('wallcolor');
inputStartColor = document.getElementById('startcolor');
inputEndColor = document.getElementById('endcolor');
inputSeed = document.getElementById('seed');
settings = {
display: function(){
inputWidth.value = width;
inputHeight.value = height;
inputPathWidth.value = pathWidth;
inputWallWidth.value = wall;
inputOuterWidth.value = outerWall;
inputPathColor.value = pathColor;
inputWallColor.value = wallColor;
inputStartColor.value = startColor;
inputEndColor.value = endColor;
inputSeed.value = seed;
},
check: function(){
if(inputWidth.value != width||inputHeight.value != height||inputPathWidth.value != pathWidth||inputWallWidth.value != wall||inputOuterWidth.value != outerWall||inputPathColor.value != pathColor||inputWallColor.value != wallColor||inputStartColor.value != startColor||inputEndColor.value != endColor||inputSeed.value != seed){
settings.update();
}
},
update: function(){
clearTimeout(timer);
width = parseFloat(inputWidth.value);
height = parseFloat(inputHeight.value);
pathWidth = parseFloat(inputPathWidth.value);
wall = parseFloat(inputWallWidth.value);
outerWall = parseFloat(inputOuterWidth.value);
pathColor = inputPathColor.value;
wallColor = inputWallColor.value;
startColor = inputStartColor.value;
endColor = inputEndColor.value;
seed = parseFloat(inputSeed.value);
x = startX;
y = startY;
init();
loop();
}
}
loop = function(){
x = route[route.length-1][0]|0;
y = route[route.length-1][1]|0;
var directions = [[1,0],[-1,0],[0,1],[0,-1]],
alternatives = [];  
for(var i=0;i<directions.length;i++){
if(map[(directions[i][1]+y)*2]!=undefined&&
map[(directions[i][1]+y)*2][(directions[i][0]+x)*2]===false){
alternatives.push(directions[i]);
}
}
if(alternatives.length===0){
route.pop();
if(route.length>0){
ctx.moveTo(route[route.length-1][0]*(pathWidth+wall)+offset,
route[route.length-1][1]*(pathWidth+wall)+offset);
timer = setTimeout(loop,delay);
}
return;
}
direction = alternatives[random()*alternatives.length|0];
route.push([direction[0]+x,direction[1]+y]);
ctx.strokeStyle = pathColor;
ctx.lineTo((direction[0]+x)*(pathWidth+wall)+offset,(direction[1]+y)*(pathWidth+wall)+offset);
map[(direction[1]+y)*2][(direction[0]+x)*2] = true;
map[direction[1]+y*2][direction[0]+x*2] = true;
ctx.stroke();
ctx.fillStyle = endColor;
ctx.fillRect((0)*(pathWidth+wall)+wall,(0)*(pathWidth+wall)+wall, pathWidth, pathWidth);
ctx.fillStyle = startColor;
ctx.fillRect((width-1)*(pathWidth+wall)+wall,(width-1)*(pathWidth+wall)+wall, pathWidth, pathWidth);
timer = setTimeout(loop,delay);
}
settings.display();
loop();
setInterval(settings.check,400);
