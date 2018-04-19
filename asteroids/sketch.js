var ship;
var asteroids = [];
var lasers = [];
var score = 0;

function setup() {
  createCanvas(windowWidth-50, windowHeight-50);
  ship = new Ship();
  for (var i = 0; i < 10; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(0);

  for (asteroid of asteroids) {
    asteroid.render();
    asteroid.update();
    if (ship.hits(asteroid)) {
      console.log("HIT");
    }
  }

  for (laser of lasers) {
    laser.render();
    laser.update();
  }

  var newAsteroids = [];
  for (laser of lasers) {
    for (asteroid of asteroids) {
      if (!laser.toRemove && laser.hits(asteroid)) {
        score += 1;
        laser.toRemove = true;
        asteroid.toRemove = true;
        if (asteroid.r > 10) {
          var newA = asteroid.breakup()
          newAsteroids.push(newA[0]);
          newAsteroids.push(newA[1]);
        }
      }
    }
  }

  ship.render();
  ship.update();

  var newLasers = [];
  for (laser of lasers) {
    if (!laser.toRemove) {
      newLasers.push(laser);
    }
  }

  for (asteroid of asteroids) {
    if (!asteroid.toRemove) {
      newAsteroids.push(asteroid);
    }
  }

  lasers = newLasers;
  asteroids = newAsteroids;
}

function keyPressed() {
  if (key == ' ') {
    lasers.push(new Laser(ship));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boosting(true);
  } else if (keyCode == DOWN_ARROW) {

  }
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}
