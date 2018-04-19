var values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var element;

function setup() {
  createCanvas(400, 300);
  createP("Array");
  element = createP(values);
}

function draw() {
  background(0);
  textSize(64);
  var s = '';
  for (v of values) {
    s += v;
  }
  fill(255)
  text(s, 20, height/2);
  // element.html(values);
  console.log(values);
  var largestI = -1;
  for (var i = 0; i < values.length - 1; i++) {
    if (values[i] < values[i+1]) {
      largestI = i;
    }
  }
  if (largestI == -1) {
    console.log("finished");
    noLoop();
    return;
  }
  largestJ = -1;
  for (var j = 0; j < values.length; j++) {
    if (values[largestI] < values[j]) {
      largestJ = j;
    }
  }

  swap(values, largestI, largestJ);
  var endArray = values.splice(largestI+1);
  endArray.reverse();
  values = values.concat(endArray);
}

function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
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