var number = 70;
var cols = number;
var rows = number;
var w, h;
var aStar;

function heuristic(a, b) {
  // return (a.i-b.i)*(a.i-b.i) - (a.j-b.j)*(a.j-b.j);
  return dist(a.i, a.j, b.i, b.j);
  // return abs(a.i - b.i) + abs(a.j - b.j);
}

function distanceFunction(a, b) {
  return abs(b.fudge - a.fudge);
}

class Node {
  constructor(f, g, h, i, j) {
    this.f = 0;
    this.g = 0;
    this.h = 0;
    noiseDetail(8, 0.5);
    this.fudge = 100*pow(noise(i*10/number, j*10/number), 4);
    this.i = i;
    this.j = j;
    this.neighbors = [];
    this.userData;
    this.previous;
  }

  addNeighbors(neighbors) {
    this.neighbors = neighbors;
  }

  addUserData(userData) {
    this.userData = userData;
  }
}

class NodeVisual {
  constructor(node, x, y, semiX, semiY) {
    this.node = node;
    this.x = x;
    this.y = y;
    this.semiX = semiX;
    this.semiY = semiY;
  }

  show(color) {
    fill(color);
    noStroke();
    // ellipse(this.x, this.y, 2*this.semiX, 2*this.semiY);
    rect(this.x, this.y, 2*this.semiX, 2*this.semiY);
  }

}

function arrToKey(arr) {
  return arr.join(',');
}

function keyToArr(key) {
  return JSON.parse("[" + key + "]");
}

function initNeighbors(node, graph) {
  var i = node.i;
  var j = node.j;
  var neighbors = [];
  if (i < cols-1) neighbors.push(graph[arrToKey([i + 1, j])]);
  if (i > 0) neighbors.push(graph[arrToKey([i - 1, j])]);
  if (j < rows-1) neighbors.push(graph[arrToKey([i, j + 1])]);
  if (j > 0) neighbors.push(graph[arrToKey([i, j - 1])]);

  if (i > 0 && j > 0) neighbors.push(graph[arrToKey([i-1, j-1])]);
  if (i < cols-1 && j > 0) neighbors.push(graph[arrToKey([i+1, j-1])]);
  if (i > 0 && j < rows-1) neighbors.push(graph[arrToKey([i-1, j+1])]);
  if (i < cols-1 && j < rows-1) neighbors.push(graph[arrToKey([i+1, j+1])]);

  return neighbors;
}

function drawPath(path) {
  noFill();
  stroke(color(255, 0, 255));
  strokeWeight(w / 2);
  beginShape();
  for (p of path) {
    vertex(p.userData.x, p.userData.y);
  }
  endShape();
}

function setup() {
  createCanvas(400, 400);
  w = width / cols;
  h = height / rows;

  graph = new Map();
  graphVisual = new Map();
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      var key = arrToKey([i, j]);
      graph[key] = new Node(0, 0, 0, i, j);
      // graphVisual[key] = new NodeVisual(graph[key], i*w + w/2, j*h + h/2, w/2, h/2);
      graphVisual[key] = new NodeVisual(graph[key], i*w, j*h, w/2, h/2);
      graph[key].addUserData(graphVisual[key]);
    }
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      var node = graph[arrToKey([i, j])];
      node.addNeighbors(initNeighbors(node, graph));
    }
  }

  start = graph[arrToKey([0, 0])];
  end = graph[arrToKey([cols-1, rows-1])];
  aStar = new aStarSearch(start, end, distanceFunction, heuristic);
}

function draw() {
  background(0);
  if (aStar.pathFound) {
    noLoop(); 
    console.log("PATH FOUND");
  }

  if (aStar.openSet.size > 0 && !aStar.pathFound) {
    aStar.update();
  }

  var maxFudge = 0;
  for (let key in graph) {
    if (graph[key].fudge > maxFudge) {
      maxFudge = graph[key].fudge;
    }
  }

  for (key in graph) {
    var nodeColor = 255*graph[key].fudge/maxFudge;
    graphVisual[key].show(nodeColor);
  }
  for (let node of aStar.closedSet) node.userData.show(color(0, 255, 0, 30));
  for (let node of aStar.openSet) node.userData.show(color(0, 255, 0, 50));

  if (!(aStar.current == aStar.start)) drawPath(aStar.path());
}
