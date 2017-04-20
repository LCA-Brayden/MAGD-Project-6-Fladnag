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
var interBox, interCount, walkerMax, animTracker; //Game Control Variables
var boxLock, gameGoing, idlePlaying; //Control Booleans

function preLoad() {

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

    //Variable Declarations
    dayLength = 120.0; //2 Minutes
    currentTime = 0.0;
    currentScore = 0;
    interBox = 2.0; 
    walkerMax = 10; 
    animTracker = 0.0; // Keeps track of idle time/tracks when to play an idle animation (in theory)

    //Booleans
    boxLock = false; 
    gameGoing = false;
    idlePlaying = false;
}

function draw() {


	gameTimer();
	gameControl();
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


	//Idle/Animation Control 

}

function heyListen() {
	//Any Event Listeners we might want go here. 
}

//Event Listener functions go here. 


//Collision Detection functions go here. 
function boxHit(which) { //Depending on which Walker was hit, add Walker's point value to the total score. 

}

function edgeHit(which) { //If a walker makes it to the edge of the screen (the one it doesn't start at), delete Walker. 

}