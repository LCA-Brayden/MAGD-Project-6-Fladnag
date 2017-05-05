

function Walker(x,y,w,h,d) {
  var spd = random(0,5);
  var isOnScreen = true;
  this.y = y;
  this.w = w;
  this.h = h;
  this.x = x;
  this.d = d;

  this.update = function(){
    if(isOnScreen)
    this.x += (d*spd);

    }

  this.isOffScreen = function() {
    if(d == 1 && this.x >= width+w){
    	return true;
    }
    if(d ==-1 && this.x <= -w){
    	return true;
  }
  else return false;
}


  this.show = function() {
    push();
    strokeWeight(1);
    stroke(255);
    fill(127);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }

}
