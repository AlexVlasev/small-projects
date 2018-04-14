let particles = [];
let numberParticles = 1000;
let width = 800;
let height = 400;
let capacity = 4;
let boundary = new Rectangle(width/2, height/2, width/2, height/2);

function setup() {
	createCanvas(width, height);
	for (let i = 0; i < numberParticles; i++) {
		particles.push(new Particle(random(width), random(height)));
	}
}

function draw() {
	background(0);
	for (let p of particles) {
		p.move();
		p.render();
		p.setHighlight(false);
	}

	let quadTree = new QuadTree(boundary, capacity);
	for (let p of particles) {
		point = new Point(p.x, p.y, p);
		quadTree.insert(point);
	}

	for (let p of particles) {
		let range = new Rectangle(p.x, p.y, 2*p.r, 2*p.r);
		let nearbyPoints = []
		quadTree.query(range, nearbyPoints);
		for (q of nearbyPoints) {
			if (p != q.userData && p.intersects(q.userData)) {
				p.setHighlight(true);
			}
		}
	}
}