let inc = 0.1;
let scl = 10;
var rows, cols;

var fr;
var zoff = 0;
var particles = [];
var flowfield;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	fr = createP('');

	cols = floor(width / scl);
	rows = floor(height / scl);
	for (var i = 0; i < 2500; i++) {
		particles[i] = new Particle();
	}
}

function draw() {

	flowfield = Array(rows * cols);

	var yoff = 0;
	for (var y = 0; y < rows; y++) {
		var xoff = 0;
		for (var x = 0; x < cols; x++) {
			var angle = noise(xoff, yoff, zoff)*TWO_PI*4;
			var v = p5.Vector.fromAngle(angle);
			v.setMag(0.5);
			var index = x + y * cols;
			flowfield[index] = v;
			stroke(0, 50);
			xoff += inc;
		}
		yoff += inc;
	}

	for (p of particles) {
		p.follow(flowfield);
		p.update();
		p.show();
		p.edges();
	}

	fr.html(floor(frameRate()));
	zoff += inc/50;
}