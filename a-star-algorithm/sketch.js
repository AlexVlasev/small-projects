var cols = 40;
var rows = 40;
var w, h;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
var path = [];

function removeFromArray(arr, elt) {
	for (var i = arr.length - 1; i >= 0; i--) {
		if (arr[i] == elt) {
			arr.splice(i, 1);
			return;
		}
	}
}

function heuristic(a, b) {
	// return (a.i-b.i)*(a.i-b.i) - (a.j-b.j)*(a.j-b.j);
	return dist(a.i, a.j, b.i, b.j);
	// return abs(a.i - b.i) + abs(a.j - b.j);
}

function Spot(i, j) {
	this.i = i;
	this.j = j;

	this.f = 0;
	this.g = 0;
	this.h = 0;

	this.neighbors = [];
	this.previous = undefined;
	this.wall = false;

	if (random(1) < 0.3) this.wall = true;

	this.show = function(color) {
		fill(color);
		if (this.wall) fill(0);
		noStroke();
		ellipse(this.i * w + w/2, this.j * h + h/2, w, h);

	}

	this.addNeighbors = function(grid) {
		var i = this.i;
		var j = this.j;
		if (i < cols - 1) this.neighbors.push(grid[i + 1][j]);
		if (i > 0) this.neighbors.push(grid[i - 1][j]);
		if (j < rows - 1) this.neighbors.push(grid[i][j + 1]);
		if (j > 0) this.neighbors.push(grid[i][j - 1]);

		if (i > 0 && j > 0) this.neighbors.push(grid[i-1][j-1]);
		if (i < cols-1 && j > 0) this.neighbors.push(grid[i+1][j-1]);
		if (i > 0 && j < rows-1) this.neighbors.push(grid[i-1][j+1]);
		if (i < cols-1 && j < rows-1) this.neighbors.push(grid[i+1][j+1]);
	}
}

function setup() {
	createCanvas(400, 400);
	w = width / cols;
	h = height / rows;
	for (var i = 0; i < cols; i++) {
		grid[i] = new Array(rows);
	}

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j] = new Spot(i, j);
		}
	}

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].addNeighbors(grid);
		}
	}

	start = grid[0][0];
	end = grid[cols - 1][rows - 1];
	openSet.push(start);
	start.wall = false;
	end.wall = false;
}

function draw() {
	if (openSet.length > 0) {
		winner = openSet[0];
		for (var p of openSet) {
			if (p.f < winner.f) {
				winner = p;
			}

			if (winner === end) {
				console.log("DONE!");
				noLoop();
			}

			removeFromArray(openSet, winner);
			closedSet.push(winner);

			var neighbors = winner.neighbors;
			for (neighbor of neighbors) {
				if (!closedSet.includes(neighbor) && !neighbor.wall){
					var tempG = winner.g + 1;
					var newPath = false;
					if (openSet.includes(neighbor)) {
						if (tempG < neighbor.g) {
							neighbor.g = tempG;
							newPath = true;
						}
					} else {
						neighbor.g = tempG;
						openSet.push(neighbor);
						newPath = true;
					}

					if (newPath) {
						neighbor.h = heuristic(neighbor, end);
						neighbor.f = neighbor.g + neighbor.h;
						neighbor.previous = winner;
					}
				}

			}
		}
	} else {
		console.log("NO SOLUTION");
		noLoop();
		return;
	}
	// background(0);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].show(color(255));
		}
	}

	for (p of closedSet) {
		p.show(color(255, 0, 0));
	}

	for (p of openSet) {
		p.show(color(0, 255, 0));
	}

	path = [];
	var temp = winner;
	path.push(temp);
	while (temp.previous) {
		path.push(temp.previous);
		temp = temp.previous;
	}

	noFill();
	stroke(255);
	strokeWeight(w / 2);
	beginShape();
	for (p of path) {
		vertex(p.i*w + w/2, p.j*h + h/2);
	}
	endShape();
}
