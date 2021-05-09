/**
Game
Feb 28, 2021
-Game Screen
-Playable Character with image
-Added Gravity
-Added Friction (Air resistance)
-Added Ground Collision
-Added Jumping on key press
Mar 1, 2021
-Added moving obstacles
-Added obstacle collision
-Added Score counter
-Added Increasing speed of obstacles
Mar 8, 2021
-Added adjustable floor height
 */

var myGamePiece; //Playable Character
var myObstacles = []; //Obstacle Array
var myFloor;
var myScore; //Score
var grndLvl = 270-35; //game floor
var obsAssets = [
	[30, 30, "bush.png"],
	[79, 21, "log.png"],
	[77, 35, "rock.png"],
	[90, 30, "bush2.png"]
	];

function startGame() {
	myFloor = new component(880, 35, "ground.png", 0, 300, "background");
	myGamePiece = new component(25, 30, "guy.png", 100, grndLvl, "image"); //270-30(character height)
	myScore = new component("30px", "Consolas", "black", 40, 40, "text");
	myGameArea.start();
}

//Game Screen
var myGameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = 880; //dimensions
		this.canvas.height = 270;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.frameNo = 0;
		this.interval = setInterval(updateGameArea, 20); //Updates frames
		window.addEventListener('keydown', function (e) { //listens for key press
      		myGameArea.key = e.keyCode;
		})
    	window.addEventListener('keyup', function (e) { //resets key press value when key is up
      		myGameArea.key = false;
    	})
  	},
	clear : function() { //removes old frames
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
	stop : function() {
    clearInterval(this.interval);
  	},
}

//Components - Characters, Obstacles, etc.
function component(width, height, image, x, y, type) {
	this.image = new Image(); //creates image object
    this.image.src = image; //assigns a source for image
	this.width = width;
  	this.height = height;
  	this.x = x; //x-position
  	this.y = y; //y-position
	this.y_velocity = 0;
	this.jumping = true;

	this.update = function(){
        ctx = myGameArea.context;
		if (type == "text"){ //renders text for score
			ctx.font = this.width + " " + this.height;
	    	ctx.fillStyle = image;
	    	ctx.fillText(this.text, this.x, this.y);
		}
		else{
			ctx.drawImage(this.image, this.x, this.y, this.width, this.height); //renders image

		}
	}
	
	this.newPos = function() { //creates movement
		if (this.type == "background") {
			if (this.x == -(this.width)) {
				this.x = 0;
				}
		}
		else{
			this.y_velocity += 1.5; //gravity
		    this.y += this.y_velocity;
			this.y_velocity *= 0.9; //friction
			this.jumping = true; 
	        this.hitBottom();
		}
	}
	
	//Object Collision
	this.crashWith = function(otherobj) {
	    var myleft = this.x;
	    var myright = this.x + (this.width);
	    var mytop = this.y;
	    var mybottom = this.y + (this.height);
	    var otherleft = otherobj.x;
	    var otherright = otherobj.x + (otherobj.width);
	    var othertop = otherobj.y;
	    var otherbottom = otherobj.y + (otherobj.height);
	    var crash = true;
	    if ((mybottom < othertop) ||
	    (mytop > otherbottom) ||
	    (myright < otherleft) ||
	    (myleft > otherright)) {
	    	crash = false;
	    }
	    return crash;
	}
	
	//Ground Collision
	this.hitBottom = function() {
	    var rockbottom = grndLvl - this.height; //myGameArea.canvas.height - this.height;
	    if (this.y > rockbottom) {
			this.y = rockbottom;
			this.jumping = false;
	    }
	}
}
var obsSpeed = -5;
function updateGameArea() {
	
	if(everyinterval(150)){
		if(obsSpeed>-20){
			obsSpeed = obsSpeed * 1.1;
		}
	}
	myGameArea.clear();
	myFloor.speedX = -1;
    myFloor.newPos();    
    myFloor.update();
	myGameArea.frameNo += 1; //increments frame no.
  	if (myGameArea.frameNo == 1 || everyinterval(150)) { //spawns obstacles every x no of frames
    	x = myGameArea.canvas.width;
		num = getRandomInt(obsAssets.length);
		console.log(num);
		console.log(obsAssets[num][1]);
    	myObstacles.push(new component(obsAssets[num][0], obsAssets[num][1], obsAssets[num][2], x, grndLvl-obsAssets[num][1], "image")); //creates obstacle object
  	}
	for (i = 0; i < myObstacles.length; i += 1) { //updates every obstacle
    	myObstacles[i].x += obsSpeed; //obstacle speed
    	myObstacles[i].update();
  	}
	if (myGameArea.key == 32 && myGamePiece.jumping == false) { //gives upward velocity on spacebar
		myGamePiece.y_velocity -= 40; myGamePiece.jumping == true;}
	if (myGameArea.key == 38 && myGamePiece.jumping == false) { //gives upward velocity on arrow up
		myGamePiece.y_velocity -= 40; myGamePiece.jumping == true;}
	myGamePiece.newPos();
	myGamePiece.update();
	
	myScore.text = "SCORE: " + myGameArea.frameNo; // score text
  	myScore.update();
	for (i = 0; i < myObstacles.length; i += 1) {
	    if (myGamePiece.crashWith(myObstacles[i])) {
	      myGameArea.stop();
	      return;
	    } 
	}
}

function getRandomInt(max) { //random int from 0 to max-1
  return Math.floor(Math.random() * Math.floor(max));
}

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}

startGame();
