

function Walker(x,y,w,h,d) {
  var spd = random(0,5);
  this.y = y;
  this.w = w;
  this.h = h;
  this.x = x;
  this.d = d;

  this.update = function(){
    this.x += (d*spd);
  }

  this.show = function() {
    push();
    strokeWeight(1);
    stroke(255);
    fill(127);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }

}
