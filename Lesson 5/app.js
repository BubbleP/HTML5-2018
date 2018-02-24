var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var WIDTH = 600;
var HEIGHT = 400;

var x, y;//coordinates x and y for the ball
var mx, my;//movement in x and y directions for the ball

//initilization of the animation - start the updates
function init(){
//initialize the balls properties
x = 300;
y = 200;
mx = 3;
my = 4;
//call uppdate function every 10 milliseconds
setInterval(update, 10);
}
//draw the circle on the screen
function drawCircle(x, y, r){
ctx.beginPath();
ctx.arc(x, y, r, 0, 6.28);
ctx.closePath();
ctx.stroke();
ctx.fillStyle = "black"
ctx.fill();
}
//update the position of the ball and draw the ball at that position
function update(){
 clear();
 drawCircle(x, y, 30);

 //bouncing of the edge
if(x + mx > WIDTH || x + mx < 0){
	mx = -mx;
}
if(y + my > HEIGHT || y + my < 0){
	my = -my;
}

 //moving the ball
 x += mx;
 y += my;
}
//clear everything on our canvas
function clear(){
 ctx.clearRect(0,0, WIDTH, HEIGHT);
}

init();








