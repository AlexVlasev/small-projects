function Ship() {
  this.pos = createVector(width/2, height/2);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.r = 20;
  this.heading = 0;
  this.rotation = 0;
  this.isBoosting = false;

  this.update = function() {
    this.turn();
    if (this.isBoosting) {
      this.boost();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.99);
    this.edges();
  }

  this.boosting = function(bool) {
    this.isBoosting = bool;
  }

  this.boost = function() {
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.vel.add(force);
  }

  this.hits = function(asteroid) {
    d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    return d < this.r + asteroid.r;
  }

  this.render = function() {
    var r = this.r;
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI/2);
    fill(0);
    stroke(255);
    triangle(-r, r, r, r, 0, -r);
    pop();
  }

  this.turn = function(angle) {
    this.heading += this.rotation;
  }

  this.setRotation = function(a) {
    this.rotation = a;
  }

  this.edges = function() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r
    }

    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r
    }
  }
}