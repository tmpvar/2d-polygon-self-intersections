var test = require('tape');
var isects = require('./intersections');

test('no intersections (square)', function(t) {

  var poly = [
    [0, 0],
    [10, 0],
    [10, 10],
    [0, 10],
    [0, 0]
  ];

  var r = isects(poly, t.fail);
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
  t.deepEqual(r[0], [5, 5], 'isect at (5, 0)')
  t.end();
});

test('interesection visitor', function(t) {

  var poly = [
    [0, 0],
    { x: 10, y: 0 },
    [0, 10],
    [10, 10],
  ];

  var expectedArgs = [
    [[5, 5], 1, { x: 10, y: 0 }, [0, 10], 3, [10, 10], [0, 0], true],
    [[5, 5], 3, [10, 10], [0, 0], 1, { x: 10, y: 0 }, [0, 10], false]
  ];

  var calls = 0;
  var r = isects(poly, function(isect, i0, s0, e0, i1, s1, e1, unique) {
    var args = [];
    Array.prototype.push.apply(args, arguments);
    t.deepEqual(args, expectedArgs[calls]);
    calls++;
    return true;
  });

  t.equal(calls, 2, 'visitor called twice')
  t.equal(r.length, 2, 'no self-intersections');
  t.deepEqual(r[0], [5, 5], 'isect at (5, 0)')
  t.deepEqual(r[1], [5, 5], 'isect at (5, 0)')
  t.end();
});

test('work with vec2', function(t) {

  var poly = [
    { x: 0,  y: 0 },
    { x: 10, y: 0 },
    { x: 0,  y: 10 },
    { x: 10, y: 10 }
  ];

  var r = isects(poly);
  t.equal(r.length, 1, 'no self-intersections');
  t.deepEqual(r[0], [5, 5], 'isect at (5, 0)')
  t.end();
});

test('better deduping', function(t) {

  var poly = [
    [0, 0],
    [20, 0],
    [20, 5],
    [20, 10],
  ];

  var r = isects(poly);
  t.equal(r.length, 0, 'no self-intersections');
  t.end();
});

test('separated intersections', function(t) {

  /*
           o-----o
           |     |
    o------x-----x------o
    |      |     |      |
    |      |     |      |
    |      |     |      |
    o------o     o------o
  */

  var poly = [
    [-10, 0],
    [10, 0],
    [10, 10],
    [1, 10],
    [1, -1],
    [-1, -1],
    [-1, 10],
    [-10, 1]
  ];

  var r = isects(poly);

  t.equal(r.length, 2, 'two self-intersections');
  t.end();
});
