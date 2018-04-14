var cols = 20;
var rows = 20;
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
	// return dist(a.i, a.j, b.i, b.j);
	return abs(a.i - b.i) + abs(a.j - b.j);
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
		rect(this.i * w, this.j * h, w-1, h-1);

	}

	this.addNeighbors = function(grid) {
		var i = this.i;
		var j = this.j;
		if (i < cols - 1) this.neighbors.push(grid[i + 1][j]);
		if (i > 0) this.neighbors.push(grid[i - 1][j]);
		if (j < rows - 1) this.neighbors.push(grid[i][j + 1]);
		if (j > 0) this.neighbors.push(grid[i][j - 1]);
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
					if (openSet.includes(neighbor)) {
						if (tempG < neighbor.g) {
							neighbor.g = tempG;
						}
					} else {
						neighbor.g = tempG;
						openSet.push(neighbor);
					}

					neighbor.h = heuristic(neighbor, end);
					neighbor.f = neighbor.g + neighbor.h;
					neighbor.previous = winner;
				}

			}
		}
	} else {
		//no solution
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
	for (p of path) {
		p.show(color(0, 0, 255));
	}
}
