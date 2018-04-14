let x_pos = 0;
let y_pos = 0;
let speed = 2;
let samples = 35;
let length = 30; // size of one square
let height = 100; // How high do we want the terrain to be

function setup() {
  	var cnv = createCanvas(windowWidth-10, windowHeight-10, WEBGL);
  	setAttributes('antialias', true);
  	cnv.style('display', 'block');
	angle = 0;
}

function draw() {
	// Adjust the direction of movement
	// angle = map(mouseX, 0, windowWidth, 0, 2*PI);

	if (mouseX != pmouseX) {
		angle += (mouseX - pmouseX)/100;
	}
	
	// Update position
	x_pos += speed * cos(angle);
	y_pos += speed * sin(angle);

	// Drawing parameters
	rotateX(PI/3);
	rotateZ(-PI/2 - angle);

	// Terrain heights generation in the vicinity of the position
	x_init = floor(x_pos/length)*length;
	y_init = floor(y_pos/length)*length;

	terrain = new Array(samples);
	for (y = -samples; y < samples; y++) {
		terrain[y] = new Array(samples);
		for (x = -samples; x < samples; x++) {
			scale = 150;
			x_sample = (x_init + x * length)/scale;
			y_sample = (y_init + y * length)/scale;
			terrain[y][x] = noise(x_sample + y_sample/2, y_sample);
		}
	}

	// Drawing parameters
	background(180);
	noStroke();

	// Terrain mesh generation
	translate(-x_pos, -y_pos);
	for (y = -samples; y < samples - 1; y++) {
		beginShape(TRIANGLE_STRIP);
		for (x = -samples; x < samples; x++) {
			renderCondition = (x**2 + y**2 < samples**2)
			if (renderCondition) {
				x_coord = x_init + x * length;
				y_coord = y_init + y * length;
				d2 = (x_coord - x_pos)**2 + (y_coord - y_pos)**2;
				color = map(d2, 0, (samples * length)**2, 40, 180);
				fill(color);
				vertex(x_coord, y_coord, terrain[y][x] * height);
				vertex(x_coord, y_coord + length, terrain[y + 1][x] * height);
			}
		}
		endShape();
	}
	
}


function windowResized() {
 	resizeCanvas(windowWidth, windowHeight);
}