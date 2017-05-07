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
var boxLock, gameGoing, idlePlaying, conjPlaying,spawnBox; //Control Booleans
var towerReg; //Regions
var fladIdle1, fladIdle2, fladConjure, walk1, walk2, walk3; //Animations
var back, box1, box2, box3; //Static Images
var walkers, boxes, anim; // Arrays
var spawncolor;


var engine; //Matter.js Variables
var world;
var boxes = [];
var walkers = [];
anim = [];
var ground;
var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies;   // end of matter.js Variables


function preLoad() {
	//Fladnag
	fladIdle1 = loadImage("data/anim/fladnag_idle_sheet.png"); 		// Main Idle Loop
	fladIdle2 = loadImage("data/anim/fladnag_fidget1_sheet.png");	// Fidget Animation 1
	// fladConjure = loadImage("data/anim/fladnag_conjure1_sheet.png"); // Conjure Animation 1

	// Walkers
	// walk1 = loadImage("data/anim/walker1_sheet.png"); //Walker 1 Cycle
	// walk2 = loadImage("data/anim/walker2_sheet.png"); //Walker 2 Cycle
	// walk3 = loadImage("data/anim/walker3_sheet.png"); //Walker 3 Cycle



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
    spawnBox = true;

    //Gameplay Regions
    towerReg = createVector();

    //Images
    back = loadImage("data/background1.png"); //Background Image
    box1 = loadImage("data/box1.png");
    box2 = loadImage("data/box2.png");
    box3 = loadImage("data/box3.png");

    //Functions
    matterCheck();

	engine = Engine.create(); //Matter.js setup
	world = engine.world;
	var options = {isStatic: true}//end of matter.js setup

  spawnColor = 255;
}

function draw() {
	background(back, 100);

	gameTimer();
	gameControl();
	gameMouse();
	showboxes();
  showWalker();
	boxTimer();
  boxCheck();

  if(boxes.length > 0 && walkers.length > 0){
    detectCollision();
  }
  push();
  fill(255,spawnColor,spawnColor,125)
  rectMode(CENTER);
  rect(mouseX,mouseY,40,40);
  pop();
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

/*function createWalker() {
	var check = int(random(0,2));
  if(check == 0){
    walkers.push(new Walker(-20,height-50,40,100,1));
  }
  if(check == 1){
    walkers.push(new Walker(width+20,height-50,40,100,-1));
  }
}*/

function detectCollision(){
  for (var i = 0; i < boxes.length; i++){
    for (var j = 0; j < walkers.length; j++){
      if(boxes[i].positionX()-(boxes[i].w/2) <= walkers[j].positionX()+(walkers[j].w/2)
      && boxes[i].positionX()+(boxes[i].w/2) >= walkers[j].positionX()-(walkers[j].w/2)
      && boxes[i].positionY()+(boxes[i].h/2) >= walkers[j].positionY()-(walkers[j].h/2)
      && boxes[i].positionY()-(boxes[i].h/2) <= walkers[j].positionY()+(walkers[j].h/2)){
        console.log("Collision");
        walkers.splice(j, 1);
        j--;
      }
    }
 }
}

function showboxes(){
	Engine.update(engine);
  for (var i = 0; i < boxes.length; i++) {
    if (boxes[i].isOffScreen()) {
      boxes[i].removeFromWorld();
      boxes.splice(i, 1);
      i--;
    }
  }
  for (var i = 0; i < boxes.length; i++)
	{ boxes[i].show();}
}

function boxTimer(){
	if(interBoxCheck > 0){
		interBoxCheck--;
	}
}

function showWalker(){
  for (var i = 0; i < walkers.length; i++) {
    walkers[i].update();
    if (walkers[i].isOffScreen()) {
      walkers.splice(i, 1);
      i--;
    }
  }

  for(i = 0; i<walkers.length;i++){

    walkers[i].show();
  }
}

function boxCheck(){
  if(mouseY >= 590 ){
    spawnColor = 0;
    spawnBox = false;
  }
  else {
    spawnColor = 255;
    spawnBox = true;
  }
}

function mousePressed() {
	if(interBoxCheck == 0 && spawnBox){
  	boxes.push(new Box(mouseX, mouseY, 40,40));
		interBoxCheck = interBox*framerate;
	}
}

function keyPressed(){
  var check = int(random(0,2));
 if(check == 0){
    walkers.push(new Walker(-20,height-100,40,100,1));
 }
 if(check == 1){
   walkers.push(new Walker(width+20,height-100,40,100,-1));
 }
}
