var totalCities = 9;
var cities = [];
var order = [];
var bestOrder = [];
var recordDistance;

function setup() {
  createCanvas(400, 400);
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height/2));
    cities[i] = v;
    order[i] = i;
  }

  recordDistance = calcDistance(cities, order);
  bestOrder = copyNumbers(order);
  createP("Record Distance:");
  distElement = createP(recordDistance);
}

function copyNumbers(arr) {
  temp = []
  for (num of arr) {
    temp.push(num);
  }
  return temp;
}

function draw() {
  background(0);
  drawCounter(order);
  drawCities(cities);
  drawPath(cities, order, color(255), 2);
  drawPath(cities, bestOrder, color(255, 0, 255), 4);
  distElement.html(recordDistance);

  var d = calcDistance(cities, order);
  if (d < recordDistance) {
    recordDistance = d;
    bestOrder = copyNumbers(order);
  }
  nextOrder();
}

function swap(a, i, j) {
  var temp = a[j];
  a[j] = a[i];
  a[i] = temp;
}

function drawCounter(order) {
  push();
  textSize(64);
  var s = '';
  for (v of order) {
    s += v;
  }
  fill(255)
  text(s, 20, height/2 + height/4);
  pop();
}

function drawCities(cities) {
  push();
  fill(255);
  for (city of cities) {
    ellipse(city.x, city.y, 8, 8);
  }
  pop();
}

function drawPath(cities, order, color, weight) {
  push();
  stroke(color);
  strokeWeight(weight);
  noFill();
  beginShape();
  for (index of order){
    vertex(cities[index].x, cities[index].y);
  }
  endShape();
  pop();
}

function calcDistance(points, order) {
  var sum = 0;
  for (var k = 0; k < order.length - 1; k++) {
    i = order[k];
    j = order[k+1];
    sum += dist(points[i].x, points[i].y, points[j].x, points[j].y);
  }
  return sum;
}

var toggle = true;

function keyPressed() {
  if (key == ' ') {
    if (toggle) {
      noLoop();
    } else {
      loop();
    }
    toggle = !toggle;
  }
}

function nextOrder() {
  var largestI = -1;
  for (var i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i+1]) {
      largestI = i;
    }
  }
  if (largestI == -1) {
    console.log("finished");
    noLoop();
    return;
  }
  largestJ = -1;
  for (var j = 0; j < order.length; j++) {
    if (order[largestI] < order[j]) {
      largestJ = j;
    }
  }

  swap(order, largestI, largestJ);
  var endArray = order.splice(largestI+1);
  endArray.reverse();
  order = order.concat(endArray);
}

