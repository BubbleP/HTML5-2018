console.log("bello people");

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var WIDTH = 600;
var HEIGHT = 600;

//position of the player
var x = 300;
var y = 300;
var s = 50;

//speed of the player
var mx = 0;
var my = 0;

//position of ice cream(item)
var itemX;
var itemY;
var itemS = 50;

var collision = false;

var score = 0;

function drawPlayer(){
	var player = new Image();
	player.src = "ghost.jpg";
	ctx.drawImage(player,x,y,s,s)
}

function drawItem(){
	var item = new Image();
	item.src = "icecream.jpg";
	ctx.drawImage(item,itemX,itemY,itemS,itemS)
}

//clear the screen
function clear(){
	ctx.clearRect(0,0,WIDTH, HEIGHT);
}

//kickstart the game
function init(){
	//item random position
	itemX= Math.floor(Math.random()* (WIDTH - itemS));
	itemY= Math.floor(Math.random()* (HEIGHT - itemS));

	//wait for keyboard press
	window.onkeydown = keydownControl;

	//update the canvas
	return setInterval(draw, 10);
}

function keydownControl(e){
	if (e.keyCode == 37){
		mx = -4;
		my = 0;
	}else if (e.keyCode == 38){
		mx = 0;
		my = -4;
	}
	else if (e.keyCode == 39){
		mx = 4;
		my = 0;
	}
	else if (e.keyCode == 40){
		mx = 0;
		my = 4;
	}
}

//draw the frames
 function draw(){
 	clear();
 	drawPlayer();
 	drawItem();

//bounce at edge
    if(x+mx < 0 || x+mx > WIDTH -s) {
       mx = -mx;
    }
        if(y+my < 0 || y+my > HEIGHT -s) {
       my = -my;
    }


 	//move player
 	x += mx;
 	y += my;

 	//ask if there is a collision occuring
 	collisionCheck();
 	collisionHandle();
 }

function collisionCheck(){
	if( (x+s >= itemX) && (x <= itemX + itemS) && 
		(y+s >= itemY) && (y <= itemY + itemS)) {
		collision = true;
} else{
	collision = false;
}

}

function collisionHandle(){
	if(collision) {
		itemX= Math.floor(Math.random()* (WIDTH - itemS));
	    itemY= Math.floor(Math.random()* (HEIGHT - itemS));

	    score += 1;
	    document.getElementById("score").innerHTML = "Score: " + score;

	}
}
init();





