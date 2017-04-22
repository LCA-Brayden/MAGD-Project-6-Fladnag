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
var interBox, interCount, walkerCount, walkerMax, animTracker, animCur; //Game Control Variables
var boxLock, gameGoing, idlePlaying, conjPlaying; //Control Booleans
var towerReg; //Regions
var fladIdle1, fladIdle2, fladConjure, walk1, walk2, walk3; //Animations

function preLoad() {
	//Preload animations + sprites here.

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
    walkerCount = 0;	// Keeps track of number of NPCs on screen.
    walkerMax = 10; 	// Max number of NPCs on screen at once. 
    animTracker = 0.0; 	// Keeps track of idle time/tracks when to play an idle animation (in theory)
    animCur = 0; 		// Keeps track of which animation is currently playing. 

    //Booleans
    boxLock = false; 	// When on, prevents player from conjuring boxes. (used to prevent spam)
    gameGoing = false;	// When on, currentTime counts up, and play is in session. (for score/game control)
    idlePlaying = false;// When on, an Idle animation is playing.
    conjPlaying = false;// When on, the Conjure animation is playing. (used to prevent animation overlap)

    //Gameplay Regions
    towerReg = createVector();
}

function draw() {


	gameTimer();
	gameControl();
	gameMouse();
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
	if (mouseDown && !!(mouse.x <= towerReg.x && mouse.x >= towerReg.w && //Not sure if !! is the right tool to use here, to convert this statement into a boolean. - Brayden
					  mouse.y <= towerReg.y && mouse.y >= towerReg.h) == true) //If the mouse isn't inside of the region set aside for the tower and/or UI, do this:
	{
		//Create box at mouse.x & mouse.y. 
		//Wait for 0.5 seconds
		//Then turn on gravity
	}
}

function animate(toAnim) { // Display animation on demand, on location. 
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
function boxHit(which) { //Depending on which Walker was hit, add Walker's point value to the total score. 

}

function edgeHit(which) { //If a walker makes it to the edge of the screen (the one it doesn't start at), delete Walker. 

}

//Walker Functions