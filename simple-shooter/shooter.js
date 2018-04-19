var numObjects = 20;
var objects = [];
var length = 200;
var margin = 20;

var pos;
var lookVec;
var lookAt;
var speed = 1;
var walkTowards;
var strafeTowards;

var angleVert = 0;
var angleHor = 0;

var axisVert = [0, 1, 0];
var axisHor = [1, 0, 0];
var axisZ = [0, 0, -1];

var toggleSim = true;
var toggleWalking = 0;
var toggleStrafing = 0;

function setup() {
		noCursor();
  	createCanvas(windowWidth - margin, windowHeight - 10*margin, WEBGL);
  	pos = createVector(0, 0, 10);
  	lookVec = createVector(0, 0, -1);
  	sideVec = createVector(1, 0, 0);
  	lookAt = pos.add(lookVec);

  	camera(pos.x, pos.y, pos.z, 0, 0, 0, 0, 1, 0);
  	for (var i = 0; i < numObjects; i++) {
  		x = random(-length, length);
  		y = random(-length, length);
  		z = random(-length, length);
  		col = color(random(255), random(255), random(255));
  		objects[i] =  [x, y, z, col];
  	}
  	display = createP("");
  	
}

function draw() {
	background(0);
	display.html("hor " +floor(angleVert * 360 / TWO_PI) + " vert " + floor(angleHor * 360 / TWO_PI) + " walking ");
	var diffX = (mouseX - pmouseX)/100;
	if (diffX != 0) {
		angleVert += diffX;
	}
	axisHor = [cos(angleVert), 0, sin(angleVert)];
	rotate(angleVert, axisVert);
	walkTowards = createVector(-axisHor[2], 0, axisHor[0]);
	strafeTowards = createVector(axisHor[0], 0, axisHor[2]);

	var diffY = (mouseY - pmouseY)/100;
	if (diffY != 0) {
		angleHor -= diffY;
		if (angleHor > PI/2) angleHor = PI/2;
		if (angleHor < -PI/2) angleHor = -PI/2;
	}
	rotate(angleHor, axisHor);
	pos.add(p5.Vector.mult(walkTowards, toggleWalking * speed));
	pos.add(p5.Vector.mult(strafeTowards, toggleStrafing * speed));

	for (e of objects) {
		push();
		stroke(e[3]);
		fill(e[3]);
		translate(e[0] + pos.x, e[1] + pos.y, e[2] + pos.z);
		box();
		pop();
	}
}

function keyPressed() {
	if (keyCode == 87) {
		toggleWalking += 1;
	} else if (keyCode == 83) {
		toggleWalking -= 1;
	} else if (keyCode == 65) {
		toggleStrafing += 1;
	} else if (keyCode == 68) {
		toggleStrafing -= 1;
	} else if (key == ' ') {
		if (toggleSim) {
			noLoop();
		} else {
			loop();
		}
		toggleSim = !toggleSim;
	}
}

function keyReleased() {
	if (keyCode == 87) {
		toggleWalking -= 1;
	} else if (keyCode == 83) {
		toggleWalking += 1;
	} else if (keyCode == 65) {
		toggleStrafing -= 1;
	} else if (keyCode == 68) {
		toggleStrafing += 1;
	}
}