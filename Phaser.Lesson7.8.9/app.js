var game = new Phaser.Game(800,600, Phaser.AUTO, '', 
{preload:preload, create:create, update:update} )

var score = 0;
var life = 3;
//preload: the images that have to load up before the game starts 
function preload(){
	game.load.image('sky', 'assets/sky.png')
	game.load.image('ground', 'assets/platform.png')
	game.load.image('star', 'assets/star.png')
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48)
	game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32)
}

function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//create sky
	game.add.sprite(0,0,'sky');

	//create group of platforms
	platforms = game.add.physicsGroup();
	platforms.enableBody = true;

	//create ground
	var ground = platforms.create(0, 550, 'ground');
	ground.scale.setTo(2,2);
	ground.body.immovable = true;

	//create ledges
	var ledge = platforms.create(400,400,'ground');
	ledge.body.immovable = true;
	ledge = platforms.create(-100,250,'ground');
	ledge.body.immovable = true;

	//set text style
	var style = {font: "bold 32px Arial", fill: "#fff"}



	//position the score
	scorelabel = game.add.text(300,560, "Score:", style);
	scorenumber = game.add.text(300,560, score, style);
	scorelabel.setShadow(3,3, 'rgba(0,0,0,0.5)', 2);
	scorenumber.setShadow(3,3, 'rgba(0,0,0,0.5)', 2);

	//position the Lives
    lifelabel = game.add.text(10,5, "Lives:", style);
    lifenumber = game.add.text(120,5, life, style);
	lifelabel.setShadow(3,3, 'rgba(0,0,0,0.5)', 2);
	lifenumber.setShadow(3,3, 'rgba(0,0,0,0.5)', 2);

	//create the player sprite ('dude')
	player = game.add.sprite(32, 400, 'dude')
	    //animation
	    player.animations.add('left', [0,1,2,3], 10, true);
	    player.animations.add('right', [5,6,7,8], 10, true);
	    game.physics.arcade.enable(player);
	    player.body.bounce.y = 0.2;
	    player.body.gravity.y = 300;
	    player.body.collideWorldBounds = true;

	    //create the enemy1 sprite ('baddie')
	enemy1 = game.add.sprite(760, 20, 'baddie')
	    //animation
	    enemy1.animations.add('left', [0,1], 10, true);
	    enemy1.animations.add('right', [2,3], 10, true);
	    game.physics.arcade.enable(enemy1);
	    enemy1.body.bounce.y = 0.2;
	    enemy1.body.gravity.y = 300;
	    enemy1.body.collideWorldBounds = true;

	    //create the stars 
	    stars = game.add.physicsGroup();
	    stars.enableBody = true;
	    for(var i = 0; i < 12; i++){
	    	var star = stars.create(i*70, 0, 'star');
	    	star.body.gravity.y = 200;
	    	star.body.bounce.y = 0.7 + Math.random()*0.2
	   }
	   cursors = game.input.keyboard.createCursorKeys();
	}


function update(){
	game.physics.arcade.collide(player,platforms);
    game.physics.arcade.collide(enemy1,platforms);
	game.physics.arcade.collide(stars,platforms);

	//player still if no events
	player.body.velocity.x = 0;

	if(cursors.left.isDown){
		player.animations.play('left');
		player.body.velocity.x = -150;
	} else if (cursors.right.isDown){
		player.animations.play('right');
		player.body.velocity.x = 150;
	} else { 
		player.animations.stop();
		player.frame = 4;
}


//jump if touching the ground/platform
   if(cursors.up.isDown && player.body.touching.down){
   	player.body.velocity.y = -300;
   }


game.physics.arcade.overlap(player,stars, collectStar);
game.physics.arcade.overlap(player, enemy1, loseLife);

moveEnemy1();

// if (life <= 0);{
// endGame();
//  }
}
function endGame(){
	player.kill();
	scorelabel.text = "You Died! Your measly score is" + score;
	scorenumber.visible = false;
	lifelabel.visible = false;
	lifenumber.visible = false;
}

function moveEnemy1(){
	if (enemy1.x > 759){
		enemy1.animations.play("left");
		enemy1.body.velocity.x = -120;
	} else if (enemy1.x < 405){
		enemy1.animations.play("right");
		enemy1.body.velocity.x = 120;
	}
}

function collectStar(player,star){
	score +=1;
	star.kill();

	scorenumber.setText(score);
	star.reset(Math.random()*750, 0);
}

function loseLife(player,enemy1){
	life -=1;
	lifenumber.setText(life);

	enemy1.kill();
	enemy1.reset(10,20);
}

