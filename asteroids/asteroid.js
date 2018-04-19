function Asteroid(pos, r) {
  if (pos) {
    this.pos = pos.copy();
  } else {
    this.pos = createVector(random(width), random(height));
  }
  this.vel = p5.Vector.random2D();
  if (r) {
    this.r = r*0.5;
  } else {
    this.r = random(20, 40);
  }
  this.toRemove = false;
  this.total = random(5, 15);
  this.coordinates = [];
  for (var i = 0; i < this.total; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var scale = random(0.8, 1.2);
      var x = (this.r*scale) * cos(angle);
      var y = (this.r*scale) * sin(angle);
      this.coordinates.push([x, y]);
  }

  this.update = function() {
    this.pos.add(this.vel);
    this.edges();
  }

  this.breakup = function() {
    var newAsteroids = [];
    newAsteroids.push(new Asteroid(this.pos, this.r));
    newAsteroids.push(new Asteroid(this.pos, this.r));
    return newAsteroids;

  }

  this.render = function() {
    push();
    noFill();
    stroke(255);
    translate(this.pos.x, this.pos.y);
    beginShape();
    for (var i = 0; i < this.total; i++) {
      vertex(this.coordinates[i][0], this.coordinates[i][1]);
    }
    endShape(CLOSE);
    pop();
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