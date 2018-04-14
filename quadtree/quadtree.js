class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Rectangle {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	contains(point) {

		if (this.x - this.w > point.x) return false;
		if (this.x + this.w <= point.x) return false;
		if (this.y - this.h > point.y) return false;
		if (this.y + this.h <= point.y) return false;
		return true;
	}

	intersects(range) {
		// Since they are open on one side, we have partial inequalities
		return (
			range.x - range.w >= this.x + this.w ||
			range.x + range.w >= this.x - this.w ||
			range.y - range.h >= this.y + this.h ||
			range.y + range.h >= this.y - this.h
		)		
	}
}

class QuadTree {
	constructor(boundary, capacity) {
		this.boundary = boundary;
		this.capacity = capacity;
		this.points = [];
		this.divided = false;
	}

	subdivide() {
		// Center and new width and height
		let x = this.boundary.x;
		let y = this.boundary.y;
		let w = this.boundary.w/2;
		let h = this.boundary.h/2;
		// Boundaries for the new quads
		let nw = new Rectangle(x - w, y - h, w, h);
		let ne = new Rectangle(x + w, y - h, w, h);
		let sw = new Rectangle(x - w, y + h, w, h);
		let se = new Rectangle(x + w, y + h, w, h);
		// The new quads
		this.northWest = new QuadTree(nw, this.capacity);
		this.northEast = new QuadTree(ne, this.capacity);
		this.southWest = new QuadTree(sw, this.capacity);
		this.southEast = new QuadTree(se, this.capacity);
	}

	insert(point) {
		if (!this.boundary.contains(point)) { return; }
		if(this.points.length < this.capacity) {
			this.points.push(point);
			return;
		}

		if (!this.divided) {
			this.subdivide();
			this.divided = true;
		}
		this.northEast.insert(point);
		this.northWest.insert(point);
		this.southWest.insert(point);
		this.southEast.insert(point);
	}

	query(range, pointsFound) {
		if (!pointsFound) { pointsFound = [] }
		if (!this.boundary.intersects(range)) { return pointsFound; }
		for (let p of this.points) {
			if (range.contains(p)) {
				pointsFound.push(p);
			}
		}

		if (this.divided) {
			this.northEast.query(range, pointsFound);
			this.northWest.query(range, pointsFound);
			this.southEast.query(range, pointsFound);
			this.southWest.query(range, pointsFound);
		}
		return pointsFound;
	}

	show() {
		stroke(255);
		strokeWeight(1);
		noFill();
		rectMode(CENTER);
		rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
		if (this.divided) {
			this.northWest.show();
			this.northEast.show();
			this.southEast.show();
			this.southWest.show();
		}

		strokeWeight(2.5);
		for (let p of this.points) {
			point(p.x, p.y);
		}
	}
}