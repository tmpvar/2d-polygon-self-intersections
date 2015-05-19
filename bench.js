var isects = require('./intersections')
var Suite = require('benchmark').Suite

var suite = new Suite;

var square = [
  [0, 0],
  [10, 0],
  [10, 10],
  [0, 10],
  [0, 0]
];

var hourglass = [
  [0, 0],
  [10, 0],
  [0, 10],
  [10, 10],
];

var hourglassVec2 = [
  { x: 0,  y: 0 },
  { x: 10, y: 0 },
  { x: 0,  y: 10 },
  { x: 10, y: 10 }
];


// add tests
suite
.add('isect', function() {
  isects(hourglass);
})
.add('isect vec2', function() {
  isects(hourglassVec2);
})
.add('no isect', function() {
  isects(square);
})

// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
// run async
.run({ 'async': true });
