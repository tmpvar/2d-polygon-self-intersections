var test = require('tape');
var isects = require('./intersections');
/*

test('no intersections (square)', function(t) {

  var poly = [
    [0, 0],
    [10, 0],
    [10, 10],
    [0, 10],
    [0, 0]
  ];

  var r = isects(poly);

  t.equal(r.length, 0, 'no self-intersections');

  t.end();
});

test('interesections (hourglass)', function(t) {

  var poly = [
    [0, 0],
    [10, 0],
    [0, 10],
    [10, 10],
  ];

  var r = isects(poly);
  t.equal(r.length, 1, 'no self-intersections');
  t.deepEqual(r[0], [5, 0], 'isect at (5, 0)')
  t.end();
});
*/

test('work with vec2', function(t) {

  var poly = [
    { x: 0,  y: 0 },
    { x: 10, y: 0 },
    { x: 0,  y: 10 },
    { x: 10, y: 10 }
  ];

  var r = isects(poly);
  t.equal(r.length, 1, 'no self-intersections');
  t.deepEqual(r[0], [5, 0], 'isect at (5, 0)')
  t.end();
});
