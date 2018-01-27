console.log("bello people");

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

//create image
var yingyang = new Image();
//set source
yingyang.src = "yingyang.jpeg";

yingyang.onload = function(){
	ctx.drawImage(yingyang, 75,75,200,200);
}




var c2 = document.getElementById("myCanvas2");
var ctx2 = c2.getContext("2d");

ctx2.fillStyle = "#020747";
ctx2.fillRect(0,0,800,350);
ctx2.fillStyle = "#003303";
ctx2.fillRect(0,350,800,150);


