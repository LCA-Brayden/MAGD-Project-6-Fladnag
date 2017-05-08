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
var interBox, interBoxCheck, interCount, walkerCount, walkerMax, animTracker, animCur, animFrame, animDelay, mouse; //Game Control Variables
var boxLock, gameGoing, idlePlaying, conjPlaying,spawnBox; //Control Booleans
var towerReg; //Regions
var fladIdle1, fladIdle2, fladIdle3, fladIdle4, fladConjureL, fladConjureR, walk1, walk2, walk3; //Animations
var fladIdle1Sh, fladIdle2Sh, fladIdle3Sh, fladIdle4Sh, fladConjureLSh, fladConjureRSh, walk1Sh, walk2Sh, walk3Sh; //Spritesheets
var back, box1, box2, box3; //Static Images
var walkers, boxes, anim; // Arrays
var fladPos, fladDim; //Fladnag Points
var spawncolor;
var animFrames;


var engine; //Matter.js Variables
var world;
var boxes = [];
var walkers = [];
var ground;
var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies;   // end of matter.js Variables

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
    dayLength = 7200.0; // 2 Minutes - length of playtime in seconds.
    currentTime = 0.0; 	// Counts up to dayLength - currentt play session's length in seconds.
    currentScore = 0; 	// Keeps track of score.
    interBox = 1.0; 	// Buffer time in seconds between each box drop.
	  interBoxCheck = 0; //Will spawn a box when interBoxCheck == 0 if the mouse is pressed.
    walkerCount = 0;	// Keeps track of number of NPCs on screen.
    walkerMax = 10; 	// Max number of NPCs on screen at once.
    animTracker = 0.0; 	// Keeps track of idle time/tracks when to play an idle animation (in theory)
    animCur = 0; 		// Keeps track of which animation is currently playing.
    animFr = 0; 		// Keeps track of what frame the current animation is on. 
    animFrames = 0; 	// keeps track of how many frames are left in the current animation state
    animDelay = 5.0; 	// Amount of frames of delay between each new animation frame 
    fladPos = createVector(width/3+40, 35);
    mouse = createVector(0, 0);


    //Booleans
    boxLock = false; 	// When on, prevents player from conjuring boxes. (used to prevent spam)
    gameGoing = false;	// When on, currentTime counts up, and play is in session. (for score/game control)
    idlePlaying = false;// When on, an Idle animation is playing.
    conjPlaying = false;// When on, the Conjure animation is playing. (used to prevent animation overlap)
    spawnBox = true; // changes to false when the mouse us unfairly close to the walkers.

    //Gameplay Regions
    towerReg = createVector();

    //Images
    back = loadImage("data/background1.png"); //Background Image
    box1 = loadImage("data/box1.png");
    box2 = loadImage("data/box2.png");
    box3 = loadImage("data/box3.png");



    //Functions
    animPrep(); 	//Create and assign all image objects

	engine = Engine.create(); //Matter.js setup
	world = engine.world;
	var options = {isStatic: true}//end of matter.js setup

  spawnColor = 255; // color of the transparent box that indicates where a box will spawn
}

function draw() {
  if(dayLength > frameCount){
	background(back, 75);

	// Debug Spritesheet Display
	//image(fladIdle1Sh, 0, 0);

	gameTimer();
	gameControl();
	gameMouse();
  animState();
	showboxes();
  showWalker();
	boxTimer();
  boxCheck();

  if(boxes.length > 0 && walkers.length > 0){
    detectCollision();
  }

  if(frameCount % 90 ==0){
    createWalker();
  }

  push();
  fill(255,spawnColor,spawnColor,125)
  rectMode(CENTER);
  rect(mouseX,mouseY,60, 60);
  pop();
  }
  else{
    background(0);
  }
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

	//Idle/Animation Control: Fladnag
	switch (animCur) {
		case 0: //Idle 1 Animation
			animDraw(fladIdle1, fladIdle1Sh, fladPos.x, fladPos.y);
				break;
		case 1: //Idle 2 Animation
				break;
		case 2: //Conjure Animation
				break;
		default: //Idle 1 Animation
				break;
	}
}

function animState(){
  if(animCur == 0 && animFrames ==0){
    animCur = int(random(1,3));
    if(animCur == 1){
      animFrames == 999;  //just a filler variable
    }
    if(animCur == 2){
      animFrames == 999; //just a filler variable
    }
  }

   if(animFrames == 0){
    animCur = 0;
    animFrames == 999; //just a filler variable
  }

  animFrames--;
}

function animDraw(animObj, animSheet, destX, destY) {
	var frames = animObj.getCellCnt();
	var dX = animObj.getDimX(); 
	var dY = animObj.getDimY();

	push();
	imageMode(CORNER);
	image(animSheet, animObj.getX(animFr), animObj.getY(animFr), dX, dY, destX, destY, dX, dY);

/*//Debug SpriteSheet
	stroke(255, 0, 0);
	rect(animObj.getX(animFr), animObj.getY(animFr), dX, dY);*/
	pop();

	if (animFr < frames
		&& frameCount % animDelay == 0) 
	{
		animFr++;
	}
	if (animFr == frames) {
		animFr = 0;
	}
}

function gameMouse() { //Contains all mouse control functions.
	mouse.x = mouseX;
	mouse.y = mouseY;
}

function animate(toAnim, x, y) { // Display animation on demand, on location.
	//animation(anim, x, y);
	animation(toAnim, x, y);
}

function heyListen() {
	//Any Event Listeners we might want go here.


}

function animPrep() { //Loads & Retrieves SpriteSheet data for later use. Stores all data in anim[] array, via SprSheet objects.
	// fladIdle1, fladIdle2, fladIdle3, fladIdle4, fladConjureL, fladConjureR, walk1, walk2, walk3
	// new SprSheet (rows, columns, img, dimX, dimY, cellCnt)
	fladIdle1Sh = loadImage("data/anim/fladnag_idle_sheet.png"); 		// Main Idle
	fladIdle1 = new SprSheet(10, 6, fladIdle1Sh, 1200, 1545, 60);
	fladIdle1.sliceSheet(10, 6, 1200, 1545, 60);
	fladIdle1.getTestArray(6, 6);

	fladIdle2Sh = loadImage("data/anim/fladnag_fidget1_sheet.png"); 	// Idle Fidget 1
	fladIdle2 = new SprSheet(10, 5, fladIdle2Sh, 3960, 6120, 50);
	fladIdle2.sliceSheet(10, 5, 3960, 6120, 50);
	fladIdle2.getTestArray(5, 5);

	fladIdle3Sh = loadImage("data/anim/fladnag_fidget2_sheet.png"); 	// Idle Fidget 2
	fladIdle3 = new SprSheet(6, 5, fladIdle3Sh, 3960, 3672, 29);
	fladIdle3.sliceSheet(6, 5, 3960, 3672, 29);
	fladIdle3.getTestArray(27, 27);

	fladIdle4Sh = loadImage("data/anim/fladnag_fidget3_sheet.png"); 	// Idle Fidget 3
	fladIdle4 = new SprSheet(5, 6, fladIdle4Sh, 4572, 3060, 30);
	fladIdle4.sliceSheet(5, 6, 4572, 3060, 30);
	fladIdle4.getTestArray(27, 27);
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

function detectCollision(){
  for (var i = 0; i < boxes.length; i++){
    for (var j = 0; j < walkers.length; j++){
      if(boxes[i].positionX()-(boxes[i].w/2) <= walkers[j].positionX()+(walkers[j].w/2)
      && boxes[i].positionX()+(boxes[i].w/2) >= walkers[j].positionX()-(walkers[j].w/2)
      && boxes[i].positionY()+(boxes[i].h/2) >= walkers[j].positionY()-(walkers[j].h/2)
      && boxes[i].positionY()-(boxes[i].h/2) <= walkers[j].positionY()+(walkers[j].h/2)){
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
  for (var i = 0; i < boxes.length; i++){
    switch(boxes[i].t){     // draw the image for the box at boxes[i].positionX() , boxes[i].positionY() the width and height are boxes[i].w , boxes[i].h
      case 0:
        image(box1, boxes[i].positionX()-(boxes[i].w/2),  boxes[i].positionY()-(boxes[i].h/2),60,60);
        break;
      case 1:
        image(box2, boxes[i].positionX()-(boxes[i].w/2),  boxes[i].positionY()-(boxes[i].h/2),60,60);
        break;
      case 2:
        image(box3, boxes[i].positionX()-(boxes[i].w/2),  boxes[i].positionY()-(boxes[i].h/2),60,60);
        break;
    }
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
    switch(walkers[i].t){ // draw the image for the walkers at walkers[i].positionX() , walkers[i].positionY() the width and height are walkers[i].w , walkers[i].h
      case 0:

        break;

      case 1:

        break;

      case 2:

        break;
    }

  }
}

function boxTimer(){
	if(interBoxCheck > 0){
		interBoxCheck--;
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
  	boxes.push(new Box(mouseX, mouseY, 60, 60,int(random(0,3))));
		interBoxCheck = interBox*framerate;
	}
}

function createWalker() {
	var check = int(random(0,2));
  if(check == 0){
    walkers.push(new Walker(-20,height-100,40,100,1,int(random(0,3))));
  }
  if(check == 1){
    walkers.push(new Walker(width+20,height-100,40,100,-1,int(random(0,3))));
  }
}
