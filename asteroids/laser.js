function Laser(ship) {
  this.pos = createVector(ship.pos.x, ship.pos.y);
  this.vel = p5.Vector.fromAngle(ship.heading);
  this.vel.mult(5);
  this.toRemove = false;

  this.update = function() {
    this.pos.add(this.vel);
  }

  this.render = function() {
    push();
    stroke(255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
    pop();
  }

  this.hits = function(asteroid) {
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    return d < asteroid.r;
  }

  this.offscreen = function() {
    if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
      this.toRemove = true;
    }
  }
}