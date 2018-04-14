let width = 400;
let height = 400;
let capacity = 4;
let qt;

function setup() {
	createCanvas(width, height);
	let boundary = new Rectangle(width/2, height/2, width/2, height/2);
	qt = new QuadTree(boundary, capacity);
	for (let i = 0; i < 300; i++) {
		let x = randomGaussian(width/2, width/8);
		let y = randomGaussian(height/2, height/8);
		let p = new Point(x, y);
		qt.insert(p);
	}
}

function draw() {
	if (mouseIsPressed) {
		let m = new Point(mouseX + random(-5, 5), mouseY + random(-5, 5));
		qt.insert(m);
	}
	let range = new Rectangle(mouseX, mouseY, 25, 25);
	let pointsFound = []
	qt.query(range, pointsFound);
	
	background(0);
	qt.show();
	rectMode(CENTER);
	stroke(0, 255, 0);
	rect(range.x, range.y, 2*range.w, 2*range.h);
	strokeWeight(4);
	for (let p of pointsFound) {
		point(p.x, p.y);
	}
}
