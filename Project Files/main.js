/* MAGD Interactive Comms Project 6 - Fladnag the Flatulent - main.js
		This file is meant to be the main driving force behind our game, as well as a connecting hub for all variable declarations,
		settings, etc. This project is meant to simulate a cranky old wizard dropping boxes on passing walkers' heads, for points.

		Current Functionality Goal:
		- Get the code structured and ironed out.
		- Work out how to integrate p5.play + matter.js into mechanics.

		Created by BEDH Team
		*/

//Variable Initialization
var framerate; //Settings
var dayLength, currentTime, currentScore; //Gameplay
var interBox, interBoxCheck, interCount, walkerCount, walkerMax, animTracker, animCur, mouse; //Game Control Variables
var boxLock, gameGoing, idlePlaying, conjPlaying; //Control Booleans
var towerReg; //Regions
var fladIdle1, fladIdle2, fladConjure, walk1, walk2, walk3; //Animations
var walkers, boxes; // Arrays
var backIMG;

var engine; //Matter.js Variables
var world;
var ground;
var options;
var Engine = Matter.Engine,
World = Matter.World,
Bodies = Matter.Bodies;

function preload() {
	//Preload animations + sprites here.
	backIMG = loadImage("data/background.png");
	//loadAnimation(sprite);

	heyListen();
}

function setup() {
	createCanvas(1020,780);
    framerate = 60;
    frameRate(framerate);

	// Image/Shape Settings
    colorMode(RGB, 255);
    stroke(1);
    fill(0,255,0);
    strokeCap(SQUARE);
    strokeJoin(MITER);
    noSmooth();
    ellipseMode(CENTER);

    // Text Display Settings
    textAlign(CENTER, CENTER);
    textLeading(25);
    textSize(15);
    textStyle(NORMAL);

    // Other Settings
    updateSprites(true); // Can pause sprites + animations.

    //Variable Declarations
    dayLength = 120.0; 	// 2 Minutes - length of playtime in seconds.
    currentTime = 0.0; 	// Counts up to dayLength - currentt play session's length in seconds.
    currentScore = 0; 	// Keeps track of score.
    interBox = 2.0; 	// Buffer time in seconds between each box drop.
		interBoxCheck = 0; //Will spawn a box when interBoxCheck == 0 if the mouse is pressed.
    walkerCount = 0;	// Keeps track of number of NPCs on screen.
    walkerMax = 10; 	// Max number of NPCs on screen at once.
    animTracker = 0.0; 	// Keeps track of idle time/tracks when to play an idle animation (in theory)
    animCur = 0; 		// Keeps track of which animation is currently playing.
    mouse = createVector(0, 0);

    //Booleans
    boxLock = false; 	// When on, prevents player from conjuring boxes. (used to prevent spam)
    gameGoing = false;	// When on, currentTime counts up, and play is in session. (for score/game control)
    idlePlaying = false;// When on, an Idle animation is playing.
    conjPlaying = false;// When on, the Conjure animation is playing. (used to prevent animation overlap)

    //Gameplay Regions
    towerReg = createVector();

    //Arrays
    walkers = [];
    boxes = [];

    //Functions
    matterCheck();

	engine = Engine.create();	//Matter.js setup
	world = engine.world;
	options = {isStatic: true}
	ground = Bodies.rectangle(width/2, height, width, 100, options);
	World.add(world, ground); 	//end of matter.js setup
}

function draw() {
	background(0);
	image(backIMG, width/2, height/2, 100, 100);

	gameTimer();
	gameControl();
	gameMouse();
	showboxes();
  	showWalker();
	boxTimer();

  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width, 100);
}

function gameTimer() { //Constantly count up from current time until it reaches dayLength. Then, stop the game.
	if (gameGoing = true) {
		if (currentTime <= dayLength) {
			//Do nothing or keep counting.
			//Move Sun across its arc via currentTime/dayLength percentage.
		}
		else {
			gameGoing = false;
			//End game sequence, display final score, etc.
		}
	}
}

function gameControl() { //Various settings for game control/balance. Stuff like an interim timer between box drops, max number of Walkers on screen, idle animations.
	//BoxLock control
	if (boxLock == true) {
		//Count to interBox cap via for loop or another statement
		if (interCount < interBox)
			interCount += 1; //Placeholder value
		else {
			interCount = 0;
			boxLock = false;
		}
	}
	//Walker Control
		// Spawns and controls the number of Walkers on screen. Keeps track of walkerCount.

	//Idle/Animation Control
	switch (animCur) {
		case 0: //Idle 1 Animation
				break;
		case 1: //Idle 2 Animation
				break;
		case 2: //Conjure Animation
				break;
		default: //Idle 1 Animation
				break;
	}
}

function gameMouse() { //Contains all mouse control functions.
	mouse.x = mouseX;
	mouse.y = mouseY;

	if (mouseDown && !!(mouse.x <= towerReg.x && mouse.x >= towerReg.w && //Not sure if !! is the right tool to use here, to convert this statement into a boolean. - Brayden
					  mouse.y <= towerReg.y && mouse.y >= towerReg.h) == true) //If the mouse isn't inside of the region set aside for the tower and/or UI, do this:
	{
		//Create box at mouse.x & mouse.y.
		//Wait for 0.5 seconds
		//Then turn on gravity
	}
}

function animate(toAnim, x, y) { // Display animation on demand, on location.
	//animation(anim, x, y);
	animation(toAnim, x, y);
}

function heyListen() {
	//Any Event Listeners we might want go here.


}

//Event Listener functions go here.
function gameStart() { //Reset all variables, start game fresh.
	//Clear all Walkers currently in game.
	currentTime = 0.0;
	currentScore = 0;
	gameGoing = true;
	boxLock = false;
}

function gamePause() { //Turns off gameGoing, which stops all gameplay. (stops currentTime, freezes all objects.)
	gameGoing = false;
	updateSprites(false);
	// Freeze walkers and boxes in place.

	// (Idea) Alter CSS of menu objects like buttons, etc. to alter current buttons shown. - Brayden
}

function gameResume() { //Turns on gameGoing, resuming all gameplay. Frees all objects.
	gameGoing = true;
	updateSprites(true);
	// Return velocity to all previously moving objects.
}

function gameEnd() { // Turns off booleans, updateSprites, and stops all counting.
	gameGoing = false;
	updateSprites(false);
}

//Collision Detection functions go here.
function matterCheck() { //Check if Walker and Box objects can collide, make sure Matter.js is functioning properly. If not, return an error and ask for reload.

}

function boxHit(which) { //Depending on which Walker was hit, add Walker's point value to the total score.

}

function edgeHit(which) { //If a walker makes it to the edge of the screen (the one it doesn't start at), delete Walker.

}

//Walker Class/Functions
function Walker(x, y, image) {
	this.xPos;
	this.shape;
}


/*function createWalker(walkType, walkDir) {
	switch (walkType) {
		case 1:
			walkers[walkers.length].push("walker1", "left"); //No Idea what I'm doing here. Theory is we use an array to measure how many walkers are on screen.
			//Draw Walker 1 Sprite/Image series, start moving along x axis at +1 or -1.
			break;
		case 2:
			break;
		case 3:
			break;
	}
}*/

function showboxes(){
	Engine.update(engine);
  for (var i = 0; i < boxes.length; i++)
	{ boxes[i].show();}
  noStroke(255);
  fill(170);
}

function boxTimer(){
	if(interBoxCheck > 0){
		interBoxCheck--;
	}
}

function showWalker(){
  for(i = 0; i<walkers.length;i++){
    walkers[i].update();
    walkers[i].show();
  }
}

function mousePressed() {
	if(interBoxCheck == 0){
  	boxes.push(new Box(mouseX, mouseY, 40,40));
		interBoxCheck = interBox*framerate;
	}
}

function keyPressed(){
  var check = int(random(0,2));
  console.log(check);
  if(check == 0){
  	if (walkers.length < walkerMax) {
    	walkers.push(new Walker(-40,height-100,40,100,1));
	}
  }
  if(check == 1){
  	if (walkers.length < walkerMax) {
    	walkers.push(new Walker(width+40,height-100,40,100,-1));
	}
  }
}
